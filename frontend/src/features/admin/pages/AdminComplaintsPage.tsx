import React, { useState, useMemo } from 'react';
import {
  Search,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { MOCK_ADMIN_COMPLAINTS } from '../data/adminMockData';
import { AdminComplaint, ComplaintStatus } from '../types/admin';

export const AdminComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<AdminComplaint[]>(MOCK_ADMIN_COMPLAINTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');

  // Selected complaint for review/status updater modal
  const [activeComplaint, setActiveComplaint] = useState<AdminComplaint | null>(null);

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

  // Status changer action
  const handleUpdateStatus = (ticketId: string, newStatus: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === ticketId ? { ...c, status: newStatus } : c))
    );
    if (activeComplaint && activeComplaint.id === ticketId) {
      setActiveComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedMunicipality('all');
  };

  const categories = Array.from(new Set(MOCK_ADMIN_COMPLAINTS.map((c) => c.category)));
  const municipalities = Array.from(new Set(MOCK_ADMIN_COMPLAINTS.map((c) => c.municipality)));

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
              {complaints.filter((c) => c.status === 'Pending').length} Pending Action
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
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
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
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : item.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : item.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        {item.status === 'Pending' && <Clock className="w-2.5 h-2.5" />}
                        {item.status === 'In Progress' && <AlertTriangle className="w-2.5 h-2.5" />}
                        {item.status === 'Resolved' && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {item.status === 'Rejected' && <XCircle className="w-2.5 h-2.5" />}
                        {item.status}
                      </span>
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

        {/* Complaint Detail & Status Changer Modal */}
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
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {activeComplaint.priority}
                  </span>
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

              {/* Interactive Status Changer */}
              <div className="p-4 rounded-2xl border border-primary/30 bg-primary-light/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-content block">Triage Status Update</span>
                  <span className="text-[11px] text-content-secondary block">
                    Assigned Officer: {activeComplaint.assignedOfficer || 'Pending Assignment'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {(['Pending', 'In Progress', 'Resolved', 'Rejected'] as ComplaintStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(activeComplaint.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeComplaint.status === st
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-surface hover:bg-muted text-content border border-border'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
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
