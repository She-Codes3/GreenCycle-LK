import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Truck,
  ScanLine,
  Menu,
} from 'lucide-react';
import type { ResidentSidebarItem } from '../types/resident';

export interface ResidentBottomNavProps {
  onMenuToggle?: () => void;
  activeItem?: ResidentSidebarItem;
  className?: string;
}

export const ResidentBottomNav: React.FC<ResidentBottomNavProps> = ({
  onMenuToggle,
  activeItem,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path: string, id: ResidentSidebarItem) => {
    if (activeItem) return activeItem === id;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className={`fixed bottom-0 left-0 right-0 z-30 flex lg:hidden items-center justify-around border-t border-border bg-surface/95 backdrop-blur-md px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] select-none safe-area-pb ${className}`}
    >
      {/* 1. Dashboard */}
      <button
        type="button"
        onClick={() => navigate('/resident/dashboard')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
          isActive('/resident/dashboard', 'dashboard')
            ? 'text-primary font-bold'
            : 'text-content-muted hover:text-content'
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
            isActive('/resident/dashboard', 'dashboard')
              ? 'bg-primary/10 text-primary'
              : 'text-content-secondary'
          }`}
        >
          <LayoutDashboard className="h-5 w-5 stroke-[2.2]" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
      </button>

      {/* 2. Schedule */}
      <button
        type="button"
        onClick={() => navigate('/resident/schedule')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
          isActive('/resident/schedule', 'schedule')
            ? 'text-primary font-bold'
            : 'text-content-muted hover:text-content'
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
            isActive('/resident/schedule', 'schedule')
              ? 'bg-primary/10 text-primary'
              : 'text-content-secondary'
          }`}
        >
          <CalendarDays className="h-5 w-5 stroke-[2.2]" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">Schedule</span>
      </button>

      {/* 3. Center Prominent AI Waste Scanner Action */}
      <div className="flex flex-col items-center justify-center px-1">
        <button
          type="button"
          onClick={() => navigate('/resident/scanner')}
          aria-label="AI Waste Scanner"
          className="relative -top-3 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#046a38] to-[#10b981] text-white shadow-lg shadow-emerald-700/30 transition-transform active:scale-95 border-2 border-surface"
        >
          <ScanLine className="h-6 w-6 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400 border border-white"></span>
          </span>
        </button>
        <span className="text-[10px] font-bold text-emerald-800 -mt-2">Scan</span>
      </div>

      {/* 4. Live Vehicle Tracking */}
      <button
        type="button"
        onClick={() => navigate('/resident/tracking')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
          isActive('/resident/tracking', 'tracking')
            ? 'text-primary font-bold'
            : 'text-content-muted hover:text-content'
        }`}
      >
        <div
          className={`relative flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
            isActive('/resident/tracking', 'tracking')
              ? 'bg-primary/10 text-primary'
              : 'text-content-secondary'
          }`}
        >
          <Truck className="h-5 w-5 stroke-[2.2]" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-surface animate-pulse" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">Live Truck</span>
      </button>

      {/* 5. More / Menu Drawer */}
      <button
        type="button"
        onClick={onMenuToggle}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-content-muted hover:text-content transition-all"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl text-content-secondary hover:bg-muted">
          <Menu className="h-5 w-5 stroke-[2.2]" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">More</span>
      </button>
    </nav>
  );
};
