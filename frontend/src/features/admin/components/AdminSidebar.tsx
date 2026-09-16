import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Recycle,
  Truck,
  AlertTriangle,
  History,
  Settings,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import logoImage from '@/assets/GreenCycle-logo.png';
import { useAuth } from '@/app/providers';
import { AdminSidebarItem } from '../types/admin';

export interface AdminSidebarProps {
  activeItem?: AdminSidebarItem;
  onItemSelect?: (item: AdminSidebarItem) => void;
  onLogout?: () => void;
  className?: string;
}

interface NavEntry {
  id: AdminSidebarItem;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  title?: string;
  items: NavEntry[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
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

  // Determine active item from prop or pathname
  const currentActive =
    activeItem ||
    (location.pathname.includes('/admin/users')
      ? 'users'
      : location.pathname.includes('/admin/municipalities')
      ? 'municipalities'
      : location.pathname.includes('/admin/disposal-centers')
      ? 'disposal-centers'
      : location.pathname.includes('/admin/collection-requests')
      ? 'collection-requests'
      : location.pathname.includes('/admin/complaints')
      ? 'complaints'
      : location.pathname.includes('/admin/activity')
      ? 'activity'
      : location.pathname.includes('/admin/settings')
      ? 'settings'
      : 'dashboard');

  const navSections: NavSection[] = [
    {
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          href: '/admin/dashboard',
          icon: <LayoutDashboard className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          id: 'users',
          label: 'Users',
          href: '/admin/users',
          icon: <Users className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'municipalities',
          label: 'Municipalities',
          href: '/admin/municipalities',
          icon: <Building2 className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'disposal-centers',
          label: 'Disposal Centers',
          href: '/admin/disposal-centers',
          icon: <Recycle className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'collection-requests',
          label: 'Collection Requests',
          href: '/admin/collection-requests',
          icon: <Truck className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
    {
      title: 'Monitoring',
      items: [
        {
          id: 'complaints',
          label: 'Complaints / Reports',
          href: '/admin/complaints',
          icon: <AlertTriangle className="w-4 h-4 stroke-[2.2]" />,
        },
        {
          id: 'activity',
          label: 'Activity Logs',
          href: '/admin/activity',
          icon: <History className="w-4 h-4 stroke-[2.2]" />,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'settings',
          label: 'Admin Settings',
          href: '/admin/settings',
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
      className={`flex min-h-screen w-64 shrink-0 flex-col bg-[#046a38] p-4 text-white select-none ${className}`}
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
                  Admin Panel
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/15 shadow-[0_-2px_8px_rgba(0,0,0,0.45),0_4px_16px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 space-y-4 overflow-y-auto pt-4 pr-1">
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
