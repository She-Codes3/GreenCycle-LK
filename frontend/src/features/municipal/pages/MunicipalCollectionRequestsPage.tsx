import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  Filter,
  UserCheck,
  Eye,
  X,
  Check,
  CircleDot,
} from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { useMunicipalData } from '../data/municipalStore';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import type { MunicipalCollectionRequest } from '../types/municipal';

export const MunicipalCollectionRequestsPage: React.FC = () => {
  const { requests, collectors, assignCollector } = useMunicipalData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedWasteType, setSelectedWasteType] = useState<string>('all');

  // Modals
  const [assignModal, setAssignModal] = useState<MunicipalCollectionRequest | null>(null);
  const [detailModal, setDetailModal] = useState<MunicipalCollectionRequest | null>(null);
  const [selectedCollectorId, setSelectedCollectorId] = useState('');

  // Success notification
  const [notification, setNotification] = useState<string | null>(null);

  const wasteTypes = useMemo(() => Array.from(new Set(requests.map((r) => r.wasteType))), [requests]);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((r) => r.status === 'Pending').length,
    inProgress: requests.filter((r) => r.status === 'In Progress').length,
    completed: requests.filter((r) => r.status === 'Completed').length,
  }), [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !r.id.toLowerCase().includes(q) &&
          !r.citizenName.toLowerCase().includes(q) &&
          !r.location.toLowerCase().includes(q) &&
          !r.area.toLowerCase().includes(q) &&
          !(r.collector?.name.toLowerCase().includes(q) || false)
        ) return false;
      }
      if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
      if (selectedWasteType !== 'all' && r.wasteType !== selectedWasteType) return false;
      return true;
    });
  }, [requests, searchTerm, selectedStatus, selectedWasteType]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAssign = () => {
    if (!assignModal || !selectedCollectorId) return;
    assignCollector(assignModal.id, selectedCollectorId);
    showNotification(`Collector assigned to request ${assignModal.id} successfully. Status is now In Progress.`);
    setAssignModal(null);
    setSelectedCollectorId('');
  };

  const statusBadge = (status: string) => {
    const cls =
      status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-200'
      : status === 'In Progress' ? 'bg-sky-50 text-sky-800 border-sky-200'
      : status === 'Completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : 'bg-gray-50 text-gray-600 border-gray-200';
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>{status}</span>;
  };

  const activeCollectors = collectors.filter((c) => c.status === 'Active');

  // 4-Stage Lifecycle Helper for Detail Modal
  const getLifecycleStages = (req: MunicipalCollectionRequest) => {
    const isAssigned = Boolean(req.collector || req.assignedCollectorId || req.status === 'In Progress' || req.status === 'Completed');
    const isInProgress = req.status === 'In Progress';
    const isCompleted = req.status === 'Completed';

    return [
      {
        id: 'created',
        label: 'Request Created',
        subtext: `${req.requestedDate} — ${req.requestedTime}`,
        status: 'completed' as const,
      },
      {
        id: 'assigned',
        label: 'Collector Assigned',
        subtext: isAssigned && req.collector ? `${req.collector.name} (${req.collector.collectorId})` : 'Awaiting assignment',
        status: (isCompleted || isInProgress || isAssigned) ? 'completed' as const : 'pending' as const,
      },
      {
        id: 'in_progress',
        label: 'Collection In Progress',
        subtext: isCompleted
          ? 'Physical collection fulfilled'
          : isInProgress
          ? 'Collector dispatched on collection route'
          : 'Awaiting collector dispatch',
        status: isCompleted ? 'completed' as const : isInProgress ? 'active' as const : 'pending' as const,
      },
      {
        id: 'completed',
        label: 'Collection Completed',
        subtext: isCompleted
          ? 'Waste collected & verified at disposal depot'
          : 'Pending physical collection by collector',
        status: isCompleted ? 'completed' as const : 'pending' as const,
      },
    ];
  };

  return (
    <MunicipalLayout activeItem="collection-requests" pageTitle="Collection Requests">
      <div className="space-y-5">
        {/* Notification */}
        {notification && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="flex-1">{notification}</span>
            <button type="button" onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-800">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Collection Requests</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Manage and dispatch waste collection requests within Kandy Municipal Council.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'bg-muted text-content' },
            { label: 'Pending', value: stats.pending, color: 'bg-amber-50 text-amber-800' },
            { label: 'In Progress', value: stats.inProgress, color: 'bg-sky-50 text-sky-800' },
            { label: 'Completed', value: stats.completed, color: 'bg-emerald-50 text-emerald-800' },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl border border-border p-3 ${c.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{c.label}</p>
              <p className="text-2xl font-black mt-1">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" strokeWidth={1.8} />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, citizen, location..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2.5 pl-9 pr-4 text-xs text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-content-muted" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-xl border border-border bg-muted/60 py-2.5 pl-8 pr-8 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <select
              value={selectedWasteType}
              onChange={(e) => setSelectedWasteType(e.target.value)}
              className="rounded-xl border border-border bg-muted/60 py-2.5 px-4 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            >
              <option value="all">All Waste Types</option>
              {wasteTypes.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Citizen</th>
                <th>Location</th>
                <th>Waste Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Collector</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-content-muted text-xs">
                    No collection requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="font-semibold text-content">{r.id}</td>
                    <td>
                      <div>
                        <span className="font-medium text-content block">{r.citizenName}</span>
                        <span className="text-[10px] text-content-muted">{r.citizenPhone}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-content-secondary">{r.area}, {r.city}</span>
                    </td>
                    <td>{r.wasteType}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td className="text-content-muted">{r.requestedDate}</td>
                    <td>
                      {r.collector ? (
                        <div>
                          <span className="text-content font-medium block">{r.collector.name}</span>
                          <span className="text-[10px] text-content-muted">{r.collector.collectorId}</span>
                        </div>
                      ) : (
                        <span className="text-content-muted italic text-[10px]">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDetailModal(r)}
                          className="p-1.5 rounded-lg text-content-muted hover:bg-muted hover:text-primary transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {r.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => { setAssignModal(r); setSelectedCollectorId(''); }}
                            className="p-1.5 rounded-lg text-content-muted hover:bg-sky-50 hover:text-sky-700 transition-colors"
                            title="Assign collector"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
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

        {/* Assign Collector Modal */}
        <Modal
          isOpen={!!assignModal}
          onClose={() => setAssignModal(null)}
          title="Assign Collector"
          description={assignModal ? `Assign a collector to request ${assignModal.id}` : ''}
          size="sm"
        >
          {assignModal && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-3.5 border border-border/60">
                <p className="text-xs font-semibold text-content">{assignModal.citizenName}</p>
                <p className="text-[10px] text-content-muted mt-0.5">{assignModal.wasteType} — {assignModal.area}, {assignModal.city}</p>
                <p className="text-[10px] text-content-muted">{assignModal.quantity}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-content">Select Collector</label>
                <select
                  value={selectedCollectorId}
                  onChange={(e) => setSelectedCollectorId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/60 py-2.5 px-3.5 text-xs text-content outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                >
                  <option value="">Choose a collector...</option>
                  {activeCollectors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.zone} ({c.vehicleType} #{c.vehicleNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-[11px] text-sky-800">
                <Clock className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
                The selected collector will be assigned and the request status will change to &quot;In Progress&quot;.
              </div>
            </div>
          )}
          <ModalFooter>
            <button
              type="button"
              onClick={() => setAssignModal(null)}
              className="h-9 px-4 rounded-xl border border-border text-xs font-semibold text-content-secondary hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAssign}
              disabled={!selectedCollectorId}
              className="h-9 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Collector
            </button>
          </ModalFooter>
        </Modal>

        {/* Detail Modal with 4-Stage Lifecycle Timeline */}
        <Modal
          isOpen={!!detailModal}
          onClose={() => setDetailModal(null)}
          title={detailModal ? `Request ${detailModal.id}` : ''}
          size="lg"
        >
          {detailModal && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Citizen</p>
                  <p className="text-xs font-semibold text-content mt-0.5">{detailModal.citizenName}</p>
                  <p className="text-[10px] text-content-muted">{detailModal.citizenPhone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Location</p>
                  <p className="text-xs font-semibold text-content mt-0.5">{detailModal.location}</p>
                  <p className="text-[10px] text-content-muted">{detailModal.area}, {detailModal.city}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Waste Type</p>
                  <p className="text-xs font-semibold text-content mt-0.5">{detailModal.wasteType}</p>
                  <p className="text-[10px] text-content-muted">{detailModal.quantity}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Status</p>
                  <div className="mt-1">{statusBadge(detailModal.status)}</div>
                </div>
              </div>

              {detailModal.collector && (
                <div className="bg-muted/40 rounded-xl p-3.5 border border-border/60">
                  <p className="text-[10px] text-content-muted uppercase font-bold mb-1">Assigned Collector</p>
                  <p className="text-xs font-semibold text-content">{detailModal.collector.name} ({detailModal.collector.collectorId})</p>
                  <p className="text-[10px] text-content-muted">{detailModal.collector.phone} • {detailModal.collector.vehicleType}</p>
                </div>
              )}

              {detailModal.notes && (
                <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-200/60">
                  <p className="text-[10px] text-content-muted uppercase font-bold mb-1">Notes</p>
                  <p className="text-xs text-content-secondary">{detailModal.notes}</p>
                </div>
              )}

              {/* 4-Stage Lifecycle Progress */}
              <div className="bg-surface rounded-xl border border-border/70 p-4">
                <p className="text-[10px] text-content-muted uppercase font-bold tracking-wider mb-3">
                  Collection Lifecycle
                </p>
                <div className="space-y-3">
                  {getLifecycleStages(detailModal).map((stage, sIdx, arr) => (
                    <div key={stage.id} className="flex items-start gap-3 relative">
                      {sIdx < arr.length - 1 && (
                        <div
                          className={`absolute left-[11px] top-6 w-0.5 h-6 ${
                            stage.status === 'completed' ? 'bg-emerald-500' : 'bg-border'
                          }`}
                        />
                      )}
                      <div className="shrink-0 mt-0.5 z-10">
                        {stage.status === 'completed' ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        ) : stage.status === 'active' ? (
                          <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 border border-sky-300 flex items-center justify-center relative shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-border bg-muted/40 flex items-center justify-center text-content-muted text-[10px]">
                            <CircleDot className="w-3 h-3 text-content-muted/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-xs font-bold ${
                            stage.status === 'completed'
                              ? 'text-content'
                              : stage.status === 'active'
                              ? 'text-sky-700 font-extrabold'
                              : 'text-content-muted'
                          }`}>
                            {stage.label}
                          </p>
                          {stage.status === 'completed' && (
                            <span className="text-[10px] font-semibold text-emerald-600">✓ Complete</span>
                          )}
                          {stage.status === 'active' && (
                            <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full animate-pulse">
                              ● In Progress
                            </span>
                          )}
                          {stage.status === 'pending' && (
                            <span className="text-[10px] font-semibold text-content-muted/70">Pending</span>
                          )}
                        </div>
                        <p className="text-[11px] text-content-muted mt-0.5">{stage.subtext}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Events History Log */}
              <div>
                <p className="text-[10px] text-content-muted uppercase font-bold mb-2">History Log</p>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {detailModal.statusHistory.map((entry, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-muted/30 border border-border/50 text-[11px]">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-content">{entry.title}</span>
                        <span className="text-[10px] text-content-muted">{entry.timestamp}</span>
                      </div>
                      <p className="text-content-muted mt-0.5">{entry.description}</p>
                      <p className="text-[10px] text-content-muted/70 mt-1">Performed by {entry.performedBy} ({entry.role})</p>
                    </div>
                  ))}
                </div>
              </div>
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
      </div>
    </MunicipalLayout>
  );
};
