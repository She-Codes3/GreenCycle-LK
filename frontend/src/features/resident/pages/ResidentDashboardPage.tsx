import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ResidentLayout } from '../components/ResidentLayout';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Truck,
  ScanLine,
  Package,
  Recycle,
  Award,
  AlertTriangle,
  Bell,
  Settings,
} from 'lucide-react';

interface RouteInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ROUTE_CONFIG: Record<string, RouteInfo> = {
  '/resident/dashboard': {
    title: 'Resident Eco-Dashboard',
    description: 'Household waste overview, recycling metrics, and environmental impact score.',
    icon: <Compass className="w-6 h-6 text-primary" />,
  },
  '/resident/schedule': {
    title: 'Collection Schedules',
    description: 'Municipal waste pickup calendar, segregated collection days, and reminders.',
    icon: <CalendarDays className="w-6 h-6 text-primary" />,
  },
  '/resident/tracking': {
    title: 'Live Vehicle GPS Tracking',
    description: 'Real-time location of municipal waste trucks and arrival ETA for your street.',
    icon: <Truck className="w-6 h-6 text-primary" />,
  },
  '/resident/scanner': {
    title: 'AI Waste Identifier',
    description: 'Scan item photos or barcodes to get instant disposal, sorting, and bin guidance.',
    icon: <ScanLine className="w-6 h-6 text-primary" />,
  },
  '/resident/pickup': {
    title: 'Bulky Waste Pickup Requests',
    description: 'Book municipal or private collection for large appliances, e-waste, and furniture.',
    icon: <Package className="w-6 h-6 text-primary" />,
  },
  '/resident/disposal-centers': {
    title: 'Disposal & Recycling Centers',
    description: 'Interactive map and directory of municipal drop-off centers across Sri Lanka.',
    icon: <Recycle className="w-6 h-6 text-primary" />,
  },
  '/resident/rewards': {
    title: 'Green Points & Citizen Rewards',
    description: 'Redeem eco-points for utility bill discounts, bus passes, and supermarket vouchers.',
    icon: <Award className="w-6 h-6 text-primary" />,
  },
  '/resident/reports': {
    title: 'Issue Reporting & Complaints',
    description: 'Report missed garbage collections, illegal dumping sites, or overflowing bins.',
    icon: <AlertTriangle className="w-6 h-6 text-primary" />,
  },
  '/resident/notifications': {
    title: 'Notifications & Municipal Announcements',
    description: 'All collection notices, schedule adjustments, and citizen alerts.',
    icon: <Bell className="w-6 h-6 text-primary" />,
  },
  '/resident/settings': {
    title: 'Household & Account Settings',
    description: 'Manage household address, municipality zone, notification preferences, and security.',
    icon: <Settings className="w-6 h-6 text-primary" />,
  },
};

export const ResidentDashboardPage: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentInfo = ROUTE_CONFIG[currentPath] || {
    title: 'Resident Portal',
    description: 'Smart municipal waste management and citizen participation.',
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  };

  return (
    <ResidentLayout>
      <div className="rounded-3xl border border-dashed border-emerald-300/80 bg-gradient-to-b from-emerald-50/50 via-white to-canvas p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs">
            {currentInfo.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              Active Route Slot
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-content tracking-tight">
              {currentInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              {currentInfo.description}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-border p-4 sm:p-5 mb-6 text-xs text-content-secondary space-y-2">
          <p className="font-semibold text-content flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Reusable Resident Navigation Shell Ready
          </p>
          <p>
            The navigation system (responsive sidebar, top header with search &amp; notifications, and mobile PWA bottom navigation) is successfully integrated and responsive across desktop, tablet, and mobile screens.
          </p>
          <p className="font-mono text-[11px] text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-md border border-emerald-200/60 inline-block">
            Connected route: {currentPath}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted">
            Test Navigation Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {Object.entries(ROUTE_CONFIG).map(([path, info]) => {
              const isCurrent = currentPath === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                    isCurrent
                      ? 'border-primary bg-primary/5 font-bold text-primary shadow-xs'
                      : 'border-border bg-surface hover:border-emerald-300 hover:bg-emerald-50/40 text-content-secondary'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-content-muted">{info.icon}</span>
                    <span className="truncate">{info.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
};
