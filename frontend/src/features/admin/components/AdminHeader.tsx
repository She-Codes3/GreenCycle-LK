import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { UserMenu } from '@/components/layout/UserMenu';

export interface AdminHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMenuToggle,
  isMenuOpen = false,
  pageTitle,
  breadcrumbs,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  // Compute title based on route if not explicitly provided
  const getComputedTitle = () => {
    if (pageTitle) return pageTitle;
    const path = location.pathname;
    if (path.includes('/admin/users')) return 'User Management';
    if (path.includes('/admin/municipalities')) return 'Municipality Management';
    if (path.includes('/admin/disposal-centers')) return 'Disposal Centers';
    if (path.includes('/admin/complaints')) return 'Complaints & Reports';
    if (path.includes('/admin/notifications')) return 'Notifications & Alerts';
    if (path.includes('/admin/activity')) return 'Activity Logs';
    if (path.includes('/admin/settings')) return 'Admin Settings';
    return 'Dashboard Overview';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Direct search to relevant management page or users
      navigate(`/admin/users?q=${encodeURIComponent(searchValue.trim())}`);
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
              <span>Admin Portal</span>
              <span>•</span>
              <span className="text-primary font-semibold">GreenCycle LK</span>
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
              placeholder="Search platform..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2 pl-9 pr-4 text-xs text-content outline-none transition-all placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </form>


        {/* Admin User Profile Dropdown */}
        <UserMenu
          user={{
            name: 'Eng. Anura Jayasinghe',
            email: 'admin.anura@greencycle.lk',
            role: 'System Administrator',
          }}
          onProfile={() => navigate('/admin/settings')}
          onSettings={() => navigate('/admin/settings')}
          onLogout={() => navigate('/login')}
        />
      </div>
    </header>
  );
};
