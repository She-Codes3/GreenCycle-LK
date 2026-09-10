import React from 'react';
import { BarChart3, LayoutDashboard, MapPinned, Package, Route } from 'lucide-react';
import { Sidebar, SidebarItem } from '@/components/layout';
import logo from '@/assets/GreenCycle-logo.png';

export type CollectorSidebarItem =
  | 'dashboard'
  | 'routes'
  | 'tracking'
  | 'bulky-waste'
  | 'monitoring';

export interface CollectorSidebarProps {
  activeItem?: CollectorSidebarItem;
  footer?: React.ReactNode;
}

const navigationItems: Array<{
  id: CollectorSidebarItem;
  label: string;
  href: string;
  icon: React.ReactNode;
}> = [
  { id: 'dashboard', label: 'Dashboard', href: '/collector/dashboard', icon: <LayoutDashboard /> },
  { id: 'routes', label: 'Collection Routes', href: '/collector/routes', icon: <Route /> },
  { id: 'tracking', label: 'Live GPS Tracking', href: '/collector/tracking', icon: <MapPinned /> },
  { id: 'bulky-waste', label: 'Bulky Waste Requests', href: '/collector/bulky-waste', icon: <Package /> },
  {
    id: 'monitoring',
    label: 'Collection Monitoring',
    href: '/municipal/collection-monitoring',
    icon: <BarChart3 />,
  },
];

export const CollectorSidebar: React.FC<CollectorSidebarProps> = ({
  activeItem = 'dashboard',
  footer = (
    <div className="flex items-center justify-between text-xs text-content-muted">
      <span>Collector portal</span>
      <span className="font-semibold text-emerald-700">● Online</span>
    </div>
  ),
}) => {
  return (
    <Sidebar
      logo={<img src={logo} alt="" className="h-10 w-10 object-contain" />}
      brandName="GreenCycle LK"
      brandSubtitle="Collector portal"
      footer={footer}
    >
      <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-content-muted">
        Operations
      </div>
      {navigationItems.map((item) => (
        <SidebarItem
          key={item.id}
          href={item.href}
          label={item.label}
          icon={React.cloneElement(item.icon as React.ReactElement, {
            'aria-hidden': true,
            className: 'h-5 w-5',
          })}
          active={item.id === activeItem}
        />
      ))}
    </Sidebar>
  );
};