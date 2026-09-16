import React from 'react';
import {
  AlertTriangle,
  History,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Package,
  Route,
  Settings,
  User,
} from 'lucide-react';
import { Sidebar, SidebarItem } from '@/components/layout';

export type CollectorSidebarItem =
  | 'dashboard'
  | 'routes'
  | 'tracking'
  | 'bulky-waste'
  | 'bin-status'
  | 'collection-history'
  | 'settings'
  | 'profile';

export interface CollectorSidebarProps {
  activeItem?: CollectorSidebarItem;
  onItemSelect?: (item: CollectorSidebarItem) => void;
  onLogout?: () => void;
}

const navigationItems: Array<{ id: CollectorSidebarItem; label: string; href: string; icon: React.ReactNode }> = [
  { id: 'dashboard', label: 'Dashboard', href: '/collector/dashboard', icon: <LayoutDashboard /> },
  { id: 'routes', label: 'Collection Routes', href: '/collector/routes', icon: <Route /> },
  { id: 'tracking', label: 'Live GPS Tracking', href: '/collector/tracking', icon: <MapPinned /> },
  { id: 'bulky-waste', label: 'Bulky Waste Requests', href: '/collector/bulky-waste', icon: <Package /> },
  { id: 'bin-status', label: 'Overflow Reports', href: '#', icon: <AlertTriangle /> },
  { id: 'collection-history', label: 'Collection History', href: '/collector/collection-history', icon: <History /> },
  { id: 'settings', label: 'Settings', href: '#', icon: <Settings /> },
  { id: 'profile', label: 'Profile', href: '#', icon: <User /> },
];

/** Renders navigation and logout controls for the collector workspace. */
export const CollectorSidebar: React.FC<CollectorSidebarProps> = ({
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
