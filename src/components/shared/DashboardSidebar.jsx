import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HashtagIcon, CalendarIcon, CheckCircleIcon, UserCircleIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

function DashboardSidebar({ isMobile = false, onNavigate }) {
  const { user, clearSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/');
    if (onNavigate) onNavigate();
  };

  const handleNavigation = () => {
    if (onNavigate) onNavigate();
  };

  const navigation = [
    { name: 'Channels', href: '/dashboard', icon: HashtagIcon },
    { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Tasks', href: '/tasks', icon: CheckCircleIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ];

  const adminNavigation = [
    { name: 'Users', href: '/admin/users', icon: ShieldCheckIcon },
  ];

  if (isMobile) {
    return (
      <div className="text-white">
        {/* Mobile Menu Content */}
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleNavigation}
              className={`relative flex items-center px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors ${
                location.pathname === item.href ? 'bg-sca-purple text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          {user?.isAdmin && (
            <div className="mt-4 pt-4 border-t border-gray-700 space-y-1">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</h3>
              {adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavigation}
                  className={`relative flex items-center px-3 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors ${
                    location.pathname === item.href ? 'bg-sca-purple text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with inset divider */}
      <div className="flex items-center justify-center h-16 px-2">
        <div className="flex-1 flex items-center justify-center border-b border-gray-700">
          <Link to="/" className="flex items-center mb-2 space-x-2">
            <img src="/Logo.svg" alt="FRC 7598 Logo" className="w-12 h-12" />
          </Link>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`relative flex items-center justify-center py-2 text-sm font-medium rounded-xl hover:text-sca-purple transition-colors ${
              location.pathname === item.href ? 'bg-sca-purple text-white hover:text-white' : ''
            }`}
            title={item.name}
          >
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
        {user?.isAdmin && (
          <div className="pt-4 mt-4 space-y-2 border-t border-gray-700">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center justify-center py-2 text-sm font-medium rounded-xl hover:text-sca-purple transition-colors ${
                  location.pathname === item.href ? 'bg-sca-purple text-white hover:text-white' : ''
                }`}
                title={item.name}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        )}
      </nav>
      {/* Footer with inset divider */}
      <div className="px-2">
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full justify-center py-2 text-sm font-medium rounded-xl hover:text-sca-purple transition-colors"
            title="Sign Out"
          >
            <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;