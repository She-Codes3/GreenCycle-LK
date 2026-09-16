import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { MOCK_DISPOSAL_CENTERS } from '@/features/disposal/data/disposalCenters.mock';
import { DisposalCenter } from '@/features/disposal/types/disposal';

export const AdminDisposalCentersPage: React.FC = () => {
  const navigate = useNavigate();
  const [centers] = useState<DisposalCenter[]>(MOCK_DISPOSAL_CENTERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedStreamGroup, setSelectedStreamGroup] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Selected center for Admin inspection modal
  const [inspectCenter, setInspectCenter] = useState<DisposalCenter | null>(null);

  // Distinct cities/municipalities
  const cities = Array.from(new Set(centers.map((c) => c.city)));

  // Filtering
  const filteredCenters = useMemo(() => {
    return centers.filter((c) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesCode = (c.code || '').toLowerCase().includes(q);
        const matchesAddress = c.address.toLowerCase().includes(q);
        const matchesArea = (c.area || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesAddress && !matchesArea) return false;
      }

      if (selectedMunicipality !== 'all' && c.city !== selectedMunicipality) {
        return false;
      }

      if (selectedStreamGroup !== 'all' && c.streamGroup !== selectedStreamGroup) {
        return false;
      }

      if (selectedStatus !== 'all') {
        const isNormal = c.capacityStatus === 'NORMAL' || !c.capacityStatus;
        if (selectedStatus === 'NORMAL' && !isNormal) return false;
        if (selectedStatus === 'HIGH' && c.capacityStatus !== 'NEAR_CAPACITY' && c.capacityStatus !== 'FULL') {
          return false;
        }
      }

      return true;
    });
  }, [centers, searchTerm, selectedMunicipality, selectedStreamGroup, selectedStatus]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMunicipality('all');
    setSelectedStreamGroup('all');
    setSelectedStatus('all');
  };

  return (
    <AdminLayout activeItem="disposal-centers" pageTitle="Disposal Centers Registry">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Disposal Centers
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              National registry of municipal drop-off hubs, recycling sorting plants, and telemetry sensors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              128 of 138 Active
            </span>
          </div>
        </div>

        {/* Quick Summary Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-surface rounded-2xl border border-border p-4 shadow-card">
            <span className="text-xs font-bold text-content-muted block">Total Registered</span>
            <span className="text-2xl font-black text-content mt-1 block">138</span>
            <span className="text-[11px] text-content-muted mt-0.5 block">Across 9 provinces</span>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-4 shadow-card">
            <span className="text-xs font-bold text-content-muted block">Normal Telemetry</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">128</span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">Intake &lt; 70% capacity</span>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-4 shadow-card">
            <span className="text-xs font-bold text-content-muted block">Near Capacity</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">7</span>
            <span className="text-[11px] text-amber-600 font-semibold mt-0.5 block">Requires compaction</span>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-4 shadow-card">
            <span className="text-xs font-bold text-content-muted block">Maintenance</span>
            <span className="text-2xl font-black text-content-secondary mt-1 block">3</span>
            <span className="text-[11px] text-content-muted mt-0.5 block">Scheduled sensor service</span>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
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
              placeholder="Search center name, code, street..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Municipality / City */}
            <select
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Stream Group */}
            <select
              value={selectedStreamGroup}
              onChange={(e) => setSelectedStreamGroup(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Waste Streams</option>
              <option value="recycling">Recycling Hub</option>
              <option value="organic">Organic Composting</option>
              <option value="hazardous">Hazardous Materials</option>
              <option value="bulky">Bulky Drop-off</option>
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Telemetry States</option>
              <option value="NORMAL">Normal (&lt;70%)</option>
              <option value="HIGH">Near Capacity (&gt;70%)</option>
            </select>

            {(searchTerm || selectedMunicipality !== 'all' || selectedStreamGroup !== 'all' || selectedStatus !== 'all') && (
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

        {/* Centers Table */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Center Name & Code</th>
                  <th className="py-3.5 px-4 font-bold">Location / Ward</th>
                  <th className="py-3.5 px-4 font-bold">Accepted Streams</th>
                  <th className="py-3.5 px-4 font-bold">Intake Telemetry</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredCenters.map((center) => {
                  const capacity = center.telemetryCapacityPct || 42;
                  const isHigh = capacity >= 70;

                  return (
                    <tr
                      key={center.id}
                      onClick={() => setInspectCenter(center)}
                      className="hover:bg-muted/30 cursor-pointer transition-colors group"
                    >
                      {/* Name & Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            ♻️
                          </div>
                          <div>
                            <span className="font-bold text-content group-hover:text-primary transition-colors block">
                              {center.name}
                            </span>
                            <span className="font-mono text-[10px] text-content-muted block">
                              {center.code || center.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location / Ward */}
                      <td className="py-3.5 px-4">
                        <div className="text-content font-medium">{center.address}</div>
                        <div className="text-[10px] text-content-muted">{center.city} • {center.district}</div>
                      </td>

                      {/* Accepted Streams */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1 max-w-xs">
                          {center.acceptedWasteTypes.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-content-secondary border border-border"
                            >
                              {t}
                            </span>
                          ))}
                          {center.acceptedWasteTypes.length > 3 && (
                            <span className="text-[9px] font-bold text-content-muted">
                              +{center.acceptedWasteTypes.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Intake Telemetry Bar */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1 w-32">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={isHigh ? 'text-amber-600' : 'text-emerald-700'}>
                              {capacity}% Intake
                            </span>
                            <span className="text-content-muted">{capacity > 80 ? 'Heavy' : 'Normal'}</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${capacity}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          Operational
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setInspectCenter(center)}
                            title="Inspect Center"
                            className="p-1.5 rounded-lg text-content-secondary hover:text-primary hover:bg-muted transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/disposal-centers/${center.code || center.id}`)}
                            title="View Citizen Page"
                            className="p-1.5 rounded-lg text-content-secondary hover:text-primary hover:bg-muted transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Center Inspection Modal */}
        {inspectCenter && (
          <Modal
            isOpen={Boolean(inspectCenter)}
            onClose={() => setInspectCenter(null)}
            title={inspectCenter.name}
            description={`Center Code: ${inspectCenter.code || inspectCenter.id} • ${inspectCenter.city}`}
            size="lg"
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-muted/30 border border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-content-muted block">
                    Facility Category
                  </span>
                  <span className="font-bold text-sm text-content block mt-0.5">
                    {inspectCenter.type || 'Municipal Drop-Off Hub'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider text-content-muted block">
                    Active Telemetry Status
                  </span>
                  <span className="font-bold text-sm text-emerald-700 block mt-0.5">
                    {inspectCenter.telemetryStatus || 'Intake Normal (42% Capacity)'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-content mb-1">Street Address</h4>
                <p className="text-content-secondary p-3 rounded-xl border border-border bg-surface">
                  {inspectCenter.address}, {inspectCenter.city}, {inspectCenter.district}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-content mb-1.5">Accepted Waste Categories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {inspectCenter.acceptedWasteTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl border border-border bg-surface flex items-center justify-between">
                <div>
                  <span className="font-bold text-content block">Operating Hours</span>
                  <span className="text-content-muted block">
                    {inspectCenter.openingHoursDisplay || '8:00 AM – 5:00 PM'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate(`/disposal-centers/${inspectCenter.code || inspectCenter.id}`);
                  }}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  className="rounded-xl text-xs"
                >
                  Open Resident Details Page
                </Button>
              </div>
            </div>

            <ModalFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectCenter(null)}
                className="rounded-xl"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};
