import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, Search, CheckCircle2, AlertCircle, Truck } from 'lucide-react';
import { UserMenu } from '@/components/layout/UserMenu';
import { MOCK_MUNICIPAL_NOTIFICATIONS, MUNICIPAL_USER } from '../data/municipalMockData';

export interface MunicipalHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const MunicipalHeader: React.FC<MunicipalHeaderProps> = ({
  onMenuToggle,
  isMenuOpen = false,
  pageTitle,
  breadcrumbs,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

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
    if (path.includes('/municipal/collection-requests')) return 'Collection Requests';
    if (path.includes('/municipal/disposal-centers')) return 'Disposal Centers';
    if (path.includes('/municipal/collectors')) return 'Collectors';
    if (path.includes('/municipal/complaints')) return 'Complaints & Reports';
    if (path.includes('/municipal/schedule')) return 'Collection Schedule';
    if (path.includes('/municipal/activity')) return 'Activity Logs';
    if (path.includes('/municipal/settings')) return 'Municipal Settings';
    return 'Dashboard Overview';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/municipal/collection-requests?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="h-[4.5rem] shrink-0 border-b border-border/80 bg-surface px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
      {/* Left: Mobile Toggle + Title/Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-xl text-content-secondary hover:bg-muted transition-colors lg:hidden"
          >
            <Menu className="h-5 w-5" />
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
              <span>Municipal Portal</span>
              <span>•</span>
              <span className="text-primary font-semibold">Kandy MC</span>
            </div>
          )}

          <h1 className="text-base sm:text-lg font-black text-content tracking-tight truncate">
            {getComputedTitle()}
          </h1>
        </div>
      </div>

      {/* Right Actions: Global Search + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:block w-56 lg:w-72">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search requests..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2 pl-9 pr-4 text-xs text-content outline-none transition-all placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </form>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            aria-label="View notifications"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted text-content transition-colors border border-border/60"
          >
            <Bell className="h-4 w-4" strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#046a38] text-[9px] font-black text-white shadow-sm ring-2 ring-surface">
              {MOCK_MUNICIPAL_NOTIFICATIONS.length}
            </span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-surface border border-border shadow-elevated z-50 overflow-hidden animate-fade-in">
              <div className="p-3.5 border-b border-border/80 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-content">Municipal Notifications</span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {MOCK_MUNICIPAL_NOTIFICATIONS.length} New
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
                {MOCK_MUNICIPAL_NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setIsNotifOpen(false);
                      if (n.type === 'complaint') navigate('/municipal/complaints');
                      else if (n.type === 'capacity') navigate('/municipal/disposal-centers');
                      else navigate('/municipal/collection-requests');
                    }}
                    className="p-3 hover:bg-muted/50 transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'complaint' ? (
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                          <AlertCircle className="w-3.5 h-3.5" />
                        </div>
                      ) : n.type === 'request' ? (
                        <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200">
                          <Truck className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-content leading-tight line-clamp-1">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-content-muted mt-0.5 block">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-border/80 bg-muted/20 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/municipal/activity');
                  }}
                  className="text-xs font-bold text-primary hover:underline py-1"
                >
                  View All Activity Logs →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Municipal User Profile Dropdown */}
        <UserMenu
          user={{
            name: MUNICIPAL_USER.name,
            email: MUNICIPAL_USER.email,
            role: MUNICIPAL_USER.role,
          }}
          onProfile={() => navigate('/municipal/settings')}
          onSettings={() => navigate('/municipal/settings')}
          onLogout={() => navigate('/login')}
        />
      </div>
    </header>
  );
};
