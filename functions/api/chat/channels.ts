import { Context } from 'hono';
import { D1Database } from '@cloudflare/workers-types';

interface Env { DB: D1Database }

export async function getChannels(c: Context): Promise<Response> {
  try {
    const userIdStr = c.req.query('user_id');
    let channels;
    if (userIdStr) {
      const userId = Number(userIdStr);
      const adminRow = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(userId).first();
      const isAdmin = adminRow && (adminRow as { is_admin: number }).is_admin === 1;
      if (isAdmin) {
        const { results } = await c.env.DB.prepare('SELECT * FROM channels WHERE id NOT LIKE "dm_%" AND id NOT LIKE "group_%" ORDER BY position ASC').all();
        channels = results;
      } else {
        const { results } = await c.env.DB.prepare(
          `SELECT DISTINCT channels.*
           FROM channels
           LEFT JOIN channel_members ON channels.id = channel_members.channel_id AND channel_members.user_id = ?
           WHERE channels.id NOT LIKE "dm_%" AND channels.id NOT LIKE "group_%" AND (channels.is_private = 0 OR channel_members.user_id = ?)
           ORDER BY channels.position ASC`
        ).bind(userId, userId).all();
        channels = results;
      }
    } else {
      const { results } = await c.env.DB.prepare('SELECT * FROM channels WHERE is_private = 0 AND id NOT LIKE "dm_%" AND id NOT LIKE "group_%" ORDER BY position ASC').all();
      channels = results;
    }
    return new Response(JSON.stringify(channels), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response('Error fetching channels', { status: 500 });
  }
}

export async function createChannel(c: Context): Promise<Response> {
  try {
    const { id, name, created_by, is_private = false, members = [] } = await c.req.json();
    if (!id || !name) return new Response('Channel ID and name are required', { status: 400 });
    const existing = await c.env.DB.prepare('SELECT id FROM channels WHERE id = ?').bind(id).first();
    if (existing) return new Response('Channel ID already exists', { status: 409 });
    const positionRow = await c.env.DB.prepare('SELECT COALESCE(MAX(position), 0) as max_pos FROM channels').first();
    const position = positionRow ? (positionRow as any).max_pos + 1 : 1;
    const now = new Date().toISOString();
    const result = await c.env.DB.prepare(
      'INSERT INTO channels (id, name, created_by, created_at, updated_at, position, is_private) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, name, created_by, now, now, position, is_private ? 1 : 0).run();
    if (!result.success) return new Response('Failed to create channel', { status: 500 });

    if (is_private) {
      const memberIds: number[] = Array.isArray(members) ? [...members] : [];
      if (created_by && !memberIds.includes(Number(created_by))) memberIds.push(Number(created_by));
      for (const m of memberIds) {
        try { await c.env.DB.prepare('INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)').bind(id, m).run(); } catch {}
      }
    }
    return new Response(JSON.stringify({ message: 'Channel created', id, name, position, is_private }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error creating channel', { status: 500 });
  }
}

export async function updateChannel(c: Context): Promise<Response> {
  try {
    const { channelId } = c.req.param();
    const { name, is_private, members = [] } = await c.req.json();
    if (!name) return new Response('Channel name is required', { status: 400 });
    const now = new Date().toISOString();
    const result = await c.env.DB.prepare('UPDATE channels SET name = ?, is_private = ?, updated_at = ? WHERE id = ?').bind(name, is_private ? 1 : 0, now, channelId).run();
    if (!result.success) return new Response('Channel not found', { status: 404 });
    await c.env.DB.prepare('DELETE FROM channel_members WHERE channel_id = ?').bind(channelId).run();
    if (is_private && Array.isArray(members)) {
      for (const m of members) { try { await c.env.DB.prepare('INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)').bind(channelId, m).run(); } catch {} }
    }
    return new Response(JSON.stringify({ message: 'Channel updated', id: channelId, name, is_private }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error updating channel', { status: 500 });
  }
}

export async function deleteChannel(c: Context): Promise<Response> {
  try {
    const { channelId } = c.req.param();
    if (channelId === 'general') return new Response('Cannot delete the general channel', { status: 403 });
    await c.env.DB.prepare('DELETE FROM channel_members WHERE channel_id = ?').bind(channelId).run();
    await c.env.DB.prepare('DELETE FROM messages WHERE channel_id = ?').bind(channelId).run();
    const result = await c.env.DB.prepare('DELETE FROM channels WHERE id = ?').bind(channelId).run();
    if (!result.success) return new Response('Channel not found', { status: 404 });
    return new Response(JSON.stringify({ message: 'Channel deleted' }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error deleting channel', { status: 500 });
  }
}

export async function reorderChannels(c: Context): Promise<Response> {
  try {
    const { channels } = await c.req.json() as { channels: { id: string, position: number }[] };
    if (!channels || !Array.isArray(channels) || channels.length === 0) return new Response('Channels array is required', { status: 400 });
    for (const ch of channels) {
      await c.env.DB.prepare('UPDATE channels SET position = ? WHERE id = ?').bind(ch.position, ch.id).run();
    }
    const { results } = await c.env.DB.prepare('SELECT * FROM channels ORDER BY position ASC').all();
    return new Response(JSON.stringify({ message: 'Channels reordered', channels: results }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error reordering channels', { status: 500 });
  }
}

export async function getGroupChats(c: Context): Promise<Response> {
  try {
    const userIdStr = c.req.query('user_id');
    if (!userIdStr) return new Response('User ID is required', { status: 400 });
    const userId = Number(userIdStr);
    const { results } = await c.env.DB.prepare(
      `SELECT DISTINCT channels.*, COALESCE(MAX(messages.timestamp), channels.created_at) as last_activity
       FROM channels 
       JOIN channel_members ON channels.id = channel_members.channel_id 
       LEFT JOIN messages ON channels.id = messages.channel_id
       WHERE channels.id LIKE 'group_%' AND channel_members.user_id = ?
       GROUP BY channels.id, channels.name, channels.created_by, channels.created_at, channels.updated_at, channels.position, channels.is_private
       ORDER BY last_activity DESC`
    ).bind(userId).all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error fetching group chats', { status: 500 });
  }
}

export async function createGroupChat(c: Context): Promise<Response> {
  try {
    const { name, created_by, members = [] } = await c.req.json();
    if (!name || !created_by) return new Response('Group name and creator ID are required', { status: 400 });
    if (!Array.isArray(members) || members.length === 0) return new Response('At least one member is required', { status: 400 });
    const groupId = `group_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date().toISOString();
    const result = await c.env.DB.prepare('INSERT INTO channels (id, name, created_by, created_at, updated_at, position, is_private) VALUES (?, ?, ?, ?, ?, ?, 1)')
      .bind(groupId, name, created_by, now, now, 0).run();
    if (!result.success) return new Response('Failed to create group chat', { status: 500 });
    const memberIds: number[] = [...members];
    if (!memberIds.includes(Number(created_by))) memberIds.push(Number(created_by));
    for (const m of memberIds) { try { await c.env.DB.prepare('INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)').bind(groupId, m).run(); } catch {} }
    return new Response(JSON.stringify({ message: 'Group chat created', id: groupId, name, members: memberIds }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error creating group chat', { status: 500 });
  }
}

export async function updateGroupChat(c: Context): Promise<Response> {
  try {
    const { groupId } = c.req.param();
    const { name, members = [] } = await c.req.json();
    if (!name) return new Response('Group name is required', { status: 400 });
    const now = new Date().toISOString();
    const result = await c.env.DB.prepare('UPDATE channels SET name = ?, updated_at = ? WHERE id = ?').bind(name, now, groupId).run();
    if (!result.success) return new Response('Group chat not found', { status: 404 });
    if (Array.isArray(members) && members.length > 0) {
      await c.env.DB.prepare('DELETE FROM channel_members WHERE channel_id = ?').bind(groupId).run();
      for (const m of members) { try { await c.env.DB.prepare('INSERT INTO channel_members (channel_id, user_id) VALUES (?, ?)').bind(groupId, m).run(); } catch {} }
    }
    return new Response(JSON.stringify({ message: 'Group chat updated', id: groupId, name, members }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error updating group chat', { status: 500 });
  }
}

export async function getChannelMembers(c: Context): Promise<Response> {
  try {
    const { channelId } = c.req.param();
    const { results } = await c.env.DB.prepare(
      `SELECT channel_members.user_id, users.full_name as username 
       FROM channel_members 
       JOIN users ON channel_members.user_id = users.id 
       WHERE channel_members.channel_id = ?`
    ).bind(channelId).all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error fetching channel members', { status: 500 });
  }
}

export async function deleteGroupChat(c: Context): Promise<Response> {
  try {
    const { groupId } = c.req.param();
    if (!groupId.startsWith('group_')) return new Response('Invalid group ID', { status: 400 });
    await c.env.DB.prepare('DELETE FROM channel_members WHERE channel_id = ?').bind(groupId).run();
    await c.env.DB.prepare('DELETE FROM messages WHERE channel_id = ?').bind(groupId).run();
    const result = await c.env.DB.prepare('DELETE FROM channels WHERE id = ?').bind(groupId).run();
    if (!result.success) return new Response('Group chat not found', { status: 404 });
    return new Response(JSON.stringify({ message: 'Group chat deleted' }), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error deleting group chat', { status: 500 });
  }
}
