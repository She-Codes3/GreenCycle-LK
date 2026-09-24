import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResidentLayout } from '../components/ResidentLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import {
  Bell,
  MapPin,
  Truck,
  CalendarDays,
  ScanLine,
  Navigation2,
  Leaf,
  Recycle,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Megaphone,
} from 'lucide-react';
import { RESIDENT_USER } from '../data/residentMockData';
import { useAuth } from '@/app/providers';

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDayString(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// ── Mock data ────────────────────────────────────────────────────────────────
const NEXT_COLLECTION = {
  type: 'Organic waste',
  tag: 'Organic',
  tagColor: 'bg-emerald-100 text-emerald-800',
  date: 'Today',
  time: '6:00 AM – 8:00 AM',
  truck: 'Truck WP CA-1234',
  distance: '1.2 km away · Colombo 05 – Route 04',
  eta: '8 min',
  routeProgress: 68,
};

const GREEN_IMPACT = {
  recycled: 12.4,
  diverted: 18.7,
  greenPoints: 1240,
};

const MUNICIPAL_UPDATE = {
  title: 'Schedule change this Saturday',
  description: 'Special collection in Colombo 05 moves to 8:00 AM.',
  time: '3 days ago',
};

// ── Quick-action definition ──────────────────────────────────────────────────
interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  href: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'scan',
    label: 'Scan waste',
    icon: <ScanLine className="w-6 h-6" />,
    iconBg: 'bg-sky-100 text-sky-700',
    href: '/resident/scanner',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: <CalendarDays className="w-6 h-6" />,
    iconBg: 'bg-emerald-100 text-emerald-700',
    href: '/resident/schedule',
  },
  {
    id: 'dropoff',
    label: 'Drop-off',
    icon: <MapPin className="w-6 h-6" />,
    iconBg: 'bg-amber-100 text-amber-700',
    href: '/disposal-centers',
  },
  {
    id: 'report',
    label: 'Report issue',
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: 'bg-red-100 text-red-600',
    href: '/report-issue',
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export const ResidentDashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [truckEta, setTruckEta] = useState(NEXT_COLLECTION.eta);

  // Simulate live ETA ticking (demo effect)
  useEffect(() => {
    const id = setInterval(() => {
      setTruckEta((prev) => {
        const mins = parseInt(prev);
        if (isNaN(mins) || mins <= 1) return '1 min';
        return `${mins - 1} min`;
      });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Dedicated notifications view
  if (location.pathname === '/resident/notifications') {
    return (
      <ResidentLayout>
        <NotificationCenter role="RESIDENT" />
      </ResidentLayout>
    );
  }

  const firstName = (user?.fullName || RESIDENT_USER.name).split(' ')[0];

  return (
    <ResidentLayout activeItem="dashboard">
      {/* ── Outer scroll container ─────────────────────────────────── */}
      <div className="min-h-full space-y-6">

        {/* ════════════════════════════════════════════════════════════
            1. HERO GREETING HEADER
        ════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#046a38] via-[#047a42] to-[#0a9453] p-6 text-white shadow-lg">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -right-2 top-16 h-24 w-24 rounded-full bg-white/5" />

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-emerald-200">{getDayString()}</p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-white">
                {getGreeting()}, {firstName}
              </h1>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-200">
                <MapPin className="h-3.5 w-3.5" />
                <span>{user?.municipality || RESIDENT_USER.municipality.replace('Municipal Council', '').trim()} – {RESIDENT_USER.zone.split(' – ')[1] || RESIDENT_USER.zone}</span>
              </div>
            </div>

            {/* Notification bell */}
            <button
              type="button"
              onClick={() => navigate('/resident/notifications')}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-[#046a38]" />
            </button>
          </div>

          {/* ── Next Collection Card ─────────────────────────────── */}
          <div className="mt-5 rounded-2xl bg-white p-4 text-content shadow-md">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-content-muted">
                Next Collection
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-[11px] font-bold text-sky-700">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                Scheduled
              </span>
            </div>

            {/* Waste type */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-black text-content">{NEXT_COLLECTION.type}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${NEXT_COLLECTION.tagColor}`}>
                {NEXT_COLLECTION.tag}
              </span>
            </div>

            {/* Date & time */}
            <div className="mt-1.5 flex items-center gap-3 text-xs text-content-secondary">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {NEXT_COLLECTION.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3.5 w-3.5 flex items-center justify-center">🕕</span>
                {NEXT_COLLECTION.time}
              </span>
            </div>

            {/* Truck info row */}
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-content">{NEXT_COLLECTION.truck}</p>
                  <p className="text-[11px] text-content-muted">{NEXT_COLLECTION.distance}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-black text-emerald-700">{truckEta}</p>
                <p className="text-[10px] font-medium text-content-muted">estimated</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${NEXT_COLLECTION.routeProgress}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-content-muted">
                Route is {NEXT_COLLECTION.routeProgress}% complete
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => navigate('/resident/tracking')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#046a38] to-[#0a9453] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <Navigation2 className="h-4 w-4" />
              Track live collection
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            2. QUICK ACTIONS
        ════════════════════════════════════════════════════════════ */}
        <div>
          <p className="mb-3 text-[11px] font-black uppercase tracking-wider text-content-muted">
            What do you need?
          </p>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => navigate(action.href)}
                className="group flex flex-col items-center gap-2 rounded-2xl bg-surface p-3 border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.97]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.iconBg} transition-transform group-hover:scale-105`}
                >
                  {action.icon}
                </div>
                <span className="text-center text-[11px] font-semibold leading-tight text-content-secondary">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            3. YOUR GREEN IMPACT
        ════════════════════════════════════════════════════════════ */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-black uppercase tracking-wider text-content-muted">
              Your Green Impact
            </p>
            <button
              type="button"
              onClick={() => navigate('/resident/rewards')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              View details
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-border">
              {/* Recycled */}
              <div className="flex flex-col items-center gap-1 px-3 first:pl-0 last:pr-0">
                <Recycle className="h-6 w-6 text-emerald-600" />
                <p className="text-xl font-black text-content">{GREEN_IMPACT.recycled} <span className="text-sm font-bold">kg</span></p>
                <p className="text-[11px] text-content-muted">Recycled</p>
              </div>
              {/* Diverted */}
              <div className="flex flex-col items-center gap-1 px-3">
                <Leaf className="h-6 w-6 text-teal-600" />
                <p className="text-xl font-black text-content">{GREEN_IMPACT.diverted} <span className="text-sm font-bold">kg</span></p>
                <p className="text-[11px] text-content-muted">Diverted</p>
              </div>
              {/* Green Points */}
              <div className="flex flex-col items-center gap-1 px-3">
                <Sparkles className="h-6 w-6 text-amber-500" />
                <p className="text-xl font-black text-content">{GREEN_IMPACT.greenPoints.toLocaleString()}</p>
                <p className="text-[11px] text-content-muted">Green Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            4. MUNICIPAL UPDATE
        ════════════════════════════════════════════════════════════ */}
        <div>
          <p className="mb-3 text-[11px] font-black uppercase tracking-wider text-content-muted">
            Municipal Update
          </p>

          <button
            type="button"
            onClick={() => navigate('/resident/notifications')}
            className="group w-full rounded-2xl border border-border bg-surface p-4 shadow-sm text-left transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Megaphone className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-content leading-snug">
                  {MUNICIPAL_UPDATE.title}
                </p>
                <p className="mt-0.5 text-xs text-content-secondary leading-relaxed">
                  {MUNICIPAL_UPDATE.description}
                </p>
                <p className="mt-1.5 text-[11px] text-content-muted">{MUNICIPAL_UPDATE.time}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-content-muted mt-1 group-hover:text-primary transition-colors" />
            </div>
          </button>
        </div>

      </div>
    </ResidentLayout>
  );
};
