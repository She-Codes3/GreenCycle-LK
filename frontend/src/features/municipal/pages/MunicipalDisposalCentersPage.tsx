import React, { useState } from 'react';
import { Recycle, MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { useMunicipalData } from '../data/municipalStore';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import type { MunicipalDisposalCenter } from '../types/municipal';

export const MunicipalDisposalCentersPage: React.FC = () => {
  const { disposalCenters } = useMunicipalData();
  const [detailModal, setDetailModal] = useState<MunicipalDisposalCenter | null>(null);

  const statusColor = (status: string) =>
    status === 'Operational'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : status === 'Maintenance'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-red-50 text-red-800 border-red-200';

  const capacityColor = (pct: number) =>
    pct >= 80 ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <MunicipalLayout activeItem="disposal-centers" pageTitle="Disposal Centers">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Disposal Centers</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Waste management facilities within Kandy Municipal Council jurisdiction.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold self-start">
            <Recycle className="w-3.5 h-3.5" />
            {disposalCenters.filter((d) => d.status === 'Operational').length} Operational
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {disposalCenters.map((center) => (
            <div
              key={center.id}
              onClick={() => setDetailModal(center)}
              className="bg-surface rounded-2xl border border-border shadow-card p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-content group-hover:text-primary transition-colors truncate">
                    {center.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-content-muted shrink-0" />
                    <span className="text-[10px] text-content-muted truncate">{center.address}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${statusColor(center.status)}`}>
                  {center.status}
                </span>
              </div>

              {/* Capacity Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-content-secondary">Capacity</span>
                  <span className={`text-[10px] font-bold ${center.capacityPercent >= 80 ? 'text-red-600' : center.capacityPercent >= 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {center.capacityPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${capacityColor(center.capacityPercent)}`}
                    style={{ width: `${center.capacityPercent}%` }}
                  />
                </div>
                {center.capacityPercent >= 80 && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span className="text-[9px] text-red-600 font-semibold">Near capacity — schedule collection</span>
                  </div>
                )}
              </div>

              {/* Waste Types */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {center.wasteTypesAccepted.map((wt) => (
                  <span key={wt} className="text-[9px] font-semibold bg-muted text-content-secondary px-2 py-0.5 rounded-md border border-border/60">
                    {wt}
                  </span>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-1.5 text-[10px] text-content-muted">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{center.operatingHours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={!!detailModal}
          onClose={() => setDetailModal(null)}
          title={detailModal?.name || ''}
          size="md"
        >
          {detailModal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Address</p>
                  <p className="text-xs font-semibold text-content mt-0.5">{detailModal.address}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Zone</p>
                  <p className="text-xs font-semibold text-content mt-0.5">{detailModal.zone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Status</p>
                  <div className="mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(detailModal.status)}`}>
                      {detailModal.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Contact</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.contactPhone}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-content-muted uppercase font-bold mb-1">Operating Hours</p>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-content-muted" />
                  <span className="text-xs text-content">{detailModal.operatingHours}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-content-muted uppercase font-bold mb-2">Capacity</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${capacityColor(detailModal.capacityPercent)}`}
                      style={{ width: `${detailModal.capacityPercent}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-content">{detailModal.capacityPercent}%</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-content-muted uppercase font-bold mb-2">Waste Types Accepted</p>
                <div className="flex flex-wrap gap-2">
                  {detailModal.wasteTypesAccepted.map((wt) => (
                    <span key={wt} className="text-[10px] font-semibold bg-primary-light text-primary px-2.5 py-1 rounded-lg border border-primary/20">
                      {wt}
                    </span>
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
