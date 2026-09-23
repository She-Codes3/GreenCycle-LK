import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  X,
  FileSearch,
  UserCheck,
  Loader2,
  Lock,
  Image as ImageIcon,
} from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import {
  loadSharedComplaints,
  updateSharedComplaintStatus,
  GC_COMPLAINTS_SYNC_EVENT,
} from '@/shared/data/complaintsStore';
import type { SharedComplaint, ComplaintStatus } from '@/shared/types/complaint';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_ORDER } from '@/shared/types/complaint';

// ── Municipal identity (for action performer tracking) ────────────────────────
const MUNICIPAL_USER = {
  name: 'Eng. Sunil Jayatissa',
  role: 'Municipal Officer',
  municipality: 'Kandy Municipal Council',
};

// ── Status workflow: which statuses can transition to which ───────────────────
const STATUS_TRANSITIONS: Partial<Record<ComplaintStatus, ComplaintStatus[]>> = {
  SUBMITTED: ['UNDER_REVIEW'],
  UNDER_REVIEW: ['ASSIGNED'],
  ASSIGNED: ['IN_PROGRESS'],
  IN_PROGRESS: ['RESOLVED'],
  RESOLVED: ['CLOSED'],
};

export const MunicipalComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<SharedComplaint[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const [detailModal, setDetailModal] = useState<SharedComplaint | null>(null);
  const [resolveModal, setResolveModal] = useState<SharedComplaint | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // ── Load & sync ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = () => {
      const all = loadSharedComplaints();
      // Filter to this municipality's complaints
      setComplaints(
        all.filter(
          (c) =>
            !c.municipality ||
            c.municipality === MUNICIPAL_USER.municipality ||
            c.id.startsWith('MCMP-'),
        ),
      );
    };
    load();

    const handleSync = () => load();
    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
  }, []);

  // Refresh modals when data changes
  useEffect(() => {
    if (detailModal) {
      const updated = complaints.find((c) => c.id === detailModal.id);
      if (updated) setDetailModal(updated);
    }
  }, [complaints]);

  const categories = useMemo(
    () => Array.from(new Set(complaints.map((c) => c.category))),
    [complaints],
  );

  const stats = useMemo(
    () => ({
      total: complaints.length,
      submitted: complaints.filter((c) => c.status === 'SUBMITTED').length,
      inProgress: complaints.filter(
        (c) =>
          c.status === 'UNDER_REVIEW' ||
          c.status === 'ASSIGNED' ||
          c.status === 'IN_PROGRESS',
      ).length,
      resolved: complaints.filter(
        (c) => c.status === 'RESOLVED' || c.status === 'CLOSED',
      ).length,
    }),
    [complaints],
  );

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !c.ticketNumber.toLowerCase().includes(q) &&
          !c.submittedBy.toLowerCase().includes(q) &&
          !c.location.toLowerCase().includes(q) &&
          !c.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedPriority !== 'all' && c.priority !== selectedPriority) return false;
      if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
      return true;
    });
  }, [complaints, searchTerm, selectedCategory, selectedPriority, selectedStatus]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // ── Status change handler ───────────────────────────────────────────────────
  const handleStatusChange = (id: string, newStatus: ComplaintStatus, notes?: string) => {
    updateSharedComplaintStatus(
      id,
      newStatus,
      MUNICIPAL_USER.name,
      MUNICIPAL_USER.role,
      notes,
    );
    // Reload
    const all = loadSharedComplaints();
    setComplaints(
      all.filter(
        (c) =>
          !c.municipality ||
          c.municipality === MUNICIPAL_USER.municipality ||
          c.id.startsWith('MCMP-'),
      ),
    );
    showNotification(
      `Complaint updated to ${COMPLAINT_STATUS_LABELS[newStatus]}.`,
    );
  };

  const handleResolve = () => {
    if (!resolveModal) return;
    handleStatusChange(resolveModal.id, 'RESOLVED', resolutionNotes);
    setResolveModal(null);
    setResolutionNotes('');
  };

  // ── Badge helpers ───────────────────────────────────────────────────────────
  const statusBadgeEl = (status: ComplaintStatus) => {
    const styles: Record<string, string> = {
      SUBMITTED: 'bg-amber-50 text-amber-800 border-amber-200',
      UNDER_REVIEW: 'bg-sky-50 text-sky-800 border-sky-200',
      ASSIGNED: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      IN_PROGRESS: 'bg-blue-50 text-blue-800 border-blue-200',
      RESOLVED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      CLOSED: 'bg-slate-100 text-slate-700 border-slate-200',
    };
    return (
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[status] || styles.SUBMITTED}`}
      >
        {COMPLAINT_STATUS_LABELS[status] || status}
      </span>
    );
  };

  const priorityBadge = (priority: string) => {
    const cls =
      priority === 'High'
        ? 'bg-red-50 text-red-800 border-red-200'
        : priority === 'Medium'
        ? 'bg-amber-50 text-amber-800 border-amber-200'
        : 'bg-gray-100 text-gray-600 border-gray-200';
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
        {priority}
      </span>
    );
  };

  // ── Status dot color ────────────────────────────────────────────────────────
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

  return (
    <MunicipalLayout activeItem="complaints" pageTitle="Complaints & Reports">
      <div className="space-y-5">
        {/* Notification */}
        {notification && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="flex-1">{notification}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Complaints & Reports
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Citizen complaints and reports within {MUNICIPAL_USER.municipality}.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'bg-muted text-content' },
            { label: 'New', value: stats.submitted, color: 'bg-amber-50 text-amber-800' },
            {
              label: 'In Progress',
              value: stats.inProgress,
              color: 'bg-sky-50 text-sky-800',
            },
            {
              label: 'Resolved',
              value: stats.resolved,
              color: 'bg-emerald-50 text-emerald-800',
            },
          ].map((c) => (
            <div
              key={c.label}
              className={`rounded-xl border border-border p-3 ${c.color}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                {c.label}
              </p>
              <p className="text-2xl font-black mt-1">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ticket, citizen, location..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2.5 pl-9 pr-4 text-xs text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-content-muted" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-xl border border-border bg-muted/60 py-2.5 pl-8 pr-8 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              >
                <option value="all">All Status</option>
                {COMPLAINT_STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {COMPLAINT_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-border bg-muted/60 py-2.5 px-4 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="rounded-xl border border-border bg-muted/60 py-2.5 px-4 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Submitted By</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-content-muted text-xs">
                    No complaints found.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c.id}>
                    <td className="font-semibold text-content">{c.ticketNumber}</td>
                    <td>
                      <span className="font-medium text-content">{c.submittedBy}</span>
                    </td>
                    <td className="text-content-secondary">{c.category}</td>
                    <td>{priorityBadge(c.priority)}</td>
                    <td>{statusBadgeEl(c.status)}</td>
                    <td className="text-content-secondary max-w-[200px] truncate">
                      {c.location}
                    </td>
                    <td className="text-content-muted">{c.date}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailModal(c)}
                          className="p-1.5 rounded-lg text-content-muted hover:bg-muted hover:text-primary transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {/* Next status transition button */}
                        {STATUS_TRANSITIONS[c.status] && (
                          <button
                            type="button"
                            onClick={() => {
                              const nextStatus = STATUS_TRANSITIONS[c.status]![0];
                              if (nextStatus === 'RESOLVED') {
                                setResolveModal(c);
                                setResolutionNotes('');
                              } else {
                                handleStatusChange(c.id, nextStatus);
                              }
                            }}
                            className="p-1.5 rounded-lg text-content-muted hover:bg-sky-50 hover:text-sky-700 transition-colors"
                            title={`Move to ${COMPLAINT_STATUS_LABELS[STATUS_TRANSITIONS[c.status]![0]]}`}
                          >
                            {c.status === 'SUBMITTED' && <FileSearch className="w-3.5 h-3.5" />}
                            {c.status === 'UNDER_REVIEW' && <UserCheck className="w-3.5 h-3.5" />}
                            {c.status === 'ASSIGNED' && <Loader2 className="w-3.5 h-3.5" />}
                            {c.status === 'IN_PROGRESS' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {c.status === 'RESOLVED' && <Lock className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={!!detailModal}
          onClose={() => setDetailModal(null)}
          title={detailModal ? `Complaint ${detailModal.ticketNumber}` : ''}
          size="lg"
        >
          {detailModal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">
                    Submitted By
                  </p>
                  <p className="text-xs font-semibold text-content mt-0.5">
                    {detailModal.submittedBy}
                  </p>
                  <p className="text-[10px] text-content-muted">
                    {detailModal.citizenEmail} • {detailModal.citizenPhone}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">
                    Location
                  </p>
                  <p className="text-xs font-semibold text-content mt-0.5">
                    {detailModal.location}
                  </p>
                  <p className="text-[10px] text-content-muted">{detailModal.municipality}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">
                    Category
                  </p>
                  <p className="text-xs font-semibold text-content mt-0.5">
                    {detailModal.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">
                    Priority / Status
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {priorityBadge(detailModal.priority)}
                    {statusBadgeEl(detailModal.status)}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-content-muted uppercase font-bold mb-1">
                  Description
                </p>
                <p className="text-xs text-content-secondary leading-relaxed">
                  {detailModal.description}
                </p>
              </div>

              {/* Evidence Photos */}
              {detailModal.evidenceUrls.length > 0 && (
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    Evidence Photos ({detailModal.evidenceUrls.length})
                  </p>
                  <div className="flex gap-2 overflow-x-auto">
                    {detailModal.evidenceUrls.map((url, i) => (
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

              {/* Status History */}
              {detailModal.statusHistory.length > 0 && (
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold mb-2">
                    Status History
                  </p>
                  <div className="space-y-0 max-h-40 overflow-y-auto pr-1">
                    {detailModal.statusHistory.map((entry, i) => (
                      <div key={i} className="relative flex gap-2.5 pb-3 last:pb-0">
                        {i < detailModal.statusHistory.length - 1 && (
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

              {/* Status Workflow Actions */}
              {STATUS_TRANSITIONS[detailModal.status] && (
                <div className="p-4 rounded-2xl border border-primary/30 bg-primary-light/20">
                  <span className="font-bold text-content block text-xs mb-2">
                    Update Status
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUS_TRANSITIONS[detailModal.status]!.map((nextStatus) => (
                      <button
                        key={nextStatus}
                        type="button"
                        onClick={() => {
                          if (nextStatus === 'RESOLVED') {
                            setResolveModal(detailModal);
                            setResolutionNotes('');
                            setDetailModal(null);
                          } else {
                            handleStatusChange(detailModal.id, nextStatus);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        → {COMPLAINT_STATUS_LABELS[nextStatus]}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-content-muted mt-2">
                    Assigned Officer: {detailModal.assignedOfficer || 'Pending Assignment'}
                  </p>
                </div>
              )}

              <div className="text-[10px] text-content-muted">
                Reported: {detailModal.date} at {detailModal.time}
                {detailModal.assignedOfficer &&
                  ` • Assigned to: ${detailModal.assignedOfficer}`}
              </div>

              {detailModal.resolvedDate && (
                <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-3.5">
                  <p className="text-[10px] text-content-muted uppercase font-bold mb-1">
                    Resolution
                  </p>
                  <p className="text-xs text-emerald-800">
                    {detailModal.resolutionNotes}
                  </p>
                  <p className="text-[10px] text-content-muted mt-1">
                    Resolved on: {detailModal.resolvedDate}
                  </p>
                </div>
              )}
            </div>
          )}
          <ModalFooter>
            <button
              type="button"
              onClick={() => setDetailModal(null)}
              className="h-9 px-4 rounded-xl border border-border text-xs font-semibold text-content-secondary hover:bg-muted transition-colors"
            >
              Close
            </button>
          </ModalFooter>
        </Modal>

        {/* Resolve Modal */}
        <Modal
          isOpen={!!resolveModal}
          onClose={() => setResolveModal(null)}
          title="Resolve Complaint"
          description={
            resolveModal
              ? `Mark ${resolveModal.ticketNumber} as resolved`
              : ''
          }
          size="sm"
        >
          {resolveModal && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-3.5 border border-border/60">
                <p className="text-xs font-semibold text-content">
                  {resolveModal.category}
                </p>
                <p className="text-[10px] text-content-muted mt-0.5">
                  {resolveModal.submittedBy} — {resolveModal.location}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-content">
                  Resolution Notes
                </label>
                <textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Describe how the complaint was resolved..."
                  rows={3}
                  className="w-full rounded-xl border border-border bg-muted/60 py-2.5 px-3.5 text-xs text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>
            </div>
          )}
          <ModalFooter>
            <button
              type="button"
              onClick={() => setResolveModal(null)}
              className="h-9 px-4 rounded-xl border border-border text-xs font-semibold text-content-secondary hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleResolve}
              className="h-9 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Resolve Complaint
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </MunicipalLayout>
  );
};
