import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import frcAPI from '../utils/frcApiClient';

const NotificationContext = createContext(undefined);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [totalUnread, setTotalUnread] = useState(0);
  const [channelsHaveUnread, setChannelsHaveUnread] = useState(false);
  const [messagesHaveUnread, setMessagesHaveUnread] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(0);

  const CACHE_MS = 30000;

  const refreshNotifications = useCallback(async () => {
    if (!user) return;
    const now = Date.now();
    if (now - lastRefresh < CACHE_MS) return;
    setLastRefresh(now);
    try {
      const res = await frcAPI.get(`/chat/notifications/all?user_id=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        const { unreadCounts: counts, totalUnread, channelsUnread, messagesUnread } = data;
        const activeCount = activeChannel && counts[activeChannel] ? counts[activeChannel] : 0;
        const filtered = { ...counts };
        if (activeChannel) delete filtered[activeChannel];
        setUnreadCounts(filtered);
        const isActiveRegular = activeChannel && !activeChannel.startsWith('dm_') && !activeChannel.startsWith('group_');
        setTotalUnread(Math.max(0, totalUnread - activeCount));
        setChannelsHaveUnread(Math.max(0, (isActiveRegular ? channelsUnread - activeCount : channelsUnread)) > 0);
        setMessagesHaveUnread(Math.max(0, (!isActiveRegular ? messagesUnread - activeCount : messagesUnread)) > 0);
      }
    } catch {}
  }, [user, activeChannel, lastRefresh]);

  const markChannelAsRead = async (channelId) => {
    if (!user) return;
    try {
      const res = await frcAPI.post(`/chat/notifications/read/${channelId}`, { user_id: user.id });
      if (res.ok) {
        setUnreadCounts(prev => { const n = { ...prev }; delete n[channelId]; return n; });
        setLastRefresh(0);
        refreshNotifications();
      }
    } catch {}
  };

  useEffect(() => {
    if (user) {
      refreshNotifications();
      const id = setInterval(refreshNotifications, 120000);
      return () => clearInterval(id);
    } else {
      setUnreadCounts({}); setTotalUnread(0); setChannelsHaveUnread(false); setMessagesHaveUnread(false); setActiveChannel(null);
    }
  }, [user, refreshNotifications]);

  useEffect(() => {
    if (user && activeChannel !== null) {
      const t = setTimeout(() => refreshNotifications(), 1000);
      return () => clearTimeout(t);
    }
  }, [activeChannel, user, refreshNotifications]);

  const value = { unreadCounts, totalUnread, channelsHaveUnread, messagesHaveUnread, markChannelAsRead, refreshNotifications, setActiveChannel, activeChannel };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
