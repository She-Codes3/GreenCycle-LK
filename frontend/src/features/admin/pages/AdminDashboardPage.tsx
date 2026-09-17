import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, Recycle, AlertTriangle, ArrowRight, ExternalLink, Truck, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { UserGrowthChart } from '../components/charts/UserGrowthChart';
import { ComplaintsDonutChart } from '../components/charts/ComplaintsDonutChart';
import {
  MOCK_ADMIN_STATS,
  MOCK_ADMIN_MUNICIPALITIES,
  MOCK_ADMIN_QUICK_ACTIONS,
} from '../data/adminMockData';
import { useAdminData } from '../data/adminStore';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userStats, logs } = useAdminData();

  // Top 4 municipalities for dashboard summary
  const topMunicipalities = MOCK_ADMIN_MUNICIPALITIES.slice(0, 5);

  // Live recent 5 activity logs from store
  const recentLogs = logs.slice(0, 5);

  return (
    <AdminLayout activeItem="dashboard" pageTitle="Admin Dashboard">
      <div className="space-y-6">
        {/* Page Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Overview of the GreenCycle LK platform, municipal operations, and live civic activity.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All 25 Municipal Systems Active
            </span>
          </div>
        </div>

        {/* 1. Four Main Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Total Users */}
          <StatCard
            title="Total Users"
            value={MOCK_ADMIN_STATS.totalUsers.value}
            icon={<Users className="w-5 h-5 text-primary" />}
            change={{
              value: MOCK_ADMIN_STATS.totalUsers.growth,
              isPositive: MOCK_ADMIN_STATS.totalUsers.isPositive,
              label: 'this month',
            }}
            className="hover:border-primary/40 transition-colors shadow-card"
          />

          {/* Card 2: Municipalities */}
          <StatCard
            title="Municipalities"
            value={MOCK_ADMIN_STATS.municipalities.value}
            icon={<Building2 className="w-5 h-5 text-primary" />}
            description={MOCK_ADMIN_STATS.municipalities.subtext}
            className="hover:border-primary/40 transition-colors shadow-card"
          />

          {/* Card 3: Disposal Centers */}
          <StatCard
            title="Disposal Centers"
            value={MOCK_ADMIN_STATS.disposalCenters.value}
            icon={<Recycle className="w-5 h-5 text-primary" />}
            description={MOCK_ADMIN_STATS.disposalCenters.subtext}
            className="hover:border-primary/40 transition-colors shadow-card"
          />

          {/* Card 4: Complaints */}
          <StatCard
            title="Complaints"
            value={MOCK_ADMIN_STATS.complaints.value}
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
            description={MOCK_ADMIN_STATS.complaints.subtext}
            className="hover:border-amber-400/50 transition-colors shadow-card"
          />
        </div>

        {/* Account Status Summary Bar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-content">Account Status</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted border border-border text-content-muted">
                  {userStats.total} Total
                </span>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                Overview of active users, disciplinary suspensions, and inactive accounts.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/admin/users?status=Active')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 transition-colors cursor-pointer text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium">Active:</span>
              <span className="font-bold">{userStats.active}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/users?status=Suspended')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-900 transition-colors cursor-pointer text-xs group"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-pulse" />
              <span className="font-medium">Suspended:</span>
              <span className="font-bold">{userStats.suspended}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/users?status=Inactive')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="font-medium">Inactive:</span>
              <span className="font-bold">{userStats.inactive}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="ml-auto text-xs font-bold text-primary hover:underline flex items-center gap-1 pl-2"
            >
              <span>Manage Users</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Charts Row: User Growth + Complaints Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: User Growth Chart (7 cols) */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-content">User Growth</h3>
                <span className="text-xs text-content-muted">Jan – Aug 2026</span>
              </div>
              <p className="text-xs text-content-secondary mb-4">
                Platform registrations across citizens, collectors, and municipal users.
              </p>
            </div>
            <UserGrowthChart />
          </div>

          {/* Right: Complaints Overview Donut Chart (5 cols) */}
          <div className="lg:col-span-5 bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-content">Complaints Overview</h3>
                <span className="text-xs text-content-muted">Triage Status</span>
              </div>
              <p className="text-xs text-content-secondary mb-3">
                Distribution of citizen service tickets and environmental violations.
              </p>
            </div>
            <ComplaintsDonutChart />
          </div>
        </div>

        {/* 3. Quick Actions Bar */}
        <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-content">Quick Actions</h3>
              <p className="text-xs text-content-secondary">
                Direct administrative shortcuts for routine operational workflows.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {MOCK_ADMIN_QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => navigate(action.href)}
                className="group relative flex flex-col items-start p-4 rounded-xl border border-border/80 bg-muted/30 hover:bg-surface hover:border-primary/50 hover:shadow-card transition-all text-left"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    {action.id === 'manage-users' && <Users className="w-5 h-5" />}
                    {action.id === 'manage-municipalities' && <Building2 className="w-5 h-5" />}
                    {action.id === 'view-centers' && <Recycle className="w-5 h-5" />}
                    {action.id === 'review-complaints' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-surface border border-border text-content-muted">
                    {action.badge}
                  </span>
                </div>
                <span className="text-xs font-bold text-content group-hover:text-primary transition-colors block">
                  {action.label}
                </span>
                <span className="text-[11px] text-content-muted mt-0.5 line-clamp-1 block">
                  {action.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Collection Requests Operational Summary Card */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#046a38] to-emerald-900 text-white rounded-2xl p-5 sm:p-6 shadow-card border border-emerald-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                <Truck className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-base text-white tracking-tight">
                Collection Requests
              </h3>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Real-time monitoring of citizen waste pickup requests across all municipal service zones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-xl text-center min-w-[72px]">
              <span className="text-xs font-bold text-amber-300 block">24</span>
              <span className="text-[10px] text-emerald-200/80 font-medium">Pending</span>
            </div>
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-xl text-center min-w-[72px]">
              <span className="text-xs font-bold text-blue-300 block">18</span>
              <span className="text-[10px] text-emerald-200/80 font-medium">Assigned</span>
            </div>
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-xl text-center min-w-[72px]">
              <span className="text-xs font-bold text-indigo-300 block">31</span>
              <span className="text-[10px] text-emerald-200/80 font-medium">In Progress</span>
            </div>
            <div className="bg-white/10 border border-white/15 px-3 py-2 rounded-xl text-center min-w-[72px]">
              <span className="text-xs font-bold text-emerald-300 block">49</span>
              <span className="text-[10px] text-emerald-200/80 font-medium">Completed</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/collection-requests')}
              className="ml-auto md:ml-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Grid: Municipality Overview Table + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Municipality Overview (7 cols) */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-4">
              <div>
                <h3 className="font-bold text-base text-content">Municipality Overview</h3>
                <p className="text-xs text-content-secondary">
                  Local council jurisdiction metrics across Sri Lanka.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/admin/municipalities')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>View all 25</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/80 text-[11px] font-bold text-content-muted uppercase tracking-wider">
                    <th className="pb-3 font-bold">Municipality</th>
                    <th className="pb-3 font-bold text-right">Users</th>
                    <th className="pb-3 font-bold text-right">Centers</th>
                    <th className="pb-3 font-bold text-right">Complaints</th>
                    <th className="pb-3 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {topMunicipalities.map((mun) => (
                    <tr
                      key={mun.id}
                      onClick={() => navigate('/admin/municipalities')}
                      className="hover:bg-muted/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 pr-2">
                        <div className="font-bold text-content">{mun.name}</div>
                        <div className="text-[10px] text-content-muted">{mun.province}</div>
                      </td>
                      <td className="py-3 text-right font-semibold text-content">
                        {mun.usersCount}
                      </td>
                      <td className="py-3 text-right font-semibold text-content">
                        {mun.centersCount}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`font-semibold ${
                            mun.complaintsCount > 10 ? 'text-amber-600' : 'text-content'
                          }`}
                        >
                          {mun.complaintsCount}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {mun.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Recent Activity Logs (5 cols) */}
          <div className="lg:col-span-5 bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-4">
                <div>
                  <h3 className="font-bold text-base text-content">Recent Activity</h3>
                  <p className="text-xs text-content-secondary">
                    Real-time operational audit events.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/activity')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Audit log</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <ul className="space-y-3.5">
                {recentLogs.map((log) => (
                  <li key={log.id} className="flex items-start gap-3 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 ring-4 ring-emerald-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-content truncate">{log.title}</span>
                        <span className="text-[10px] text-content-muted shrink-0">{log.time}</span>
                      </div>
                      <p className="text-[11px] text-content-secondary line-clamp-1 mt-0.5">
                        {log.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-content-muted font-medium bg-muted px-1.5 py-0.5 rounded">
                          {log.module}
                        </span>
                        <span className="text-[10px] text-content-muted">
                          by {log.performedBy}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate('/admin/activity')}
                className="text-xs font-semibold text-content-muted hover:text-primary transition-colors"
              >
                View complete platform audit trail →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
