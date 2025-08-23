import { Hono } from 'hono';
import { getMessages, sendMessage, deleteMessage, getDMMessages, sendDMMessage } from './messages';
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
