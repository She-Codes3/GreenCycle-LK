import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  User,
  Mail,
  Phone,
  AlertTriangle,
  Trash2,
  CalendarOff,
  Wrench,
  Layers,
  CheckCircle2,
  Circle,
  Image as ImageIcon,
} from 'lucide-react';
import { loadSharedComplaints, GC_COMPLAINTS_SYNC_EVENT } from '@/shared/data/complaintsStore';
import { ReportStatus } from '@/components/reports/ReportStatus';
import type { SharedComplaint, ComplaintCategory, ComplaintStatus } from '@/shared/types/complaint';
import { COMPLAINT_STATUS_ORDER, COMPLAINT_STATUS_LABELS } from '@/shared/types/complaint';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { UserNavbar, UserSidebar } from '@/features/user/components';

// ── Category config ───────────────────────────────────────────────────────────
const categoryConfig: Record<ComplaintCategory, { icon: React.ReactNode; color: string; bgColor: string }> = {
  'Illegal Dumping': { icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-700', bgColor: 'bg-red-50' },
  'Overflowing Bin': { icon: <Trash2 className="w-5 h-5" />, color: 'text-amber-700', bgColor: 'bg-amber-50' },
  'Missed Collection': { icon: <CalendarOff className="w-5 h-5" />, color: 'text-sky-700', bgColor: 'bg-sky-50' },
  'Damaged Bin': { icon: <Wrench className="w-5 h-5" />, color: 'text-violet-700', bgColor: 'bg-violet-50' },
  'Waste Accumulation': { icon: <Layers className="w-5 h-5" />, color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
};

// ── Status step colors ────────────────────────────────────────────────────────
function getStatusColor(status: ComplaintStatus): string {
  switch (status) {
    case 'SUBMITTED': return 'text-amber-600 bg-amber-100 border-amber-300';
    case 'UNDER_REVIEW': return 'text-sky-600 bg-sky-100 border-sky-300';
    case 'ASSIGNED': return 'text-indigo-600 bg-indigo-100 border-indigo-300';
    case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100 border-blue-300';
    case 'RESOLVED': return 'text-emerald-600 bg-emerald-100 border-emerald-300';
    case 'CLOSED': return 'text-slate-600 bg-slate-100 border-slate-300';
    default: return 'text-slate-500 bg-slate-100 border-slate-200';
  }
}

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [report, setReport] = useState<SharedComplaint | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      const all = loadSharedComplaints();
      const found = all.find((c) => c.id === id);
      if (found) {
        setReport(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    };
    load();

    const handleSync = () => load();
    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-content-muted" />
          </div>
          <h2 className="text-xl font-bold text-content">Report Not Found</h2>
          <p className="text-sm text-content-secondary">The report you're looking for doesn't exist.</p>
          <Link
            to="/my-reports"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
          >
            Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const catCfg = categoryConfig[report.category];
  const currentStatusIndex = COMPLAINT_STATUS_ORDER.indexOf(report.status);

  return (
    <DashboardLayout
      sidebar={<UserSidebar activeItem="my-reports" />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK"
        >
          <UserSidebar activeItem="my-reports" />
        </MobileMenu>
      }
      navbar={
        <UserNavbar
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      }
    >
      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <img src={lightboxImage} alt="Evidence" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}

      <div className="space-y-6">
        {/* Back Link & Ticket Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <Link
            to="/my-reports"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-secondary hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to My Reports
          </Link>
          <span className="text-xs font-mono font-bold text-primary bg-primary-light px-2.5 py-1 rounded-lg">
            {report.ticketNumber}
          </span>
        </div>
        {/* Top Card: Overview */}
        <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
          {/* Header bar */}
          <div className="p-5 sm:p-6 border-b border-border bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${catCfg.bgColor} ${catCfg.color} shrink-0`}>
                  {catCfg.icon}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-content">{report.category}</h1>
                  <p className="text-xs text-content-muted font-mono">{report.ticketNumber} • Submitted {report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                  report.priority === 'High'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : report.priority === 'Medium'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {report.priority} Priority
                </span>
                <ReportStatus status={report.status} size="md" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-2">Description</h3>
              <p className="text-sm text-content leading-relaxed">{report.description}</p>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-2">Location</h3>
              <div className="flex items-start gap-2 p-3.5 rounded-xl bg-muted/40 border border-border">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-content">{report.location}</p>
                  <p className="text-xs text-content-muted mt-0.5">{report.municipality}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Section */}
        {report.evidenceUrls.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6">
            <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Photo Evidence ({report.evidenceUrls.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {report.evidenceUrls.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxImage(url)}
                  className="rounded-xl overflow-hidden border border-border aspect-video hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <img src={url} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Progress Timeline */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6">
          <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-5">
            Status Progress
          </h3>

          {/* Visual stepper */}
          <div className="flex items-center justify-between mb-8 px-2">
            {COMPLAINT_STATUS_ORDER.map((s, i) => {
              const isPast = i <= currentStatusIndex;
              const isCurrent = i === currentStatusIndex;
              return (
                <React.Fragment key={s}>
                  {i > 0 && (
                    <div className={`flex-1 h-1 rounded-full mx-1 transition-colors ${
                      i <= currentStatusIndex ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCurrent
                        ? 'bg-primary border-primary text-white shadow-sm scale-110'
                        : isPast
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-muted border-border text-content-muted'
                    }`}>
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-3 h-3" />
                      )}
                    </div>
                    <span className={`text-[9px] font-bold text-center leading-tight max-w-[60px] ${
                      isCurrent ? 'text-primary' : isPast ? 'text-content-secondary' : 'text-content-muted'
                    }`}>
                      {COMPLAINT_STATUS_LABELS[s]}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Status History Log */}
          <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-3">
            Activity Log
          </h3>
          <div className="space-y-0">
            {report.statusHistory.map((entry, i) => (
              <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                {/* Timeline line */}
                {i < report.statusHistory.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                )}
                {/* Dot */}
                <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${getStatusColor(entry.status)}`}>
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-content">{entry.title}</p>
                    <span className="text-[10px] text-content-muted font-mono shrink-0">{entry.timestamp}</span>
                  </div>
                  <p className="text-xs text-content-secondary mt-0.5 leading-relaxed">{entry.description}</p>
                  <p className="text-[10px] text-content-muted mt-1">
                    by {entry.performedBy} ({entry.role})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporter Info */}
        <div className="bg-surface rounded-2xl border border-border shadow-card p-5 sm:p-6">
          <h3 className="text-xs font-bold text-content-muted uppercase tracking-wider mb-3">
            Reporter Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 text-content">
              <User className="w-4 h-4 text-content-muted shrink-0" />
              <span className="font-medium">{report.submittedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <Mail className="w-4 h-4 text-content-muted shrink-0" />
              <span>{report.citizenEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <Phone className="w-4 h-4 text-content-muted shrink-0" />
              <span>{report.citizenPhone}</span>
            </div>
          </div>
          {report.assignedOfficer && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-content-muted">
                <span className="font-bold">Assigned Officer:</span> {report.assignedOfficer}
              </p>
            </div>
          )}
        </div>

        {/* Resolution Notes */}
        {report.resolutionNotes && (
          <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/60 p-5 sm:p-6">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
              Resolution
            </h3>
            <p className="text-sm text-emerald-900 leading-relaxed">{report.resolutionNotes}</p>
            {report.resolvedDate && (
              <p className="text-xs text-emerald-700 mt-2 font-mono">
                Resolved on: {report.resolvedDate}
              </p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
