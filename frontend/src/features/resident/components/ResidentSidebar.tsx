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
  Leaf,
  Flame,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import logoImage from '@/assets/GreenCycle-logo.png';
import { useAuth } from '@/app/providers';
import type { ResidentSidebarItem } from '../types/resident';
import { RESIDENT_USER, MOCK_RESIDENT_NOTIFICATIONS } from '../data/residentMockData';

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
  const { logout, user } = useAuth();

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
      : location.pathname.includes('/resident/disposal-centers')
      ? 'disposal-centers'
      : location.pathname.includes('/resident/rewards')
      ? 'rewards'
      : location.pathname.includes('/resident/reports')
      ? 'reports'
      : location.pathname.includes('/resident/notifications')
      ? 'notifications'
      : location.pathname.includes('/resident/settings')
      ? 'settings'
      : 'dashboard');

  const unreadCount = MOCK_RESIDENT_NOTIFICATIONS.filter((n) => !n.isRead).length;

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
          badge: 'AI Smart',
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
          href: '/resident/disposal-centers',
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
      title: 'Rewards & Eco Perks',
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
      className={`flex min-h-screen w-72 shrink-0 flex-col bg-gradient-to-b from-[#046a38] via-[#03592f] to-[#023e20] p-4 text-white select-none ${className}`}
      style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.35)' }}
    >
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/20 shadow-inner">
              <img
                src={logoImage}
                alt="GreenCycle LK"
                className="h-8 w-8 object-contain drop-shadow"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-lg font-extrabold tracking-tight text-white block leading-none">
                GreenCycle <span className="text-emerald-400">LK</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-flex items-center gap-1 bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Resident Eco-Hub
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Resident Eco Snapshot Card */}
        <div className="mx-1 rounded-2xl bg-white/10 p-3.5 backdrop-blur-md border border-white/15 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-400/30">
                <Leaf className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-emerald-200/80 uppercase tracking-wider">
                  Green Points
                </div>
                <div className="text-sm font-black text-white flex items-center gap-1">
                  <span>{RESIDENT_USER.greenPoints}</span>
                  <span className="text-[10px] font-bold text-emerald-300">GP</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                <Flame className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>{RESIDENT_USER.streakDays}d Streak</span>
              </div>
              <div className="text-[10px] font-medium text-emerald-200/70 mt-1 truncate max-w-[90px]">
                {RESIDENT_USER.rankTitle}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/15 shadow-[0_-2px_8px_rgba(0,0,0,0.45),0_4px_16px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Categorized Navigation Groups */}
      <nav className="flex-1 space-y-4 overflow-y-auto pt-3 pr-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {section.title && (
              <div className="px-3 pt-1.5 pb-1">
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
                    className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs transition-all ${
                      isActive
                        ? 'bg-white/20 font-bold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-sm'
                        : 'font-semibold text-emerald-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                        isActive ? 'text-emerald-300' : 'text-emerald-200/80'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left truncate">{item.label}</span>

                    {/* Live indicator or badge */}
                    {item.isLive && (
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-400/30">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                        </span>
                        LIVE
                      </span>
                    )}

                    {item.badge && !item.isLive && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          item.badgeColor || 'bg-white/20 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 text-emerald-300 opacity-80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: User Zone Info & Logout */}
      <div className="mt-auto border-t border-white/10 pt-3 space-y-2">
        <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-200/70">
            Assigned Municipality
          </div>
          <div className="text-xs font-semibold text-white truncate">
            {user?.municipality || RESIDENT_USER.municipality}
          </div>
          <div className="text-[10px] text-emerald-300/80 truncate">
            {user?.assignedZone || RESIDENT_USER.zone}
          </div>
        </div>

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
