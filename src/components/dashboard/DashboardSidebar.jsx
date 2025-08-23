import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useNotifications } from '@/contexts/NotificationContext';
import { Hash, MessagesSquare, Calendar, Users, FileText, Settings, Shield, ClipboardList, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Item = ({ to, title, icon: Icon, showDot }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <NavLink
      to={to}
      title={title}
      className={({ isActive }) =>
        `relative group flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
          isActive ? 'bg-sca-purple text-white' : 'text-gray-400 hover:text-sca-purple'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {showDot ? (
        <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sca-gold text-[10px] text-black font-bold shadow">
          •
        </span>
      ) : null}
    </NavLink>
  );
};

export default function DashboardSidebar() {
  const { channelsHaveUnread, messagesHaveUnread } = useNotifications();
  const { user, clearSession } = useAuth();

  const handleLogout = () => {
    try { clearSession(); } catch {}
    window.location.href = '/';
  };

  return (
    <aside className="hidden md:flex md:flex-col items-center gap-3 py-4 px-2 border-r border-white/10 bg-black">
      <Link to="/" title="Home" className="mb-1">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
          <img src="/Star.png" alt="Team 7598" className="w-8 h-8" />
        </div>
      </Link>
      <Item to="/channels" title="Channels" icon={Hash} showDot={channelsHaveUnread} />
  <Item to="/messages" title="Direct Messages" icon={MessagesSquare} showDot={messagesHaveUnread} />
      <Item to="/calendar" title="Calendar" icon={Calendar} />
  <Item to="/planner" title="Planner" icon={ClipboardList} />
  <Item to="/profile" title="Profile" icon={UserIcon} />
      <div className="h-px w-8 bg-white/10 my-2" />
      {user?.isAdmin && (
        <Item to="/admin/users" title="Admin Users" icon={Shield} />
      )}

      {/* Bottom section: divider + logout button */}
      <div className="mt-auto w-full flex flex-col items-center">
        <div className="h-px w-8 bg-white/10 my-2" />
        <button
          title="Logout"
          onClick={handleLogout}
          className="relative group flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-sca-purple transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
