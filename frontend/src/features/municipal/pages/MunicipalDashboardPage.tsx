import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Users,
  Recycle,
  AlertTriangle,
  ArrowRight,
  Clock,
  CheckCircle2,
  Loader2,
  CalendarDays,
  FileText,
} from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useMunicipalData } from '../data/municipalStore';

export const MunicipalDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardStats, requests, collectors, activityLogs } = useMunicipalData();

  const recentRequests = requests.slice(0, 5);
  const recentLogs = activityLogs.slice(0, 5);

  return (
    <MunicipalLayout activeItem="dashboard" pageTitle="Municipal Dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Kandy Municipal Council — Waste management operations overview.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {dashboardStats.activeCollectors} Collectors Active
            </span>
          </div>
        </div>

        {/* 1. Four Main Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Collection Requests"
            value={dashboardStats.totalCollectionRequests}
            icon={<Truck className="w-5 h-5 text-primary" />}
            description={`${dashboardStats.pendingRequests} Pending`}
            className="hover:border-primary/40 transition-colors shadow-card cursor-pointer"
            onClick={() => navigate('/municipal/collection-requests')}
          />
          <StatCard
            title="Active Collectors"
            value={`${dashboardStats.activeCollectors}/${dashboardStats.totalCollectors}`}
            icon={<Users className="w-5 h-5 text-primary" />}
            description={`${dashboardStats.totalCollectors - dashboardStats.activeCollectors} on leave`}
            className="hover:border-primary/40 transition-colors shadow-card cursor-pointer"
            onClick={() => navigate('/municipal/collectors')}
          />
          <StatCard
            title="Disposal Centers"
            value={dashboardStats.disposalCenters}
            icon={<Recycle className="w-5 h-5 text-primary" />}
            description="Within Kandy zone"
            className="hover:border-primary/40 transition-colors shadow-card cursor-pointer"
            onClick={() => navigate('/municipal/disposal-centers')}
          />
          <StatCard
            title="Active Complaints"
            value={dashboardStats.activeComplaints}
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
            description="Pending + In Progress"
            className="hover:border-amber-400/50 transition-colors shadow-card cursor-pointer"
            onClick={() => navigate('/municipal/complaints')}
          />
        </div>

        {/* 2. Today's Operations Bar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-content">Today's Operations</h3>
              <p className="text-[11px] text-content-muted">Real-time collection status</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              {dashboardStats.pendingRequests} Pending
            </span>
            <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Loader2 className="w-3.5 h-3.5" />
              {dashboardStats.inProgressRequests} In Progress
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {dashboardStats.completedToday} Completed
            </span>
          </div>
        </div>

        {/* 3. Two Column Layout: Recent Requests + Collector Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent Collection Requests */}
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/80 flex items-center justify-between">
              <h3 className="font-bold text-sm text-content">Recent Collection Requests</h3>
              <button
                type="button"
                onClick={() => navigate('/municipal/collection-requests')}
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {recentRequests.map((r) => (
                <div key={r.id} className="p-3.5 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-content-muted shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-content truncate">{r.citizenName}</p>
                    <p className="text-[10px] text-content-muted truncate">{r.wasteType} — {r.area}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      r.status === 'Pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : r.status === 'In Progress' || r.status === 'Assigned'
                        ? 'bg-sky-50 text-sky-800 border-sky-200'
                        : r.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Collector Status Grid */}
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/80 flex items-center justify-between">
              <h3 className="font-bold text-sm text-content">Collector Status</h3>
              <button
                type="button"
                onClick={() => navigate('/municipal/collectors')}
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                Manage <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {collectors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {c.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-content truncate">{c.name}</p>
                    <p className="text-[10px] text-content-muted truncate">{c.zone}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`block text-[10px] font-bold ${
                        c.status === 'Active'
                          ? 'text-emerald-600'
                          : c.status === 'On Leave'
                          ? 'text-amber-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {c.status}
                    </span>
                    {c.status === 'Active' && (
                      <span className="text-[9px] text-content-muted">{c.completedToday} today</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Quick Actions */}
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <h3 className="font-bold text-sm text-content mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Assign Collector', icon: <Users className="w-4 h-4" />, href: '/municipal/collection-requests' },
                { label: 'View Schedule', icon: <CalendarDays className="w-4 h-4" />, href: '/municipal/schedule' },
                { label: 'View Complaints', icon: <AlertTriangle className="w-4 h-4" />, href: '/municipal/complaints' },
                { label: 'Activity Logs', icon: <FileText className="w-4 h-4" />, href: '/municipal/activity' },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => navigate(action.href)}
                  className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-xs font-semibold text-content-secondary hover:border-primary/40 hover:bg-primary-light/30 hover:text-primary transition-all group"
                >
                  <span className="text-content-muted group-hover:text-primary transition-colors">{action.icon}</span>
                  <span className="flex-1 text-left">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="p-4 border-b border-border/80 flex items-center justify-between">
              <h3 className="font-bold text-sm text-content">Recent Activity</h3>
              <button
                type="button"
                onClick={() => navigate('/municipal/activity')}
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-border/60">
              {recentLogs.map((log) => {
                const severityColor =
                  log.severity === 'success'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : log.severity === 'warning'
                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                    : log.severity === 'error'
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-sky-50 text-sky-600 border-sky-200';
                return (
                  <div key={log.id} className="p-3.5 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${severityColor}`}>
                      {log.severity === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : log.severity === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-content leading-tight">{log.title}</p>
                      <p className="text-[10px] text-content-muted mt-0.5 line-clamp-1">{log.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-content-muted block">{log.time}</span>
                      <span className="text-[9px] text-content-muted">{log.dateGroup}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MunicipalLayout>
  );
};
