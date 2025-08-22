import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HashtagIcon, CalendarIcon, CheckCircleIcon, UserCircleIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function MobileDashboardNav() {
  const { user } = useAuth();
  const location = useLocation();

  // Base navigation items
  const baseNavigation = [
    { name: 'Channels', href: '/dashboard', icon: HashtagIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Tasks', href: '/tasks', icon: CheckCircleIcon },
  ];

  // Add profile and admin based on screen size and user role
  const navigation = [
    ...baseNavigation,
    ...(user?.isAdmin ? [
      { name: 'Admin', href: '/admin/users', icon: ShieldCheckIcon }
    ] : [
      { name: 'Profile', href: '/profile', icon: UserCircleIcon }
    ])
  ];

  return (
    <div className="bg-black border-t border-gray-700 px-1 py-2 sticky bottom-0 z-30 safe-area-inset">
      <nav className="flex items-center justify-around max-w-screen-sm mx-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`relative flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-200 min-w-0 mobile-touch-target ${
              location.pathname === item.href 
                ? 'bg-sca-purple text-white transform scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <div className="relative">
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs mt-1 font-medium truncate max-w-full leading-tight">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default MobileDashboardNav;