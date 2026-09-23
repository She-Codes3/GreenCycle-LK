import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Image as ImageIcon,
  FileSearch,
  UserCheck,
  Loader2,
  Lock,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import {
  loadSharedComplaints,
  GC_COMPLAINTS_SYNC_EVENT,
} from '@/shared/data/complaintsStore';
import type { SharedComplaint, ComplaintStatus } from '@/shared/types/complaint';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_ORDER } from '@/shared/types/complaint';

// ── Status badge helper ───────────────────────────────────────────────────────
function statusBadge(status: ComplaintStatus) {
  const styles: Record<string, string> = {
    SUBMITTED: 'bg-amber-50 text-amber-800 border-amber-200',
    UNDER_REVIEW: 'bg-sky-50 text-sky-800 border-sky-200',
    ASSIGNED: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    IN_PROGRESS: 'bg-blue-50 text-blue-800 border-blue-200',
    RESOLVED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    CLOSED: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  const icons: Record<string, React.ReactNode> = {
    SUBMITTED: <Clock className="w-2.5 h-2.5" />,
    UNDER_REVIEW: <FileSearch className="w-2.5 h-2.5" />,
    ASSIGNED: <UserCheck className="w-2.5 h-2.5" />,
    IN_PROGRESS: <Loader2 className="w-2.5 h-2.5" />,
    RESOLVED: <CheckCircle2 className="w-2.5 h-2.5" />,
    CLOSED: <Lock className="w-2.5 h-2.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || styles.SUBMITTED}`}>
      {icons[status]}
      {COMPLAINT_STATUS_LABELS[status] || status}
    </span>
  );
}

// ── Status step color helper ──────────────────────────────────────────────────
function getStatusDotColor(status: ComplaintStatus): string {
  const map: Record<string, string> = {
    SUBMITTED: 'text-amber-600 bg-amber-100 border-amber-300',
    UNDER_REVIEW: 'text-sky-600 bg-sky-100 border-sky-300',
    ASSIGNED: 'text-indigo-600 bg-indigo-100 border-indigo-300',
    IN_PROGRESS: 'text-blue-600 bg-blue-100 border-blue-300',
    RESOLVED: 'text-emerald-600 bg-emerald-100 border-emerald-300',
    CLOSED: 'text-slate-600 bg-slate-100 border-slate-300',
  };
  return map[status] || map.SUBMITTED;
}

export const AdminComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<SharedComplaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');

  // Selected complaint for review modal
  const [activeComplaint, setActiveComplaint] = useState<SharedComplaint | null>(null);

  // Load & sync from shared store
  useEffect(() => {
    const load = () => setComplaints(loadSharedComplaints());
    load();

    const handleSync = () => load();
    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
  }, []);

  // Refresh active complaint when complaints list changes
  useEffect(() => {
    if (activeComplaint) {
      const updated = complaints.find((c) => c.id === activeComplaint.id);
      if (updated) setActiveComplaint(updated);
    }
  }, [complaints]);

  // Filter complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTicket = c.ticketNumber.toLowerCase().includes(q);
        const matchesCitizen = c.submittedBy.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        const matchesLoc = c.location.toLowerCase().includes(q);
        if (!matchesTicket && !matchesCitizen && !matchesDesc && !matchesLoc) return false;
      }

      if (selectedStatus !== 'all' && c.status !== selectedStatus) {
        return false;
      }

      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }

      if (selectedMunicipality !== 'all' && c.municipality !== selectedMunicipality) {
        return false;
      }

      return true;
    });
  }, [complaints, searchTerm, selectedStatus, selectedCategory, selectedMunicipality]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedMunicipality('all');
  };

  const categories = Array.from(new Set(complaints.map((c) => c.category)));
  const municipalities = Array.from(new Set(complaints.map((c) => c.municipality)));

  const pendingCount = complaints.filter((c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW').length;

  return (
    <AdminLayout activeItem="complaints" pageTitle="Complaints & Reports">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Complaints / Reports
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Review and triage citizen reports, illegal dumping notifications, and service disruptions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              {pendingCount} Pending Action
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket #, citizen, keyword..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              {COMPLAINT_STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{COMPLAINT_STATUS_LABELS[s]}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Municipality Filter */}
            <select
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer hidden lg:block"
            >
              <option value="all">All Municipalities</option>
              {municipalities.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {(searchTerm || selectedStatus !== 'all' || selectedCategory !== 'all' || selectedMunicipality !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-content-muted hover:text-content"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Ticket ID & Citizen</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Municipality & Location</th>
                  <th className="py-3.5 px-4 font-bold">Priority</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Date</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredComplaints.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setActiveComplaint(item)}
                    className="hover:bg-muted/30 cursor-pointer transition-colors group"
                  >
                    {/* Ticket & Citizen */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-primary group-hover:underline">
                        {item.ticketNumber}
                      </div>
                      <div className="text-[11px] text-content-secondary font-medium">
                        {item.submittedBy}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-muted text-content border border-border">
                        {item.category}
                      </span>
                    </td>

                    {/* Municipality & Location */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-content truncate">{item.location}</div>
                      <div className="text-[10px] text-content-muted truncate">{item.municipality}</div>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          item.priority === 'High'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : item.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {statusBadge(item.status)}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-content-muted font-mono text-[11px]">
                      {item.date}
                    </td>

                    {/* Action */}
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveComplaint(item)}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaint Detail Modal */}
        {activeComplaint && (
          <Modal
            isOpen={Boolean(activeComplaint)}
            onClose={() => setActiveComplaint(null)}
            title={`Ticket #${activeComplaint.ticketNumber}`}
            description={`Submitted on ${activeComplaint.date} at ${activeComplaint.time}`}
            size="lg"
          >
            <div className="space-y-4 text-xs">
              {/* Top Overview Bar */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-content-muted">
                    Category:
                  </span>
                  <span className="font-bold text-content">{activeComplaint.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-content-muted">
                    Priority:
                  </span>
                  <span
                    className={`font-extrabold px-2 py-0.5 rounded-full text-[10px] ${
                      activeComplaint.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : activeComplaint.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {activeComplaint.priority}
                  </span>
                </div>
                <div>
                  {statusBadge(activeComplaint.status)}
                </div>
              </div>

              {/* Citizen Details */}
              <div className="p-3.5 rounded-xl border border-border bg-surface space-y-2">
                <h4 className="font-bold text-content">Citizen Reporter Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-content-secondary">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-content-muted" />
                    <span>{activeComplaint.submittedBy}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-content-muted" />
                    <span>{activeComplaint.citizenPhone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-content-muted" />
                    <span>{activeComplaint.citizenEmail}</span>
                  </div>
                </div>
              </div>

              {/* Location & Description */}
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-content mb-1">Reported Incident Location</h4>
                  <p className="p-3 rounded-xl border border-border bg-muted/30 text-content flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{activeComplaint.location} ({activeComplaint.municipality})</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-content mb-1">Citizen Statement</h4>
                  <p className="p-3.5 rounded-xl border border-border bg-surface text-content leading-relaxed">
                    &quot;{activeComplaint.description}&quot;
                  </p>
                </div>
              </div>

              {/* Evidence Photos */}
              {activeComplaint.evidenceUrls.length > 0 && (
                <div>
                  <h4 className="font-bold text-content mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    Evidence Photos ({activeComplaint.evidenceUrls.length})
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {activeComplaint.evidenceUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Evidence ${i + 1}`}
                        className="w-20 h-20 rounded-lg object-cover border border-border shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Status History Timeline */}
              {activeComplaint.statusHistory.length > 0 && (
                <div>
                  <h4 className="font-bold text-content mb-2">Status History</h4>
                  <div className="space-y-0 max-h-48 overflow-y-auto pr-1">
                    {activeComplaint.statusHistory.map((entry, i) => (
                      <div key={i} className="relative flex gap-2.5 pb-3 last:pb-0">
                        {i < activeComplaint.statusHistory.length - 1 && (
                          <div className="absolute left-[8px] top-5 bottom-0 w-px bg-border" />
                        )}
                        <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${getStatusDotColor(entry.status)}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-content">{entry.title}</p>
                          <p className="text-[10px] text-content-secondary mt-0.5">{entry.description}</p>
                          <p className="text-[10px] text-content-muted mt-0.5">{entry.timestamp} • {entry.performedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Officer Info */}
              <div className="p-3 rounded-xl border border-border bg-muted/30">
                <span className="font-bold text-content block text-[11px]">
                  Assigned Officer: {activeComplaint.assignedOfficer || 'Pending Assignment'}
                </span>
              </div>
            </div>

            <ModalFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveComplaint(null)}
                className="rounded-xl"
              >
                Close Ticket View
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};
