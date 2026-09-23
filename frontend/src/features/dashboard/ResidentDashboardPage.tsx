import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  FileText,
  MapPinned,
  Recycle,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import {
  DashboardLayout,
  DashboardHeader,
  DashboardGrid,
  StatCard,
  QuickActions,
} from '@/components/dashboard';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { UserNavbar, UserSidebar } from '@/features/user/components';
import {
  loadSharedComplaints,
  GC_COMPLAINTS_SYNC_EVENT,
} from '@/shared/data/complaintsStore';
import type { SharedComplaint } from '@/shared/types/complaint';
import { ReportStatus } from '@/components/reports/ReportStatus';

// ── Mock resident identity ────────────────────────────────────────────────────
const MOCK_RESIDENT_NAME = 'Kasun Perera';

export const ResidentDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [complaints, setComplaints] = useState<SharedComplaint[]>([]);

  useEffect(() => {
    const fetchComplaints = () => {
      const all = loadSharedComplaints();
      setComplaints(all.filter((c) => c.submittedBy === MOCK_RESIDENT_NAME));
    };

    fetchComplaints();

    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, fetchComplaints);
    return () => window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, fetchComplaints);
  }, []);

  const activeReports = useMemo(
    () =>
      complaints.filter(
        (c) =>
          c.status === 'SUBMITTED' ||
          c.status === 'UNDER_REVIEW' ||
          c.status === 'ASSIGNED' ||
          c.status === 'IN_PROGRESS'
      ),
    [complaints]
  );

  const resolvedReports = useMemo(
    () => complaints.filter((c) => c.status === 'RESOLVED' || c.status === 'CLOSED'),
    [complaints]
  );

  const recentReports = useMemo(() => complaints.slice(0, 3), [complaints]);

  return (
    <DashboardLayout
      sidebar={<UserSidebar activeItem="dashboard" />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK"
        >
          <UserSidebar activeItem="dashboard" />
        </MobileMenu>
      }
      navbar={
        <UserNavbar
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      }
    >
      <div className="space-y-6">
        {/* Header */}
        <DashboardHeader
          userName="Kasun Perera"
          role="RESIDENT"
          dateString="Colombo, Sri Lanka"
          actions={
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigate('/my-reports')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface text-content text-xs font-semibold transition-all hover:bg-muted active:translate-y-px"
              >
                <FileText className="w-3.5 h-3.5 text-content-muted" />
                My Reports
                {activeReports.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {activeReports.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/report-issue')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold transition-all hover:bg-primary/90 hover:shadow-sm active:translate-y-px"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                Report Issue
              </button>
            </div>
          }
        />

        {/* 1. Stat Cards */}
        <DashboardGrid columns={4}>
          <StatCard
            title="Active Reports"
            value={activeReports.length}
            unit="issues"
            icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
            change={{
              value: activeReports.length > 0 ? `${activeReports.length} in review` : 'All clear',
              isPositive: activeReports.length === 0,
              label: 'under council review',
            }}
          />
          <StatCard
            title="Resolved Reports"
            value={resolvedReports.length}
            unit="cleared"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            change={{
              value: `${resolvedReports.length} total`,
              isPositive: true,
              label: 'resolved by CMC',
            }}
          />
          <StatCard
            title="GreenPoints"
            value="480"
            unit="pts"
            icon={<span className="text-xl">🌱</span>}
            change={{
              value: '+50',
              isPositive: true,
              label: 'earned this month',
            }}
          />
          <StatCard
            title="Pickups Done"
            value="18"
            unit="completed"
            icon={<Recycle className="w-5 h-5 text-sky-500" />}
            change={{
              value: '100%',
              isPositive: true,
              label: 'on-time collection',
            }}
          />
        </DashboardGrid>

        {/* 2. Quick Actions */}
        <QuickActions
          title="Resident Quick Actions"
          actions={[
            {
              id: 'report-issue',
              label: 'Report Issue',
              description: 'Report dumping, missed bins',
              icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
              badge: 'Fast',
              onClick: () => navigate('/report-issue'),
            },
            {
              id: 'my-reports',
              label: 'My Reports',
              description: 'Track complaint status & notes',
              icon: <FileText className="w-5 h-5 text-emerald-600" />,
              badge: activeReports.length > 0 ? `${activeReports.length} Active` : undefined,
              onClick: () => navigate('/my-reports'),
            },
            {
              id: 'disposal-centers',
              label: 'Disposal Centers',
              description: 'Find drop-off depots in CMC',
              icon: <MapPinned className="w-5 h-5 text-sky-600" />,
              onClick: () => navigate('/disposal-centers'),
            },
            {
              id: 'schedule-pickup',
              label: 'Schedule Pickup',
              description: 'Book bulk waste collection',
              icon: <Calendar className="w-5 h-5 text-primary" />,
              onClick: () => navigate('/schedule'),
            },
          ]}
        />

        {/* 3. Callout Action Banner for Reporting */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-emerald-50 via-teal-50 to-primary-light/40 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white uppercase tracking-wider">
                  Citizen Portal
                </span>
                <span className="text-xs font-semibold text-content-secondary">
                  Colombo Municipal Council
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-content">
                Spotted illegal dumping or missed garbage collection?
              </h3>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                Submit an instant report with location coordinates and photo evidence. The municipal team directly reviews and updates your ticket.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/report-issue')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold transition-all hover:bg-primary/90 hover:shadow-elevated active:translate-y-px"
              >
                <AlertTriangle className="w-4 h-4 text-white" />
                Report Issue Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Recent Reports Section */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div>
              <h3 className="font-bold text-base text-content">My Recent Reports</h3>
              <p className="text-xs text-content-secondary mt-0.5">
                Track status and timeline updates for complaints you submitted
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/my-reports')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View all ({complaints.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentReports.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-content-muted">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-content">No complaints submitted yet</p>
                <p className="text-xs text-content-secondary max-w-sm mx-auto">
                  If you notice uncollected garbage, damaged bins, or illegal dumping in your neighborhood, let the council know.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/report-issue')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Report an Issue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => navigate(`/my-reports/${report.id}`)}
                  className="group relative flex flex-col justify-between p-4 rounded-xl border border-border bg-canvas/40 hover:bg-surface hover:border-primary/40 hover:shadow-card cursor-pointer transition-all duration-200"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {report.ticketNumber}
                      </span>
                      <ReportStatus status={report.status} size="sm" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-content group-hover:text-primary transition-colors">
                        {report.category}
                      </h4>
                      <p className="text-xs text-content-secondary mt-1 line-clamp-2 leading-relaxed">
                        {report.description}
                      </p>
                    </div>

                    {report.evidenceUrls && report.evidenceUrls.length > 0 && (
                      <div className="flex items-center gap-1 text-[11px] text-content-muted">
                        <ImageIcon className="w-3 h-3 text-content-muted" />
                        <span>{report.evidenceUrls.length} photo attached</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-content-muted">
                    <span className="flex items-center gap-1 truncate max-w-[60%]">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{report.location}</span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{report.date}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
