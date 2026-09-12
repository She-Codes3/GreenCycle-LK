import React, { useState } from 'react';
import { Bell, Menu, User, Search } from 'lucide-react';

export interface CollectorNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

export const CollectorNavbar: React.FC<CollectorNavbarProps> = ({
  onMenuToggle,
  isMenuOpen = false,
  onNotificationsClick,
  onProfileClick,
  userName = 'Kanishka Perera',
  userRole = 'Field Collector',
  notificationCount = 5,
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="bg-white px-6 py-3 border-b border-slate-200/70 mb-6 flex items-center gap-4">

      {/* Left: Hamburger icon — display only */}
      <span className="text-slate-600 shrink-0">
        <Menu className="h-5 w-5" strokeWidth={2} />
      </span>


      {/* Center: Search bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={1.8} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm text-slate-700 bg-slate-100 rounded-xl border border-transparent focus:outline-none focus:border-[#046a38]/40 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Bell + Profile pill */}
      <div className="flex min-h-12 items-center gap-3 ml-auto">

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="View notifications"
          onClick={onNotificationsClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 shadow-sm hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#046a38] text-white text-[9px] font-extrabold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile pill: user icon + name + role */}
        <button
          type="button"
          onClick={onProfileClick}
          className="flex min-h-13 items-center gap-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl pl-3 pr-3 py-2 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[#046a38] text-white flex items-center justify-center shrink-0">
            <User className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {userName}
            </span>
            <span className="text-[10px] font-medium text-slate-400 leading-tight">
              {userRole}
            </span>
          </div>
        </button>

      </div>
    </header>
  );
};
