'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-3 text-white">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">shield_locked</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">BupStore</h2>
          </Link>

          <div className="hidden md:flex flex-col min-w-64">
            <div className="flex w-full items-stretch rounded-lg h-10 glass-panel">
              <div className="text-[#9d9db9] flex items-center justify-center pl-4">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="form-input w-full border-none bg-transparent focus:ring-0 text-white placeholder:text-[#9d9db9] pl-3 text-sm"
                placeholder="Search domains or codes..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 glass-panel text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <Link
            href="/settings"
            className="flex items-center justify-center rounded-lg h-10 w-10 glass-panel text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">settings</span>
          </Link>

          <div className="relative group">
            <div className="h-10 w-10 rounded-full border-2 border-primary/50 overflow-hidden cursor-pointer">
              {user?.avatar ? (
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  src={user.avatar}
                />
              ) : (
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">
                    {user?.name?.[0] || user?.email?.[0] || 'U'}
                  </span>
                </div>
              )}
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 glass-panel rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-2">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
