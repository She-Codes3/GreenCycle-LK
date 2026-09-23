import React from 'react';
import {
  AlertTriangle,
  Bell,
  FileText,
  Gift,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Recycle,
  Settings,
  User,
} from 'lucide-react';
import { Sidebar, SidebarItem } from '@/components/layout';

export type UserSidebarItem =
  | 'dashboard'
  | 'collections'
  | 'disposal-centers'
  | 'report-issue'
  | 'my-reports'
  | 'rewards'
  | 'notifications'
  | 'settings'
  | 'profile';

export interface UserSidebarProps {
  activeItem?: UserSidebarItem;
  onItemSelect?: (item: UserSidebarItem) => void;
  onLogout?: () => void;
}

const navigationItems: Array<{ id: UserSidebarItem; label: string; href: string; icon: React.ReactNode }> = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
  { id: 'collections', label: 'My Collections', href: '/schedule', icon: <Recycle /> },
  { id: 'disposal-centers', label: 'Disposal Centers', href: '/disposal-centers', icon: <MapPinned /> },
  { id: 'report-issue', label: 'Report Issue', href: '/report-issue', icon: <AlertTriangle /> },
  { id: 'my-reports', label: 'My Reports', href: '/my-reports', icon: <FileText /> },
  { id: 'rewards', label: 'Rewards', href: '/rewards', icon: <Gift /> },
  { id: 'notifications', label: 'Notifications', href: '/notifications', icon: <Bell /> },
  { id: 'settings', label: 'Settings', href: '/settings', icon: <Settings /> },
  { id: 'profile', label: 'Profile', href: '/profile', icon: <User /> },
];

/** Renders navigation and logout controls for the resident/user workspace. */
export const UserSidebar: React.FC<UserSidebarProps> = ({
  activeItem = 'dashboard',
  onItemSelect,
  onLogout,
}) => (
  <Sidebar
    footer={
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4 text-emerald-200/90" strokeWidth={2.2} />
        <span>Logout</span>
      </button>
    }
  >
    {navigationItems.map((item) => (
      <SidebarItem
        key={item.id}
        label={item.label}
        href={item.href}
        icon={React.cloneElement(item.icon as React.ReactElement, { className: 'h-4 w-4 stroke-[2.2]' })}
        active={item.id === activeItem}
        onClick={(event) => {
          if (onItemSelect) {
            event.preventDefault();
            onItemSelect(item.id);
          }
        }}
      />
    ))}
  </Sidebar>
);
