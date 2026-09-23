import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Leaf,
  X,
} from 'lucide-react';
import { UserMenu } from '@/components/layout/UserMenu';
import { useAuth } from '@/app/providers';
import { RESIDENT_USER } from '../data/residentMockData';
import type { ResidentBreadcrumb } from '../types/resident';

export interface ResidentHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  breadcrumbs?: ResidentBreadcrumb[];
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export const ResidentHeader: React.FC<ResidentHeaderProps> = ({
  onMenuToggle,
  isMenuOpen = false,
  pageTitle,
  pageSubtitle,
  breadcrumbs,
  onProfileClick,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [searchValue, setSearchValue] = useState('');

  const getComputedTitle = () => {
    if (pageTitle) return pageTitle;
    const path = location.pathname;
    if (path.includes('/resident/schedule')) return 'Collection Schedule';
    if (path.includes('/resident/tracking')) return 'Live Vehicle Tracking';
    if (path.includes('/resident/scanner')) return 'AI Waste Identifier';
    if (path.includes('/resident/pickup')) return 'Bulky Waste Pickup';
    if (path.includes('/resident/disposal-centers')) return 'Disposal Centers';
    if (path.includes('/resident/rewards')) return 'Green Points & Rewards';
    if (path.includes('/resident/reports')) return 'Citizen Reports & Complaints';
    if (path.includes('/resident/notifications')) return 'Notifications & Alerts';
    if (path.includes('/resident/settings')) return 'Household Settings';
    return 'Resident Eco-Dashboard';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/resident/disposal-centers?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate('/login');
    }
  };

  const activeUser = {
    name: user?.fullName || RESIDENT_USER.name,
    email: user?.email || RESIDENT_USER.email,
    role: 'Resident Citizen',
    avatarUrl: user?.avatarUrl,
  };

  return (
    <header className="h-[4.5rem] shrink-0 border-b border-border/80 bg-surface/95 px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 sticky top-0 z-20 backdrop-blur-md">
      {/* Left: Mobile Toggle + Title/Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 rounded-xl text-content-secondary hover:bg-muted transition-colors lg:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}

        <div className="flex flex-col min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <div className="flex items-center gap-1.5 text-xs text-content-muted">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  {crumb.href ? (
                    <button
                      type="button"
                      onClick={() => navigate(crumb.href!)}
                      className="hover:text-primary transition-colors truncate"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-content-secondary font-medium truncate">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[11px] text-content-muted uppercase tracking-wider font-bold">
              <span>Resident Portal</span>
              <span>•</span>
              <span className="text-primary font-semibold truncate">
                {user?.municipality || RESIDENT_USER.municipality}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-content truncate leading-snug">
              {getComputedTitle()}
            </h1>
            {pageSubtitle && (
              <span className="hidden md:inline-block text-xs text-content-muted font-normal">
                — {pageSubtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center & Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search for Drop-offs & Sorting Guides */}
        <form onSubmit={handleSearchSubmit} className="hidden md:block relative w-52 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-content-muted" />
          <input
            type="text"
            placeholder="Search waste, centers..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-muted/50 text-xs text-content placeholder:text-content-muted focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </form>

        {/* Green Points Pill Button */}
        <button
          type="button"
          onClick={() => navigate('/resident/rewards')}
          title="Click to view Green Points rewards and redemption"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs">
            <Leaf className="h-3 w-3" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
              {RESIDENT_USER.greenPoints}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase">GP</span>
          </div>
        </button>


        <div className="h-6 w-px bg-border hidden sm:block" />

        {/* User Menu Dropdown */}
        <UserMenu
          user={activeUser}
          onProfile={() => {
            if (onProfileClick) onProfileClick();
            else navigate('/resident/settings');
          }}
          onSettings={() => navigate('/resident/settings')}
          onLogout={handleLogoutAction}
        />
      </div>
    </header>
  );
};
