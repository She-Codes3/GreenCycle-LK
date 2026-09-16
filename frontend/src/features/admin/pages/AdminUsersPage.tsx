import React, { useState, useMemo } from 'react';
import { Search, UserCheck, UserX, Eye, Shield, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { MOCK_ADMIN_USERS } from '../data/adminMockData';
import { AdminUser, AdminUserStatus } from '../types/admin';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Selected user for Detail Modal
  const [activeUser, setActiveUser] = useState<AdminUser | null>(null);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesMunicipality = u.municipality.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesMunicipality) return false;
      }

      // Role filter
      if (selectedRole !== 'all' && u.role !== selectedRole) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && u.status !== selectedStatus) {
        return false;
      }

      // Municipality filter
      if (selectedMunicipality !== 'all' && u.municipality !== selectedMunicipality) {
        return false;
      }

      return true;
    });
  }, [users, searchTerm, selectedRole, selectedStatus, selectedMunicipality]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle toggle user status
  const handleToggleStatus = (userId: string, newStatus: AdminUserStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    if (activeUser && activeUser.id === userId) {
      setActiveUser((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedMunicipality('all');
    setCurrentPage(1);
  };

  // Distinct municipalities for dropdown
  const municipalitiesList = Array.from(new Set(MOCK_ADMIN_USERS.map((u) => u.municipality)));

  return (
    <AdminLayout activeItem="users" pageTitle="User Management">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Users
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Manage citizen accounts, municipal officers, certified collectors, and platform admins.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-content-secondary bg-surface px-3 py-1.5 rounded-xl border border-border">
              Total: {users.length} registered
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search users by name, email..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="Citizen">Citizen</option>
              <option value="Municipal Officer">Municipal Officer</option>
              <option value="Collector">Collector</option>
              <option value="System Admin">System Admin</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            {/* Municipality Filter */}
            <select
              value={selectedMunicipality}
              onChange={(e) => {
                setSelectedMunicipality(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer hidden lg:block"
            >
              <option value="all">All Municipalities</option>
              {municipalitiesList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {(searchTerm || selectedRole !== 'all' || selectedStatus !== 'all' || selectedMunicipality !== 'all') && (
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

        {/* Users Data Table */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
          {paginatedUsers.length === 0 ? (
            <div className="py-16 text-center">
              <UserX className="w-12 h-12 text-content-muted mx-auto mb-3 stroke-[1.5]" />
              <h4 className="text-base font-bold text-content">No users found</h4>
              <p className="text-xs text-content-secondary mt-1">
                No users matched your search criteria. Try modifying your filters.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilters}
                className="mt-4 text-xs rounded-xl"
              >
                Reset all filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-bold">User</th>
                    <th className="py-3.5 px-4 font-bold">Role</th>
                    <th className="py-3.5 px-4 font-bold">Municipality</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Joined Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginatedUsers.map((user) => {
                    const initials = user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setActiveUser(user)}
                      >
                        {/* User Identity Column */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-content group-hover:text-primary transition-colors block truncate">
                                {user.name}
                              </span>
                              <span className="text-[11px] text-content-muted block truncate">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Role Column */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              user.role === 'System Admin'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : user.role === 'Municipal Officer'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : user.role === 'Collector'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            <Shield className="w-2.5 h-2.5" />
                            {user.role}
                          </span>
                        </td>

                        {/* Municipality Column */}
                        <td className="py-3.5 px-4 text-content-secondary font-medium">
                          {user.municipality}
                        </td>

                        {/* Status Column */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              user.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : user.status === 'Inactive'
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-red-50 text-red-800 border-red-200'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        {/* Joined Date */}
                        <td className="py-3.5 px-4 text-content-muted font-mono text-[11px]">
                          {user.joinedDate}
                        </td>

                        {/* Actions */}
                        <td
                          className="py-3.5 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setActiveUser(user)}
                              title="View details"
                              className="p-1.5 rounded-lg text-content-secondary hover:text-primary hover:bg-muted transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {user.status === 'Active' ? (
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(user.id, 'Suspended')}
                                title="Suspend user"
                                className="p-1.5 rounded-lg text-content-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(user.id, 'Active')}
                                title="Activate user"
                                className="p-1.5 rounded-lg text-content-secondary hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-content-muted">
            <span>
              Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-xl px-3 py-1 text-xs"
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === idx + 1
                        ? 'bg-primary text-white'
                        : 'text-content-secondary hover:bg-muted'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-xl px-3 py-1 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {activeUser && (
        <Modal
          isOpen={Boolean(activeUser)}
          onClose={() => setActiveUser(null)}
          title={`User Profile — ${activeUser.name}`}
          description={`ID: ${activeUser.id} • Registered Platform Account`}
          size="md"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary text-white text-base font-bold flex items-center justify-center">
                {activeUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm text-content">{activeUser.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-content-muted">{activeUser.role}</span>
                  <span>•</span>
                  <span className="text-xs text-content-muted">{activeUser.municipality}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-content">
                <Mail className="w-4 h-4 text-content-muted" />
                <span className="font-semibold">{activeUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-content">
                <Phone className="w-4 h-4 text-content-muted" />
                <span>{activeUser.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-content">
                <MapPin className="w-4 h-4 text-content-muted" />
                <span>{activeUser.municipality}</span>
              </div>
              <div className="flex items-center gap-2 text-content">
                <Calendar className="w-4 h-4 text-content-muted" />
                <span>Joined on {activeUser.joinedDate} (Active {activeUser.lastActive || 'recently'})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-border bg-surface flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-content block">Account Status</span>
                <span className="text-[11px] text-content-muted block">Change account access status</span>
              </div>
              <div className="flex items-center gap-1.5">
                {(['Active', 'Inactive', 'Suspended'] as AdminUserStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleToggleStatus(activeUser.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeUser.status === st
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-muted hover:bg-muted/80 text-content-secondary'
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
              onClick={() => setActiveUser(null)}
              className="rounded-xl"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </AdminLayout>
  );
};
