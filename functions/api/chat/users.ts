import { Context } from 'hono';

export async function getAllUsers(c: Context): Promise<Response> {
  try {
  const { results } = await c.env.DB.prepare('SELECT id, full_name as username, is_admin, avatar_color FROM users ORDER BY full_name ASC').all();
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response('Error fetching users', { status: 500 });
  }
}

export async function getRecentDMUsers(c: Context): Promise<Response> {
  try {
    const userIdStr = c.req.query('user_id');
    const userId = userIdStr ? Number(userIdStr) : undefined;
    if (!userId) return new Response('User ID is required', { status: 400 });

    // Derive recent DM partners from messages table where channel_id like 'dm_%'
    const dmLike = 'dm_%';
    const { results } = await c.env.DB.prepare(
      `WITH dm_msgs AS (
         SELECT channel_id, MAX(timestamp) as last_time
         FROM messages 
         WHERE channel_id LIKE ? AND (
           channel_id LIKE ? OR channel_id LIKE ?
         )
         GROUP BY channel_id
       ),
       parts AS (
         SELECT
           channel_id,
           last_time,
           CAST(substr(channel_id, 4, instr(substr(channel_id, 4), '_') - 1) AS INTEGER) as uid1,
           CAST(substr(channel_id, 4 + instr(substr(channel_id, 4), '_')) AS INTEGER) as uid2
         FROM dm_msgs
       )
  SELECT u.id, u.full_name as username, u.is_admin,
    u.avatar_color,
    p.last_time as last_message_time
       FROM parts p
       JOIN users u
         ON (
           CASE WHEN p.uid1 = ? THEN p.uid2 WHEN p.uid2 = ? THEN p.uid1 END
         ) = u.id
       ORDER BY p.last_time DESC`
    ).bind(dmLike, `dm_${userId}_%`, `dm_%_${userId}`, userId, userId).all();

    // Fallback: if none, return all except current
    if (!results || (results as any[]).length === 0) {
  const { results: all } = await c.env.DB.prepare('SELECT id, full_name as username, is_admin, avatar_color FROM users WHERE id != ? ORDER BY full_name ASC').bind(userId).all();
      return new Response(JSON.stringify(all), { headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response('Error fetching recent users', { status: 500 });
  }
}
