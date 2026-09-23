import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Menu,
  Search,
  AlertCircle,
  Truck,
  Leaf,
  Award,
  Package,
  ExternalLink,
  X,
} from 'lucide-react';
import { UserMenu } from '@/components/layout/UserMenu';
import { useAuth } from '@/app/providers';
import { RESIDENT_USER, MOCK_RESIDENT_NOTIFICATIONS } from '../data/residentMockData';
import type { ResidentBreadcrumb, ResidentNotification } from '../types/resident';

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
  onNotificationsClick,
  onProfileClick,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [searchValue, setSearchValue] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<ResidentNotification[]>(MOCK_RESIDENT_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: ResidentNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    setIsNotifOpen(false);
    if (notif.link) {
      navigate(notif.link);
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

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case 'collection':
        return <Truck className="h-4 w-4 text-emerald-600" />;
      case 'pickup':
        return <Package className="h-4 w-4 text-amber-600" />;
      case 'reward':
        return <Award className="h-4 w-4 text-emerald-500" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
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

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="View notifications"
            onClick={() => {
              setIsNotifOpen((prev) => !prev);
              if (onNotificationsClick) onNotificationsClick();
            }}
            className="relative p-2 sm:p-2.5 rounded-xl text-content-secondary hover:bg-muted hover:text-content transition-colors border border-transparent hover:border-border"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white ring-2 ring-surface animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-surface border border-border shadow-elevated z-dropdown overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-content">Resident Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-content-muted">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3.5 flex items-start gap-3 hover:bg-muted/60 transition-colors cursor-pointer text-left ${
                        !n.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-surface border border-border/80 shrink-0 shadow-2xs mt-0.5">
                        {getNotificationIcon(n.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <p className={`text-xs truncate ${!n.isRead ? 'font-bold text-content' : 'font-medium text-content-secondary'}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-content-muted shrink-0">
                            {n.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-content-secondary line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                      {!n.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 border-t border-border bg-muted/20 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/resident/notifications');
                  }}
                  className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  <span>View All Notifications</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

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
