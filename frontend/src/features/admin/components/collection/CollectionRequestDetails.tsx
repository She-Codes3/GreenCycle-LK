import React from 'react';
import {
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
  UserCheck,
} from 'lucide-react';
import {
  CollectionRequest,
  CollectionRequestStatus,
} from '../../types/collectionRequest';
import { CollectionStatusBadge } from './CollectionStatusBadge';
import { CollectionProgressTimeline } from './CollectionProgressTimeline';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface CollectionRequestDetailsProps {
  request: CollectionRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (requestId: string, newStatus: CollectionRequestStatus) => void;
}

export const CollectionRequestDetails: React.FC<CollectionRequestDetailsProps> = ({
  request,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!request) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value as CollectionRequestStatus;
    onUpdateStatus(request.id, nextStatus);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-base font-black text-content">
            {request.id}
          </span>
          <CollectionStatusBadge status={request.status} size="sm" />
        </div>
      }
      description={`Citizen Waste Collection Request • ${request.municipality}`}
      size="xl"
    >
      <div className="space-y-6 text-xs">
        {/* Status Simulator Header Bar */}
        <div className="p-3.5 bg-muted/40 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-content text-xs block">
              Simulate Status Progression
            </span>
            <span className="text-[11px] text-content-muted block">
              Frontend demonstration: update the operational lifecycle state for this request.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="status-select" className="text-content-muted font-semibold text-[11px] shrink-0">
              Current Status:
            </label>
            <select
              id="status-select"
              value={request.status}
              onChange={handleStatusChange}
              className="bg-surface border border-border rounded-xl px-3 py-1.5 text-xs font-bold text-content outline-none focus:border-primary cursor-pointer shadow-sm"
            >
              <option value="Pending">Pending (Not Assigned)</option>
              <option value="Assigned">Assigned (Collector Dispatched)</option>
              <option value="In Progress">In Progress (Collection Started)</option>
              <option value="Collected">Collected (Waste Picked Up)</option>
              <option value="Completed">Completed (Request Closed)</option>
              <option value="Cancelled">Cancelled (Terminated)</option>
            </select>
          </div>
        </div>

        {/* 1. Collection Progress Timeline */}
        <CollectionProgressTimeline request={request} />

        {/* 2. Grid: Request Information & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Request Information Card */}
          <div className="p-4 rounded-2xl border border-border bg-surface shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Package className="w-4 h-4 text-primary" />
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-content">
                Request Details
              </h4>
            </div>

            <div className="space-y-2 text-content-secondary">
              <div className="flex items-center justify-between">
                <span className="text-content-muted flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Citizen:
                </span>
                <span className="font-bold text-content">{request.citizenName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-content-muted flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone:
                </span>
                <span className="font-mono font-medium text-content">{request.citizenPhone}</span>
              </div>

              {request.citizenEmail && (
                <div className="flex items-center justify-between">
                  <span className="text-content-muted flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email:
                  </span>
                  <span className="text-content truncate max-w-[180px]">{request.citizenEmail}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-content-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Requested:
                </span>
                <span className="font-medium text-content">
                  {request.requestedDate} ({request.requestedTime})
                </span>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="text-content-muted">Waste Type:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]">
                  {request.wasteType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-content-muted">Quantity:</span>
                <span className="font-bold text-content">{request.quantity}</span>
              </div>

              {request.notes && (
                <div className="mt-2 pt-2 border-t border-border/60 bg-muted/30 p-2.5 rounded-xl">
                  <span className="text-[10px] font-bold text-content-muted block mb-0.5">
                    Citizen Notes:
                  </span>
                  <p className="text-[11px] text-content italic leading-relaxed">
                    &quot;{request.notes}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Collection Location Card */}
          <div className="p-4 rounded-2xl border border-border bg-surface shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <MapPin className="w-4 h-4 text-primary" />
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-content">
                Collection Location
              </h4>
            </div>

            <div className="space-y-2 text-content-secondary">
              <div className="flex items-center justify-between">
                <span className="text-content-muted flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Municipality:
                </span>
                <span className="font-bold text-content text-right">{request.municipality}</span>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border space-y-1 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted block">
                  Designated Pickup Address
                </span>
                <p className="font-bold text-content text-xs">{request.location}</p>
                <p className="text-content-secondary text-[11px]">
                  {request.area}, {request.city}
                </p>
              </div>

              {/* Visual Location Preview Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-800 text-[11px]">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Geo-verified address within municipal service quadrant.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Grid: Collector Info & Completion Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Assigned Collector Information */}
          <div className="p-4 rounded-2xl border border-border bg-surface shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <Truck className="w-4 h-4 text-primary" />
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-content">
                Collector Assignment
              </h4>
            </div>

            {request.collector ? (
              <div className="space-y-2 text-content-secondary">
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Collector Name:</span>
                  <span className="font-bold text-content">{request.collector.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Collector ID:</span>
                  <span className="font-mono font-bold text-content-secondary">
                    {request.collector.collectorId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Direct Phone:</span>
                  <span className="font-mono text-content">{request.collector.phone}</span>
                </div>

                {request.collector.vehicleType && (
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Assigned Vehicle:</span>
                    <span className="font-medium text-content">{request.collector.vehicleType}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Assigned By:</span>
                    <span className="font-medium text-content">{request.collector.assignedBy}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-0.5">
                    <span className="text-content-muted">Assigned At:</span>
                    <span className="text-content-muted">{request.collector.assignedAt}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
                <span className="font-bold text-amber-900 text-xs block">
                  Collector: Not Assigned
                </span>
                <p className="text-[11px] text-amber-800/80 leading-relaxed">
                  This request is currently queued in the municipal dispatch system awaiting collector allocation.
                </p>
              </div>
            )}
          </div>

          {/* Collection Completion Information */}
          <div className="p-4 rounded-2xl border border-border bg-surface shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-content">
                Collection Completion
              </h4>
            </div>

            {request.status === 'Completed' || request.status === 'Collected' ? (
              <div className="space-y-2 text-content-secondary">
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Collected By:</span>
                  <span className="font-bold text-content">
                    {request.completionInfo?.collectedBy || request.collector?.name || 'Assigned Collector'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-content-muted">Collected At:</span>
                  <span className="font-medium text-content">
                    {request.completionInfo?.collectedAt || '15 Mar 2026 — 11:30 AM'}
                  </span>
                </div>

                {request.status === 'Completed' && (
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Completed At:</span>
                    <span className="font-medium text-content">
                      {request.completionInfo?.completedAt || '15 Mar 2026 — 11:45 AM'}
                    </span>
                  </div>
                )}

                {request.completionInfo?.completionNotes && (
                  <div className="mt-2 pt-2 border-t border-border/60 bg-emerald-50/40 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-emerald-800 block mb-0.5">
                      Operational Note:
                    </span>
                    <p className="text-[11px] text-emerald-950 leading-relaxed">
                      {request.completionInfo.completionNotes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center rounded-xl bg-muted/40 border border-border space-y-1.5">
                <Clock className="w-5 h-5 text-content-muted mx-auto" />
                <span className="font-bold text-content text-xs block">
                  Collection not yet completed.
                </span>
                <p className="text-[11px] text-content-muted leading-relaxed">
                  Completion details will be recorded once physical pickup and depot weigh-in are finalized.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Status History Timeline */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 pb-1 border-b border-border/60">
            <FileText className="w-4 h-4 text-primary" />
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-content">
              Status History
            </h4>
          </div>

          <div className="space-y-2.5">
            {request.statusHistory.map((history, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 border border-emerald-200">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-bold text-content text-xs">{history.title}</span>
                    <span className="text-[10px] text-content-muted font-mono">{history.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-content-secondary mt-0.5 leading-relaxed">
                    {history.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-content-muted">
                    <UserCheck className="w-3 h-3 text-content-muted" />
                    <span>
                      Logged by {history.performedBy} ({history.role})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalFooter className="mt-6 pt-3 border-t border-border flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={onClose} className="rounded-xl">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
