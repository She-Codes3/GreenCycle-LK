import React from 'react';
import { cn } from '../ui/utils';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  navigation,
  actions,
  onMenuToggle,
  isMenuOpen = false,
  className,
  ...props
}) => {
  return (
    <header className={cn('ui-nav-header px-4 sm:px-6 lg:px-8', className)} {...props}>
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button + Brand */}
        <div className="flex items-center gap-3">
          {onMenuToggle && (
            <button
              type="button"
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-xl text-content-secondary hover:text-primary hover:bg-muted transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}

          {brand || (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-sm shadow-sm">
                🌱
              </div>
              <span className="font-bold text-base text-content tracking-tight">GreenCycle LK</span>
            </div>
          )}
        </div>

        {/* Center: Desktop Navigation Links */}
        {navigation && (
          <nav className="hidden lg:flex items-center gap-1">{navigation}</nav>
        )}

        {/* Right Side: Quick Actions, Notifications, User Menu */}
        {actions && <div className="flex items-center gap-2.5">{actions}</div>}
      </div>
    </header>
  );
};
