import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Phone, Mail, MapPin, Truck as TruckIcon, CalendarDays, Plus } from 'lucide-react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { useMunicipalData } from '../data/municipalStore';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import type { MunicipalCollector } from '../types/municipal';

export const MunicipalCollectorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { collectors } = useMunicipalData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [detailModal, setDetailModal] = useState<MunicipalCollector | null>(null);

  const filtered = collectors.filter((c) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      if (
        !c.name.toLowerCase().includes(q) &&
        !c.collectorId.toLowerCase().includes(q) &&
        !c.zone.toLowerCase().includes(q)
      ) return false;
    }
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  const statusBadge = (status: string) => {
    const cls =
      status === 'Active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : status === 'On Leave' ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-gray-100 text-gray-600 border-gray-200';
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>{status}</span>;
  };

  const stats = {
    total: collectors.length,
    active: collectors.filter((c) => c.status === 'Active').length,
    onLeave: collectors.filter((c) => c.status === 'On Leave').length,
  };

  return (
    <MunicipalLayout activeItem="collectors" pageTitle="Collectors">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">Collectors</h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Waste collection personnel assigned to Kandy Municipal Council.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold hidden sm:inline-flex">
              <Users className="w-3.5 h-3.5" />
              {stats.active} Active
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/municipal/collectors/register')}
              leftIcon={<Plus className="w-4 h-4" />}
              className="rounded-xl text-xs font-bold shadow-sm"
            >
              Add Collector
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Collectors', value: stats.total, color: 'bg-muted text-content' },
            { label: 'Active', value: stats.active, color: 'bg-emerald-50 text-emerald-800' },
            { label: 'On Leave', value: stats.onLeave, color: 'bg-amber-50 text-amber-800' },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border border-border p-3 ${s.color}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{s.label}</p>
              <p className="text-2xl font-black mt-1">{s.value}</p>
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
              placeholder="Search by name, ID, zone..."
              className="w-full rounded-xl border border-border bg-muted/60 py-2.5 pl-9 pr-4 text-xs text-content outline-none placeholder:text-content-muted focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-border bg-muted/60 py-2.5 px-4 text-xs text-content outline-none appearance-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Collector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full ui-empty-state">
              <Users className="w-8 h-8 text-content-muted mb-2" />
              <p className="text-xs text-content-muted">No collectors found.</p>
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setDetailModal(c)}
                className="bg-surface rounded-2xl border border-border shadow-card p-5 hover:border-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {c.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-content group-hover:text-primary transition-colors truncate">
                      {c.name}
                    </h3>
                    <p className="text-[10px] text-content-muted">{c.collectorId}</p>
                  </div>
                  {statusBadge(c.status)}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-content-secondary">
                    <MapPin className="w-3 h-3 text-content-muted shrink-0" />
                    <span className="truncate">{c.zone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-content-secondary">
                    <TruckIcon className="w-3 h-3 text-content-muted shrink-0" />
                    <span>{c.vehicleType} #{c.vehicleNumber}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <div>
                    <p className="text-[9px] text-content-muted uppercase font-bold">Today</p>
                    <p className="text-lg font-black text-content">{c.completedToday}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-content-muted uppercase font-bold">Total</p>
                    <p className="text-lg font-black text-content">{c.totalCompleted}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={!!detailModal}
          onClose={() => setDetailModal(null)}
          title={detailModal ? `${detailModal.name} (${detailModal.collectorId})` : ''}
          size="md"
        >
          {detailModal && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0">
                  {detailModal.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-content">{detailModal.name}</h3>
                  <p className="text-xs text-content-muted">{detailModal.collectorId}</p>
                  <div className="mt-1">{statusBadge(detailModal.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Zone</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.zone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Vehicle</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <TruckIcon className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.vehicleType} #{detailModal.vehicleNumber}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Phone</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.phone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Email</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.email}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-content-muted uppercase font-bold">Joined</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CalendarDays className="w-3 h-3 text-content-muted" />
                    <span className="text-xs text-content">{detailModal.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/40 rounded-xl p-4 border border-border/60">
                <p className="text-[10px] text-content-muted uppercase font-bold mb-3">Performance</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-black text-primary">{detailModal.completedToday}</p>
                    <p className="text-[10px] text-content-muted">Completed Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-content">{detailModal.totalCompleted}</p>
                    <p className="text-[10px] text-content-muted">Total Completed</p>
                  </div>
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
