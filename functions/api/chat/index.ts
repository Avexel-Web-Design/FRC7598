import { Hono } from 'hono';
import { getMessages, sendMessage, deleteMessage, getDMMessages, sendDMMessage } from './messages';
import { Context } from 'hono';
import { 
  getChannels, 
  createChannel, 
  updateChannel, 
  deleteChannel,
  reorderChannels,
  getChannelMembers,
  getGroupChats,
  createGroupChat,
  updateGroupChat,
  deleteGroupChat
} from './channels';
import { markChannelAsRead, getUnreadCounts, getTotalUnreadCount, getAllNotificationData } from './notifications';
import { getAllUsers, getRecentDMUsers } from './users';

const chat = new Hono();

// Messages endpoints
chat.get('/messages/:channelId', getMessages);
chat.post('/messages/:channelId', sendMessage);
chat.delete('/messages/:messageId', deleteMessage);

// Direct Messages endpoints
chat.get('/messages/dm/:dmId', getDMMessages);
chat.post('/messages/dm/:dmId', sendDMMessage);

// Reactions
chat.post('/messages/:messageId/reactions/:reactionKey/toggle', async (c: Context) => {
  const { messageId, reactionKey } = c.req.param();
  const userIdStr = c.req.query('user_id');
  const userId = userIdStr ? Number(userIdStr) : undefined;
  if (!userId) return c.json({ error: 'User ID is required' }, 400);
  try {
    // Check message exists and determine channel id to validate access if private/group
    const msg = await c.env.DB.prepare('SELECT channel_id FROM messages WHERE id = ?').bind(messageId).first();
    if (!msg) return c.json({ error: 'Message not found' }, 404);
    const channelId = (msg as any).channel_id as string;
    if (channelId && !channelId.startsWith('dm_')) {
      // If it's a channel/group, ensure user is allowed when private
      const chan = await c.env.DB.prepare('SELECT is_private FROM channels WHERE id = ?').bind(channelId).first();
      if (!chan) return c.json({ error: 'Channel not found' }, 404);
      const isPrivate = (chan as any).is_private === 1;
      if (isPrivate) {
        const adm = await c.env.DB.prepare('SELECT is_admin FROM users WHERE id = ?').bind(userId).first();
        const isAdmin = !!adm && (adm as any).is_admin === 1;
        if (!isAdmin) {
          const mem = await c.env.DB.prepare('SELECT 1 FROM channel_members WHERE channel_id = ? AND user_id = ?').bind(channelId, userId).first();
          if (!mem) return c.json({ error: 'Forbidden' }, 403);
        }
      }
    } else if (channelId && channelId.startsWith('dm_')) {
      // Validate DM membership
      const parts = channelId.split('_');
      if (parts.length !== 3) return c.json({ error: 'Invalid DM' }, 400);
      const u1 = parseInt(parts[1]);
      const u2 = parseInt(parts[2]);
      if (userId !== u1 && userId !== u2) return c.json({ error: 'Forbidden' }, 403);
    }

    const existing = await c.env.DB.prepare('SELECT 1 FROM message_reactions WHERE message_id = ? AND user_id = ? AND reaction_key = ?')
      .bind(messageId, userId, reactionKey)
      .first();
    if (existing) {
      await c.env.DB.prepare('DELETE FROM message_reactions WHERE message_id = ? AND user_id = ? AND reaction_key = ?')
        .bind(messageId, userId, reactionKey)
        .run();
      return c.json({ toggled: 'off' });
    } else {
      await c.env.DB.prepare('INSERT INTO message_reactions (message_id, user_id, reaction_key, created_at) VALUES (?, ?, ?, ?)')
        .bind(messageId, userId, reactionKey, new Date().toISOString())
        .run();
      return c.json({ toggled: 'on' });
    }
  } catch (e) {
    return c.json({ error: 'Failed to toggle reaction' }, 500);
  }
});

// Channels endpoints
chat.get('/channels', getChannels);
chat.post('/channels', createChannel);
chat.put('/channels/:channelId', updateChannel);
chat.delete('/channels/:channelId', deleteChannel);
chat.get('/channels/:channelId/members', getChannelMembers);
chat.post('/channels/reorder', reorderChannels);

// Group chat endpoints
chat.get('/groups', getGroupChats);
chat.post('/groups', createGroupChat);
chat.put('/groups/:groupId', updateGroupChat);
chat.delete('/groups/:groupId', deleteGroupChat);

// Notifications endpoints
chat.post('/notifications/read/:channelId', markChannelAsRead);
chat.get('/notifications/all', getAllNotificationData);
chat.get('/notifications/unread', getUnreadCounts);
chat.get('/notifications/total', getTotalUnreadCount);

// Users (for DMs)
chat.get('/users', getAllUsers);
chat.get('/users/recent', getRecentDMUsers);

export default chat;
