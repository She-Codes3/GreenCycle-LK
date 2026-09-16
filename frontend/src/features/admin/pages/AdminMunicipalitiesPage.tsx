import React, { useState, useMemo } from 'react';
import {
  Search,
  Users,
  Recycle,
  AlertTriangle,
  MapPin,
  LayoutGrid,
  List,
  ExternalLink,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { MOCK_ADMIN_MUNICIPALITIES } from '../data/adminMockData';
import { AdminMunicipality, MunicipalityStatus } from '../types/admin';

export const AdminMunicipalitiesPage: React.FC = () => {
  const [municipalities, setMunicipalities] = useState<AdminMunicipality[]>(MOCK_ADMIN_MUNICIPALITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Selected council for detail inspection
  const [activeCouncil, setActiveCouncil] = useState<AdminMunicipality | null>(null);

  // Add Municipality Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSuccessNotice, setAddSuccessNotice] = useState<string | null>(null);
  const [newCouncil, setNewCouncil] = useState({
    name: '',
    code: '',
    province: 'Western Province',
    district: '',
    contactOfficer: '',
    phone: '',
    email: '',
    description: '',
    status: 'Onboarding' as MunicipalityStatus,
  });

  // Distinct provinces
  const provincesList = Array.from(new Set(MOCK_ADMIN_MUNICIPALITIES.map((m) => m.province)));

  // Filter logic
  const filteredCouncils = useMemo(() => {
    return municipalities.filter((m) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesCode = m.code.toLowerCase().includes(q);
        const matchesDistrict = m.district.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDistrict) return false;
      }

      if (selectedProvince !== 'all' && m.province !== selectedProvince) {
        return false;
      }

      if (selectedStatus !== 'all' && m.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [municipalities, searchTerm, selectedProvince, selectedStatus]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedProvince('all');
    setSelectedStatus('all');
  };

  const handleCreateMunicipality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouncil.name.trim() || !newCouncil.code.trim()) return;

    const created: AdminMunicipality = {
      id: `MUN-${String(municipalities.length + 1).padStart(3, '0')}`,
      name: newCouncil.name.trim(),
      code: newCouncil.code.trim().toUpperCase(),
      province: newCouncil.province,
      district: newCouncil.district.trim() || 'Western',
      contactOfficer: newCouncil.contactOfficer.trim() || 'Designated Municipal Officer',
      phone: newCouncil.phone.trim() || '+94 11 200 0000',
      email: newCouncil.email.trim() || `waste@${newCouncil.code.toLowerCase()}.mc.gov.lk`,
      usersCount: 0,
      centersCount: 0,
      complaintsCount: 0,
      status: newCouncil.status,
      joinedDate: new Date().toISOString().split('T')[0],
      description: newCouncil.description.trim() || 'Newly onboarded municipal council authority in the GreenCycle LK platform.',
    };

    setMunicipalities((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setAddSuccessNotice(`Successfully onboarded ${created.name} (${created.code}) into the GreenCycle LK system!`);
    setTimeout(() => setAddSuccessNotice(null), 5000);

    // Reset form
    setNewCouncil({
      name: '',
      code: '',
      province: 'Western Province',
      district: '',
      contactOfficer: '',
      phone: '',
      email: '',
      description: '',
      status: 'Onboarding',
    });
  };

  return (
    <AdminLayout activeItem="municipalities" pageTitle="Municipality Management">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Municipalities
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Administrative control and operational monitoring of participating local government authorities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl hidden sm:inline-block">
              {municipalities.filter((m) => m.status === 'Active').length} of {municipalities.length} Councils Operational
            </span>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
              className="rounded-xl text-xs font-bold shadow-sm"
            >
              Add Municipality
            </Button>
          </div>
        </div>

        {/* Success Notice Banner */}
        {addSuccessNotice && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{addSuccessNotice}</span>
          </div>
        )}

        {/* Toolbar: Search, Filters & View Toggle */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search council name, code, district..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Filters & View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Province Filter */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Provinces</option>
              {provincesList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Pending">Pending</option>
            </select>

            {/* View Mode Toggle */}
            <div className="inline-flex rounded-xl bg-muted p-1 border border-border">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-content-muted hover:text-content'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'table'
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-content-muted hover:text-content'
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {(searchTerm || selectedProvince !== 'all' || selectedStatus !== 'all') && (
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

        {/* View Mode 1: Grid Cards */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCouncils.map((council) => (
              <div
                key={council.id}
                onClick={() => setActiveCouncil(council)}
                className="bg-surface rounded-2xl border border-border p-5 shadow-card hover:border-primary/40 hover:shadow-elevated transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Top Bar: Code Tag + Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-muted text-content px-2 py-0.5 rounded-md border border-border font-mono">
                      {council.code}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        council.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : council.status === 'Onboarding'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {council.status}
                    </span>
                  </div>

                  {/* Title & Province */}
                  <h3 className="font-extrabold text-base text-content group-hover:text-primary transition-colors">
                    {council.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-content-muted mt-0.5 mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{council.district}, {council.province}</span>
                  </div>

                  {/* 3 Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/70 text-center mb-4 bg-muted/20 rounded-xl">
                    <div>
                      <span className="text-xs text-content-muted block">Users</span>
                      <span className="text-base font-black text-content block mt-0.5">
                        {council.usersCount}
                      </span>
                    </div>
                    <div className="border-x border-border/60">
                      <span className="text-xs text-content-muted block">Centers</span>
                      <span className="text-base font-black text-content block mt-0.5">
                        {council.centersCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-content-muted block">Complaints</span>
                      <span
                        className={`text-base font-black block mt-0.5 ${
                          council.complaintsCount > 5 ? 'text-amber-600' : 'text-content'
                        }`}
                      >
                        {council.complaintsCount}
                      </span>
                    </div>
                  </div>

                  {/* Officer Info */}
                  <div className="text-xs text-content-secondary space-y-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-content-muted font-bold">Officer:</span>
                      <span className="truncate">{council.contactOfficer}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-content-muted">
                    Joined {council.joinedDate}
                  </span>
                  <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Inspect Council</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode 2: Table */
          <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-bold">Council Name</th>
                    <th className="py-3.5 px-4 font-bold">Code</th>
                    <th className="py-3.5 px-4 font-bold">Province</th>
                    <th className="py-3.5 px-4 font-bold text-right">Users</th>
                    <th className="py-3.5 px-4 font-bold text-right">Centers</th>
                    <th className="py-3.5 px-4 font-bold text-right">Complaints</th>
                    <th className="py-3.5 px-4 font-bold text-center">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredCouncils.map((council) => (
                    <tr
                      key={council.id}
                      onClick={() => setActiveCouncil(council)}
                      className="hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-content">
                        {council.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-content-secondary">
                        {council.code}
                      </td>
                      <td className="py-3.5 px-4 text-content-secondary">
                        {council.province}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-content">
                        {council.usersCount}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-content">
                        {council.centersCount}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`font-black ${
                            council.complaintsCount > 5 ? 'text-amber-600' : 'text-content'
                          }`}
                        >
                          {council.complaintsCount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            council.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : council.status === 'Onboarding'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {council.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCouncil(council);
                          }}
                          className="text-xs text-primary font-bold hover:underline"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Council Detail Inspection Modal */}
        {activeCouncil && (
          <Modal
            isOpen={Boolean(activeCouncil)}
            onClose={() => setActiveCouncil(null)}
            title={activeCouncil.name}
            description={`Code: ${activeCouncil.code} • ${activeCouncil.district}, ${activeCouncil.province}`}
            size="lg"
          >
            <div className="space-y-5">
              {/* Top Overview Cards */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-muted/40 rounded-2xl border border-border text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-content-muted text-xs mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Registered Users</span>
                  </div>
                  <span className="text-xl font-black text-content">
                    {activeCouncil.usersCount}
                  </span>
                </div>
                <div className="border-x border-border">
                  <div className="flex items-center justify-center gap-1 text-content-muted text-xs mb-1">
                    <Recycle className="w-3.5 h-3.5" />
                    <span>Disposal Centers</span>
                  </div>
                  <span className="text-xl font-black text-content">
                    {activeCouncil.centersCount}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-content-muted text-xs mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Active Complaints</span>
                  </div>
                  <span className="text-xl font-black text-amber-600">
                    {activeCouncil.complaintsCount}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1.5">
                  About Municipality
                </h4>
                <p className="text-xs text-content leading-relaxed bg-surface p-3.5 rounded-xl border border-border">
                  {activeCouncil.description || 'Full administrative jurisdiction under Sri Lankan local government act.'}
                </p>
              </div>

              {/* Administrative Contacts */}
              <div className="space-y-2 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-content-muted mb-1">
                  Designated Administration
                </h4>
                <div className="p-3 rounded-xl border border-border bg-surface flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Senior Environmental Officer:</span>
                    <span className="font-bold text-content">{activeCouncil.contactOfficer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Direct Hotline:</span>
                    <span className="font-mono text-content">{activeCouncil.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-content-muted">Official Email:</span>
                    <span className="text-primary font-semibold">{activeCouncil.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <ModalFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveCouncil(null)}
                className="rounded-xl"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}

        {/* Add Municipality Modal Form */}
        {isAddModalOpen && (
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Onboard New Municipality"
            description="Register a new local government authority / municipal council into GreenCycle LK"
            size="lg"
          >
            <form onSubmit={handleCreateMunicipality} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Council Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouncil.name}
                    onChange={(e) => setNewCouncil({ ...newCouncil, name: e.target.value })}
                    placeholder="e.g. Gampaha Municipal Council"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Council Code (Short ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCouncil.code}
                    onChange={(e) => setNewCouncil({ ...newCouncil, code: e.target.value })}
                    placeholder="e.g. GMC"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-mono font-bold uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Province *
                  </label>
                  <select
                    value={newCouncil.province}
                    onChange={(e) => setNewCouncil({ ...newCouncil, province: e.target.value })}
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium cursor-pointer"
                  >
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="North Western Province">North Western Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="North Central Province">North Central Province</option>
                    <option value="Uva Province">Uva Province</option>
                    <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    District
                  </label>
                  <input
                    type="text"
                    value={newCouncil.district}
                    onChange={(e) => setNewCouncil({ ...newCouncil, district: e.target.value })}
                    placeholder="e.g. Gampaha"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Designated Contact Officer
                  </label>
                  <input
                    type="text"
                    value={newCouncil.contactOfficer}
                    onChange={(e) => setNewCouncil({ ...newCouncil, contactOfficer: e.target.value })}
                    placeholder="e.g. Eng. Sunil Jayatissa"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Direct Telephone Hotline
                  </label>
                  <input
                    type="text"
                    value={newCouncil.phone}
                    onChange={(e) => setNewCouncil({ ...newCouncil, phone: e.target.value })}
                    placeholder="e.g. +94 33 222 2275"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={newCouncil.email}
                    onChange={(e) => setNewCouncil({ ...newCouncil, email: e.target.value })}
                    placeholder="e.g. solidwaste@gampaha.mc.gov.lk"
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                    Initial Registration Status
                  </label>
                  <select
                    value={newCouncil.status}
                    onChange={(e) => setNewCouncil({ ...newCouncil, status: e.target.value as MunicipalityStatus })}
                    className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium cursor-pointer"
                  >
                    <option value="Onboarding">Onboarding (Technical setup)</option>
                    <option value="Active">Active (Fully operational)</option>
                    <option value="Pending">Pending (Council review)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-content uppercase tracking-wider text-[10px] block">
                  Jurisdiction Scope / Description
                </label>
                <textarea
                  rows={2}
                  value={newCouncil.description}
                  onChange={(e) => setNewCouncil({ ...newCouncil, description: e.target.value })}
                  placeholder="Urban wards covered, compost yards, or special municipal waste requirements..."
                  className="w-full bg-muted/40 border border-border rounded-xl px-3.5 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface font-medium resize-none"
                />
              </div>

              <ModalFooter className="mt-4 pt-3 border-t border-border flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  className="rounded-xl text-xs font-bold"
                >
                  Onboard Municipality
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};
