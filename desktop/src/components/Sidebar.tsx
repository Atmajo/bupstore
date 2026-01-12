import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { to: '/vault', icon: 'language', label: 'Domains' },
    { to: '/security', icon: 'verified_user', label: 'Security' },
    { to: '/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col justify-between p-4 bg-background-dark">
      <div className="flex flex-col gap-8 mt-10">
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'sidebar-item-active text-primary'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile/Add */}
      <div className="flex flex-col gap-4">
        <Link
          to="/vault/add"
          className="w-full bg-primary hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Add New Code</span>
        </Link>

        <div className="flex items-center gap-3 p-2 border-t border-white/10 pt-4">
          <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
            {user?.avatar ? (
              <img
                className="w-full h-full object-cover"
                alt="User avatar"
                src={user.avatar}
              />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">
                  {user?.name?.[0] || user?.email?.[0] || 'U'}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email || ''}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
