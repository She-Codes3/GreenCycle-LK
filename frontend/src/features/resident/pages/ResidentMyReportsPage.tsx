import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  AlertTriangle,
  Trash2,
  CalendarOff,
  Wrench,
  Layers,
  MapPin,
  Clock,
  ChevronRight,
  Image as ImageIcon,
  FileText,
} from 'lucide-react';
import { loadSharedComplaints, GC_COMPLAINTS_SYNC_EVENT } from '@/shared/data/complaintsStore';
import { ReportStatus } from '@/components/reports/ReportStatus';
import type { SharedComplaint, ComplaintCategory } from '@/shared/types/complaint';
import { COMPLAINT_CATEGORIES } from '@/shared/types/complaint';
import { ResidentLayout } from '../components/ResidentLayout';

// ── Mock resident identity ────────────────────────────────────────────────────
const MOCK_RESIDENT_NAME = 'Kasun Perera';

// ── Category icons ─────────────────────────────────────────────────────────────
const categoryIcons: Record<ComplaintCategory, React.ReactNode> = {
  'Illegal Dumping': <AlertTriangle className="w-4 h-4" />,
  'Overflowing Bin': <Trash2 className="w-4 h-4" />,
  'Missed Collection': <CalendarOff className="w-4 h-4" />,
  'Damaged Bin': <Wrench className="w-4 h-4" />,
  'Waste Accumulation': <Layers className="w-4 h-4" />,
};

const categoryColors: Record<ComplaintCategory, string> = {
  'Illegal Dumping': 'bg-red-50 text-red-700',
  'Overflowing Bin': 'bg-amber-50 text-amber-700',
  'Missed Collection': 'bg-sky-50 text-sky-700',
  'Damaged Bin': 'bg-violet-50 text-violet-700',
  'Waste Accumulation': 'bg-emerald-50 text-emerald-700',
};

// ── Page ─────────────────────────────────────────────────────────────────────
export const ResidentMyReportsPage: React.FC = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<SharedComplaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Load & sync
  useEffect(() => {
    const load = () => {
      const all = loadSharedComplaints();
      // Show all complaints where the current resident is the submitter
      setComplaints(all.filter((c) => c.submittedBy === MOCK_RESIDENT_NAME));
    };
    load();

    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, load);
    return () => window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, load);
  }, []);

  // Stats
  const stats = useMemo(() => ({
    total: complaints.length,
    active: complaints.filter((c) => !['RESOLVED', 'CLOSED'].includes(c.status)).length,
    resolved: complaints.filter((c) => c.status === 'RESOLVED' || c.status === 'CLOSED').length,
  }), [complaints]);

  // Filtering
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !c.ticketNumber.toLowerCase().includes(q) &&
          !c.description.toLowerCase().includes(q) &&
          !c.location.toLowerCase().includes(q) &&
          !c.category.toLowerCase().includes(q)
        ) return false;
      }
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
      return true;
    });
  }, [complaints, searchTerm, selectedCategory, selectedStatus]);

  return (
    <ResidentLayout activeItem="reports">
      <div className="space-y-6">

        {/* ── Page Title & Actions ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">My Reports</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Track the progress of your submitted complaints and reports.
            </p>
          </div>
          <Link
            to="/report-issue"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold transition-all hover:bg-primary/90 hover:shadow-sm active:translate-y-px self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Report Issue
          </Link>
        </div>

        {/* ── Summary Stats ───────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Reports', value: stats.total, color: 'bg-muted text-content' },
            { label: 'Active', value: stats.active, color: 'bg-amber-50 text-amber-800' },
            { label: 'Resolved', value: stats.resolved, color: 'bg-emerald-50 text-emerald-800' },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border border-border p-4 ${s.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{s.label}</p>
              <p className="text-2xl font-black mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ─────────────────────────────────────────────── */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" strokeWidth={1.8} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket #, description, location..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-muted/50 border border-border rounded-xl pl-8 pr-8 py-2.5 text-xs text-content font-medium outline-none appearance-none focus:border-primary/50 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-xs text-content font-medium outline-none appearance-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Reports List ─────────────────────────────────────────── */}
        {filteredComplaints.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-border p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-content-muted" />
            </div>
            <h3 className="text-base font-bold text-content">No reports found</h3>
            <p className="text-sm text-content-secondary mt-1 mb-6">
              {complaints.length === 0
                ? "You haven't submitted any reports yet."
                : 'No reports match your current filters.'}
            </p>
            {complaints.length === 0 && (
              <Link
                to="/report-issue"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold transition-all hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Report Your First Issue
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((report) => (
              <button
                key={report.id}
                type="button"
                onClick={() => navigate(`/my-reports/${report.id}`)}
                className="w-full bg-surface rounded-2xl border border-border p-4 sm:p-5 shadow-card hover:shadow-elevated hover:border-primary/30 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[report.category]}`}>
                    {categoryIcons[report.category]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-mono font-bold text-primary">
                          {report.ticketNumber}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[report.category]}`}>
                          {report.category}
                        </span>
                      </div>
                      <ReportStatus status={report.status} size="sm" />
                    </div>

                    <p className="text-sm text-content font-medium leading-snug line-clamp-2 break-words break-all">
                      {report.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-content-muted">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">{report.location}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.date}
                      </span>
                      {report.evidenceUrls.length > 0 && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {report.evidenceUrls.length} photo{report.evidenceUrls.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-4 h-4 text-content-muted shrink-0 mt-1 group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </ResidentLayout>
  );
};
