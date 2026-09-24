import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Truck,
  ScanLine,
  Package,
  Recycle,
  Award,
  AlertTriangle,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import logoImage from '@/assets/GreenCycle-logo.png';
import { useAuth } from '@/app/providers';
import type { ResidentSidebarItem } from '../types/resident';
import { RESIDENT_USER } from '../data/residentMockData';
import { useNotifications } from '@/shared/data/notificationStore';

export interface ResidentSidebarProps {
  activeItem?: ResidentSidebarItem;
  onItemSelect?: (item: ResidentSidebarItem) => void;
  onLogout?: () => void;
  className?: string;
}

interface NavEntry {
  id: ResidentSidebarItem;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  isLive?: boolean;
}

interface NavSection {
  title?: string;
  items: NavEntry[];
}

export const ResidentSidebar: React.FC<ResidentSidebarProps> = ({
  activeItem,
  onItemSelect,
  onLogout,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
      navigate('/login');
    }
  };

  const currentActive: ResidentSidebarItem =
    activeItem ||
    (location.pathname.includes('/resident/schedule')
      ? 'schedule'
      : location.pathname.includes('/resident/tracking')
      ? 'tracking'
      : location.pathname.includes('/resident/scanner')
      ? 'scanner'
      : location.pathname.includes('/resident/pickup')
      ? 'pickup'
      : location.pathname.includes('/resident/disposal-centers') ||
        location.pathname.includes('/disposal-centers')
      ? 'disposal-centers'
      : location.pathname.includes('/resident/rewards')
      ? 'rewards'
      : location.pathname.includes('/resident/reports') ||
        location.pathname.includes('/my-reports') ||
        location.pathname.includes('/report-issue')
      ? 'reports'
      : location.pathname.includes('/resident/notifications')
      ? 'notifications'
      : location.pathname.includes('/resident/settings')
      ? 'settings'
      : 'dashboard');

  const { unreadCount } = useNotifications('RESIDENT');

  const navSections: NavSection[] = [
    {
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard & Impact',
          href: '/resident/dashboard',
          icon: <LayoutDashboard className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
    {
      title: 'Waste & Tracking',
      items: [
        {
          id: 'schedule',
          label: 'Collection Schedule',
          href: '/resident/schedule',
          icon: <CalendarDays className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'tracking',
          label: 'Live Truck Tracking',
          href: '/resident/tracking',
          icon: <Truck className="w-4 h-4 stroke-[2.2]" />,
          isLive: true,
        },
        {
          id: 'scanner',
          label: 'AI Waste Identifier',
          href: '/resident/scanner',
          icon: <ScanLine className="w-4 h-4 stroke-[2.2]" />,
          badge: 'AI',
          badgeColor: 'bg-emerald-400/25 text-emerald-300 border border-emerald-400/30',
        },
      ],
    },
    {
      title: 'Citizen Services',
      items: [
        {
          id: 'pickup',
          label: 'Bulky Waste Pickup',
          href: '/resident/pickup',
          icon: <Package className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'disposal-centers',
          label: 'Disposal Centers',
          href: '/disposal-centers',
          icon: <Recycle className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'reports',
          label: 'Report Issues / Dumps',
          href: '/resident/reports',
          icon: <AlertTriangle className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
    {
      title: 'Rewards & Perks',
      items: [
        {
          id: 'rewards',
          label: 'Green Points & Rewards',
          href: '/resident/rewards',
          icon: <Award className="w-4 h-4 stroke-[2.2]" />,
          badge: `${RESIDENT_USER.greenPoints} GP`,
          badgeColor: 'bg-amber-400/25 text-amber-300 border border-amber-400/30',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          href: '/resident/notifications',
          icon: <Bell className="w-4 h-4 stroke-[2.2]" />,
          badge: unreadCount > 0 ? `${unreadCount}` : undefined,
          badgeColor: 'bg-rose-500/90 text-white font-extrabold',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'settings',
          label: 'Household Settings',
          href: '/resident/settings',
          icon: <Settings className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
  ];

  const handleItemClick = (entry: NavEntry, e: React.MouseEvent) => {
    e.preventDefault();
    if (onItemSelect) {
      onItemSelect(entry.id);
    }
    navigate(entry.href);
  };

  return (
    <aside
      className={`flex h-full min-h-screen w-64 shrink-0 flex-col bg-[#046a38] p-4 text-white select-none overflow-hidden ${className}`}
      style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.35)' }}
    >
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="px-2 pt-2">
          <div className="flex items-center gap-2.5">
            <img
              src={logoImage}
              alt="GreenCycle LK"
              className="h-9 w-9 shrink-0 object-contain drop-shadow"
            />
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white block leading-none">
                GreenCycle <span className="text-emerald-400">LK</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-1 bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Resident Portal
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/15 shadow-[0_-2px_8px_rgba(0,0,0,0.45),0_4px_16px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 space-y-3 overflow-y-auto pt-3 pr-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {section.title && (
              <div className="px-3.5 pt-2 pb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200/60 block">
                  {section.title}
                </span>
              </div>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentActive === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => handleItemClick(item, e)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs transition-all ${
                      isActive
                        ? 'bg-white/20 font-bold text-white shadow-sm ring-1 ring-white/30'
                        : 'font-semibold text-emerald-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left truncate">{item.label}</span>

                    {/* Live badge */}
                    {item.isLive && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-400/30">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        LIVE
                      </span>
                    )}

                    {/* Regular badge */}
                    {item.badge && !item.isLive && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          item.badgeColor || 'bg-white/20 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: Logout */}
      <div className="mt-auto border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4 text-emerald-200/90" strokeWidth={2.2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
