import React, { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import { cn } from '../ui/utils';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  showBrand?: boolean;
}

/** Renders the shared dashboard navigation bar and user actions. */
export const Navbar: React.FC<NavbarProps> = ({
  brand,
  navigation,
  actions,
  onMenuToggle,
  isMenuOpen = false,
  onNotificationsClick,
  onProfileClick,
  userName = 'GreenCycle User',
  userRole = 'Resident',
  notificationCount = 0,
  showBrand = false,
  className,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className={cn('h-[4.5rem] shrink-0 border-b border-slate-200/70 bg-white px-6 flex items-center gap-4', className)} {...props}>
      <div className="flex w-full items-center gap-4">
        {/* Left Side: Mobile Menu Button + Brand */}
        <div className="flex items-center gap-3">
          {onMenuToggle ? (
            <button
              type="button"
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}

          {showBrand && (brand || (
            <div className="flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-8 h-8 rounded-xl bg-[#046a38] flex items-center justify-center text-sm shadow-sm">🌱</div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                GreenCycle <span className="text-emerald-400">LK</span>
              </span>
            </div>
          ))}
        </div>

        {/* Center: Desktop Navigation Links */}
        {navigation && (
          <nav className="hidden lg:flex items-center gap-1">{navigation}</nav>
        )}

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={1.8} />
              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search..."
                aria-label="Search"
                className="w-full rounded-xl border border-transparent bg-slate-100 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#046a38]/40 focus:bg-white"
              />
            </div>
          </div>

          {actions || (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onProfileClick}
                className="flex min-h-13 items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#046a38] text-white">
                  <User className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="hidden flex-col text-left sm:flex">
                  <span className="text-xs font-bold leading-tight text-slate-900">{userName}</span>
                  <span className="text-[10px] font-medium leading-tight text-slate-400">{userRole}</span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
