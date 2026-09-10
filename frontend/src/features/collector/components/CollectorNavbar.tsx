import React from 'react';
import { Bell } from 'lucide-react';
import { Navbar, UserMenu } from '@/components/layout';
import { IconButton } from '@/components/ui';
import logo from '@/assets/GreenCycle-logo.png';

export interface CollectorNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onNotificationsClick?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const CollectorNavbar: React.FC<CollectorNavbarProps> = ({
  onMenuToggle,
  isMenuOpen = false,
  onNotificationsClick,
  onProfile,
  onSettings,
  onLogout,
}) => {
  return (
    <Navbar
      brand={
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-content">Collector Dashboard</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-content-muted">
              Field operations
            </span>
          </div>
        </div>
      }
      onMenuToggle={onMenuToggle}
      isMenuOpen={isMenuOpen}
      actions={
        <div className="flex items-center gap-2.5">
          <IconButton
            aria-label="View notifications"
            onClick={onNotificationsClick}
            className="relative"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
          </IconButton>
          <UserMenu
            user={{
              name: 'Collector User',
              email: 'collector@greencycle.lk',
              role: 'COLLECTOR',
            }}
            onProfile={onProfile}
            onSettings={onSettings}
            onLogout={onLogout}
          />
        </div>
      }
    />
  );
};