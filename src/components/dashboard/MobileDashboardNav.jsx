import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNotifications } from '@/contexts/NotificationContext';
import { Hash, MessagesSquare, ClipboardList } from 'lucide-react';

export default function MobileDashboardNav() {
  const { channelsHaveUnread, messagesHaveUnread } = useNotifications();

  const Item = ({ to, label, icon: Icon, showDot }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex-1 flex flex-col items-center justify-center py-2 ${
          isActive ? 'text-white' : 'text-gray-400'
        }`
      }
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {showDot ? (
          <span className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-sca-gold shadow" />
        ) : null}
      </div>
      <span className="text-[11px] mt-0.5">{label}</span>
    </NavLink>
  );

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur">
      <div className="max-w-screen-sm mx-auto flex items-stretch">
        <Item to="/channels" label="Channels" icon={Hash} showDot={channelsHaveUnread} />
        <Item to="/messages" label="Messages" icon={MessagesSquare} showDot={messagesHaveUnread} />
  <Item to="/planner" label="Planner" icon={ClipboardList} />
      </div>
    </nav>
  );
}
