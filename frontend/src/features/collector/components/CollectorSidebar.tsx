import React from 'react';
import {
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Package,
  Route,
  Settings,
  User,
} from 'lucide-react';
import logo from '@/assets/GreenCycle-logo.png';

export type CollectorSidebarItem =
  | 'dashboard'
  | 'routes'
  | 'tracking'
  | 'bulky-waste'
  | 'bin-status'
  | 'monitoring'
  | 'settings'
  | 'profile';

export interface CollectorSidebarProps {
  activeItem?: CollectorSidebarItem;
  onItemSelect?: (item: CollectorSidebarItem) => void;
  onLogout?: () => void;
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
    { id: 'bin-status', label: 'Overflow Reports', href: '#', icon: <AlertTriangle /> },
    { id: 'monitoring', label: 'Collection Analytics', href: '/municipal/collection-monitoring', icon: <BarChart3 /> },
    { id: 'settings', label: 'Settings', href: '#', icon: <Settings /> },
    { id: 'profile', label: 'Profile', href: '#', icon: <User /> },
  ];

export const CollectorSidebar: React.FC<CollectorSidebarProps> = ({
  activeItem = 'dashboard',
  onItemSelect,
  onLogout,
}) => {
  return (
    <aside className="w-64 sm:w-68 bg-[#046a38] text-white min-h-screen p-4 flex flex-col justify-between shrink-0" style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.35)' }}>
      <div className="space-y-5">
        {/* Top Logo & Title */}
        <div className="pb-1">
          <div className="flex items-center gap-2.5 px-2 pt-2">
            <img src={logo} alt="GreenCycle LK" className="h-9 w-9 object-contain shrink-0" />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
              GreenCycle <span className="text-emerald-400">LK</span>
            </span>
          </div>
        </div>
        {/* Divider with shadow */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', boxShadow: '0 4px 16px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)', marginBottom: '8px' }} />

        {/* Navigation Items Stack */}
        <nav className="space-y-1.5 pt-1">
          {navigationItems.map((item) => {
            const isActive = item.id === activeItem;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (onItemSelect) {
                    e.preventDefault();
                    onItemSelect(item.id);
                  }
                }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${isActive
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
                  }`}
              >
                <span
                  className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-200/90'
                    }`}
                >
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: 'h-4 w-4 stroke-[2.2]',
                  })}
                </span>
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Logout Item */}
      <div className="pt-4 border-t border-emerald-700/60">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 font-semibold text-xs transition-colors text-left"
        >
          <LogOut className="h-4 w-4 text-emerald-200/90 stroke-[2.2]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

