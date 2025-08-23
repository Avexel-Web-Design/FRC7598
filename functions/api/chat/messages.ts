import { Context } from 'hono';
import { D1Database } from '@cloudflare/workers-types';

interface Env {
	DB: D1Database;
}

export async function getMessages(c: Context): Promise<Response> {
	const { channelId } = c.req.param();
	const userIdStr = c.req.query('user_id');
	const userId = userIdStr ? Number(userIdStr) : undefined;
	if (!channelId) return new Response('Channel ID is required', { status: 400 });

	try {
		const channelRow = await c.env.DB.prepare('SELECT is_private FROM channels WHERE id = ?').bind(channelId).first();
		if (!channelRow) return new Response('Channel not found', { status: 404 });
		const isPrivate = (channelRow as { is_private: number }).is_private === 1;
		if (isPrivate) {
			if (!userId) return new Response('Unauthorized', { status: 401 });
			const adminRow = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(userId).first();
			const isAdmin = adminRow && (adminRow as { is_admin: number }).is_admin === 1;
			if (!isAdmin) {
				const memberRow = await c.env.DB.prepare('SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?').bind(channelId, userId).first();
				if (!memberRow) return new Response('Forbidden', { status: 403 });
			}
		}

		const { results } = await c.env.DB.prepare(
			'SELECT messages.*, users.full_name as sender_username, users.avatar_color as sender_avatar_color FROM messages JOIN users ON messages.sender_id = users.id WHERE channel_id = ? ORDER BY timestamp ASC'
		).bind(channelId).all();

		// Attach reactions per message
		try {
			const ids = (results as any[]).map(r => r.id);
			if (ids.length > 0) {
				const placeholders = ids.map(() => '?').join(',');
				const reactRes = await c.env.DB.prepare(
					`SELECT mr.message_id, mr.user_id, mr.reaction_key, u.full_name as username
					 FROM message_reactions mr JOIN users u ON u.id = mr.user_id
					 WHERE mr.message_id IN (${placeholders})`
				).bind(...ids).all();
				const byMsg = new Map<number, Array<{ user_id: number; username: string; reaction_key: string }>>();
				for (const r of (reactRes.results as any[]) || []) {
					const arr = byMsg.get((r as any).message_id) || [];
					arr.push({ user_id: Number((r as any).user_id), username: String((r as any).username), reaction_key: String((r as any).reaction_key) });
					byMsg.set((r as any).message_id, arr);
				}
				for (const m of results as any[]) {
					const arr = byMsg.get(Number(m.id)) || [];
					const counts: Record<string, number> = {};
					const mine: string[] = [];
					for (const r of arr) {
						counts[r.reaction_key] = (counts[r.reaction_key] || 0) + 1;
						if (userId && r.user_id === userId) mine.push(r.reaction_key);
					}
					(m as any).reaction_counts = counts;
					(m as any).my_reactions = mine;
				}
			}
		} catch {}

		// Fetch read status for this channel to compute readers per message
		let channelReadStatuses: Array<{ user_id: number; last_read_timestamp: string; username: string }> = [];
		try {
			const readRes = await c.env.DB.prepare(
				'SELECT urs.user_id, urs.last_read_timestamp, u.full_name as username FROM user_read_status urs JOIN users u ON u.id = urs.user_id WHERE urs.channel_id = ?'
			).bind(channelId).all();
			channelReadStatuses = (readRes.results as any[])?.map(r => ({
				user_id: Number((r as any).user_id),
				last_read_timestamp: (r as any).last_read_timestamp,
				username: (r as any).username,
			})) || [];
		} catch {}

		if (userId && results.length > 0) {
			try {
				const otherReadRow = await c.env.DB.prepare(
					'SELECT MAX(last_read_timestamp) as max_ts FROM user_read_status WHERE channel_id = ? AND user_id != ?'
				).bind(channelId, userId).first();
				const otherMaxRead: string | null = (otherReadRow as any)?.max_ts || null;
				if (otherMaxRead) {
					const otherReadTime = new Date(otherMaxRead).getTime();
					for (const r of results as any[]) {
						if (r.sender_id === userId) {
							const msgTime = new Date(r.timestamp).getTime();
							(r as any).read_by_any = otherReadTime >= msgTime ? 1 : 0;
						}
					}
				} else {
					for (const r of results as any[]) {
						if (r.sender_id === userId) (r as any).read_by_any = 0;
					}
				}
			} catch {}
		}

		try {
			if (Array.isArray(results) && channelReadStatuses.length > 0) {
				for (const r of results as any[]) {
					const msgTime = new Date(r.timestamp).getTime();
					const readers = channelReadStatuses
						.filter(s => s.user_id !== Number(r.sender_id) && new Date(s.last_read_timestamp).getTime() >= msgTime)
						.map(s => ({ user_id: s.user_id, username: s.username, read_at: s.last_read_timestamp }));
					(r as any).readers = readers;
				}
			}
		} catch {}

		if (userId && results.length > 0) {
			try {
				const timestamp = new Date().toISOString();
				await c.env.DB.prepare(
					`INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
				).bind(userId, channelId, timestamp).run();
			} catch {}
		}

		return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		return new Response('Error fetching messages', { status: 500 });
	}
}

export async function sendMessage(c: Context): Promise<Response> {
	const { channelId } = c.req.param();
	const userIdStr = c.req.query('user_id');
	const userIdFromQuery = userIdStr ? Number(userIdStr) : undefined;
	if (!channelId) return new Response('Channel ID is required', { status: 400 });
	try {
		const { content, sender_id } = await c.req.json();
		if (!content || !sender_id) return new Response('Content and sender_id are required', { status: 400 });
		const effectiveUserId = userIdFromQuery || Number(sender_id);
		if (!effectiveUserId) return new Response('Unauthorized', { status: 401 });

		const chanRow = await c.env.DB.prepare('SELECT is_private FROM channels WHERE id = ?').bind(channelId).first();
		if (!chanRow) return new Response('Channel not found', { status: 404 });
		const isPrivateChan = (chanRow as { is_private: number }).is_private === 1;
		if (isPrivateChan) {
			const admRow = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(effectiveUserId).first();
			const isAdmin = admRow && (admRow as { is_admin: number }).is_admin === 1;
			if (!isAdmin) {
				const membRow = await c.env.DB.prepare('SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?').bind(channelId, effectiveUserId).first();
				if (!membRow) return new Response('Forbidden', { status: 403 });
			}
		}

		const timestamp = new Date().toISOString();
		const result = await c.env.DB.prepare(
			'INSERT INTO messages (channel_id, sender_id, content, timestamp) VALUES (?, ?, ?, ?)'
		).bind(channelId, sender_id, content, timestamp).run();
		if (result.success) {
			try {
				await c.env.DB.prepare(
					`INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
				).bind(sender_id, channelId, timestamp).run();
			} catch {}
			return new Response(JSON.stringify({ message: 'Message sent' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
		}
		return new Response('Failed to send message', { status: 500 });
	} catch {
		return new Response('Error sending message', { status: 500 });
	}
}

export async function deleteMessage(c: Context): Promise<Response> {
	const { messageId } = c.req.param();
	if (!messageId) return new Response('Message ID is required', { status: 400 });
	try {
		const { user_id } = await c.req.json();
		if (!user_id) return new Response('User ID is required', { status: 400 });
		const message = await c.env.DB.prepare('SELECT sender_id FROM messages WHERE id = ?').bind(messageId).first();
		if (!message) return new Response('Message not found', { status: 404 });
		const isAdminRow = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(user_id).first();
		const isAuthorized = (isAdminRow && (isAdminRow as any).is_admin === 1) || (message as any).sender_id === Number(user_id);
		if (!isAuthorized) return new Response('Unauthorized', { status: 403 });
		const result = await c.env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(messageId).run();
		if (result.success) return new Response(JSON.stringify({ message: 'Message deleted' }), { headers: { 'Content-Type': 'application/json' } });
		return new Response('Failed to delete message', { status: 500 });
	} catch {
		return new Response('Error deleting message', { status: 500 });
	}
}

// Direct messages
export async function getDMMessages(c: Context): Promise<Response> {
	const { dmId } = c.req.param();
	const userIdStr = c.req.query('user_id');
	const userId = userIdStr ? Number(userIdStr) : undefined;
	if (!dmId || !dmId.startsWith('dm_')) return new Response('Invalid DM ID', { status: 400 });
	if (!userId) return new Response('User ID is required', { status: 401 });
	try {
		const dmParts = dmId.split('_');
		if (dmParts.length !== 3) return new Response('Invalid DM ID format', { status: 400 });
		const user1Id = parseInt(dmParts[1]);
		const user2Id = parseInt(dmParts[2]);
		if (userId !== user1Id && userId !== user2Id) return new Response('Unauthorized', { status: 403 });
		const { results } = await c.env.DB.prepare(
			'SELECT messages.*, users.full_name as sender_username, users.avatar_color as sender_avatar_color FROM messages JOIN users ON messages.sender_id = users.id WHERE channel_id = ? ORDER BY timestamp ASC'
		).bind(dmId).all();

		// Attach reactions per message
		try {
			const ids = (results as any[]).map(r => r.id);
			if (ids.length > 0) {
				const placeholders = ids.map(() => '?').join(',');
				const reactRes = await c.env.DB.prepare(
					`SELECT mr.message_id, mr.user_id, mr.reaction_key, u.full_name as username
					 FROM message_reactions mr JOIN users u ON u.id = mr.user_id
					 WHERE mr.message_id IN (${placeholders})`
				).bind(...ids).all();
				const byMsg = new Map<number, Array<{ user_id: number; username: string; reaction_key: string }>>();
				for (const r of (reactRes.results as any[]) || []) {
					const arr = byMsg.get((r as any).message_id) || [];
					arr.push({ user_id: Number((r as any).user_id), username: String((r as any).username), reaction_key: String((r as any).reaction_key) });
					byMsg.set((r as any).message_id, arr);
				}
				for (const m of results as any[]) {
					const arr = byMsg.get(Number(m.id)) || [];
					const counts: Record<string, number> = {};
					const mine: string[] = [];
					for (const r of arr) {
						counts[r.reaction_key] = (counts[r.reaction_key] || 0) + 1;
						if (userId && r.user_id === userId) mine.push(r.reaction_key);
					}
					(m as any).reaction_counts = counts;
					(m as any).my_reactions = mine;
				}
			}
		} catch {}

		let dmReadStatuses: Array<{ user_id: number; last_read_timestamp: string; username: string }> = [];
		try {
			const readRes = await c.env.DB.prepare(
				'SELECT urs.user_id, urs.last_read_timestamp, u.full_name as username FROM user_read_status urs JOIN users u ON u.id = urs.user_id WHERE urs.channel_id = ?'
			).bind(dmId).all();
			dmReadStatuses = (readRes.results as any[])?.map(r => ({
				user_id: Number((r as any).user_id),
				last_read_timestamp: (r as any).last_read_timestamp,
				username: (r as any).username,
			})) || [];
		} catch {}

		try {
			const otherId = userId === user1Id ? user2Id : user1Id;
			const otherReadRow = await c.env.DB.prepare('SELECT last_read_timestamp FROM user_read_status WHERE user_id = ? AND channel_id = ?')
				.bind(otherId, dmId)
				.first();
			const otherLastRead: string | null = (otherReadRow as any)?.last_read_timestamp || null;
			if (otherLastRead) {
				const otherReadTime = new Date(otherLastRead).getTime();
				for (const r of results as any[]) {
					if (r.sender_id === userId) {
						(r as any).read_by_any = otherReadTime >= new Date(r.timestamp).getTime() ? 1 : 0;
					}
				}
			} else {
				for (const r of results as any[]) if (r.sender_id === userId) (r as any).read_by_any = 0;
			}
		} catch {}

		try {
			if (Array.isArray(results) && dmReadStatuses.length > 0) {
				for (const r of results as any[]) {
					const msgTime = new Date(r.timestamp).getTime();
					const readers = dmReadStatuses
						.filter(s => s.user_id !== Number(r.sender_id) && new Date(s.last_read_timestamp).getTime() >= msgTime)
						.map(s => ({ user_id: s.user_id, username: s.username, read_at: s.last_read_timestamp }));
					(r as any).readers = readers;
				}
			}
		} catch {}

		if ((results as any[]).length > 0) {
			try {
				const timestamp = new Date().toISOString();
				await c.env.DB.prepare(
					`INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
				).bind(userId, dmId, timestamp).run();
			} catch {}
		}

		return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
	} catch {
		return new Response('Error fetching DM messages', { status: 500 });
	}
}

export async function sendDMMessage(c: Context): Promise<Response> {
	const { dmId } = c.req.param();
	const userIdStr = c.req.query('user_id');
	const userIdFromQuery = userIdStr ? Number(userIdStr) : undefined;
	if (!dmId || !dmId.startsWith('dm_')) return new Response('Invalid DM ID', { status: 400 });
	try {
		const { content, sender_id } = await c.req.json();
		if (!content || !sender_id) return new Response('Content and sender_id are required', { status: 400 });
		const effectiveUserId = userIdFromQuery || Number(sender_id);
		if (!effectiveUserId) return new Response('Unauthorized', { status: 401 });

		const dmParts = dmId.split('_');
		if (dmParts.length !== 3) return new Response('Invalid DM ID format', { status: 400 });
		const user1Id = parseInt(dmParts[1]);
		const user2Id = parseInt(dmParts[2]);
		if (sender_id !== user1Id && sender_id !== user2Id) return new Response('Unauthorized', { status: 403 });

		const timestamp = new Date().toISOString();
		const result = await c.env.DB.prepare(
			'INSERT INTO messages (channel_id, sender_id, content, timestamp) VALUES (?, ?, ?, ?)'
		).bind(dmId, sender_id, content, timestamp).run();
		if (result.success) {
			try {
				await c.env.DB.prepare(
					`INSERT INTO user_read_status (user_id, channel_id, last_read_timestamp)
					 VALUES (?, ?, ?)
					 ON CONFLICT(user_id, channel_id) DO UPDATE SET last_read_timestamp = excluded.last_read_timestamp`
				).bind(sender_id, dmId, timestamp).run();
			} catch {}
			return new Response(JSON.stringify({ message: 'DM message sent' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
		}
		return new Response('Failed to send DM message', { status: 500 });
	} catch {
		return new Response('Error sending DM message', { status: 500 });
	}
}

