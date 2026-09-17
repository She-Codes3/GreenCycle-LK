import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  UserCheck,
  UserX,
  Eye,
  Shield,
  RotateCcw,
  CheckCircle2,
  Users,
  X,
  UserMinus,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { AdminUser } from '../types/admin';
import { useAdminData } from '../data/adminStore';
import { SuspendUserModal } from '../components/SuspendUserModal';
import { RestoreUserModal } from '../components/RestoreUserModal';
import { UserDetailModal } from '../components/UserDetailModal';

interface FeedbackToast {
  type: 'suspend' | 'restore' | 'activate';
  title: string;
  message: string;
}

export const AdminUsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, userStats, suspendUser, restoreUser, activateUser } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [activeUser, setActiveUser] = useState<AdminUser | null>(null);
  const [userToSuspend, setUserToSuspend] = useState<AdminUser | null>(null);
  const [userToRestore, setUserToRestore] = useState<AdminUser | null>(null);

  // Success feedback notification toast
  const [feedback, setFeedback] = useState<FeedbackToast | null>(null);

  // Read URL query params on mount or URL change
  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam && ['Active', 'Inactive', 'Suspended'].includes(statusParam)) {
      setSelectedStatus(statusParam);
      setCurrentPage(1);
    }
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchTerm(queryParam);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Dismiss feedback automatically after 5 seconds
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  // Keep active modal user in sync with users state
  useEffect(() => {
    if (activeUser) {
      const refreshed = users.find((u) => u.id === activeUser.id);
      if (refreshed) setActiveUser(refreshed);
    }
  }, [users, activeUser]);

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

  // Handle suspending a user
  const handleConfirmSuspend = (userId: string, reason: string, note: string) => {
    const suspended = suspendUser(userId, reason, note);
    setUserToSuspend(null);
    if (suspended) {
      setFeedback({
        type: 'suspend',
        title: 'User Suspended',
        message: `${suspended.name} has been suspended successfully.`,
      });
    }
  };

  // Handle restoring a user
  const handleConfirmRestore = (userId: string) => {
    const restored = restoreUser(userId);
    setUserToRestore(null);
    if (restored) {
      setFeedback({
        type: 'restore',
        title: 'User Restored',
        message: `${restored.name}'s account is active again.`,
      });
    }
  };

  // Handle activating an inactive user
  const handleActivateUser = (user: AdminUser) => {
    const activated = activateUser(user.id);
    if (activated) {
      setFeedback({
        type: 'activate',
        title: 'User Activated',
        message: `${activated.name}'s account is now active.`,
      });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedMunicipality('all');
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleStatusTabClick = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    if (status === 'all') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('status');
      setSearchParams(nextParams);
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), status });
    }
  };

  // Distinct municipalities for dropdown
  const municipalitiesList = Array.from(new Set(users.map((u) => u.municipality)));

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
              Manage citizen accounts, municipal users, certified collectors, and platform administrators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-content-secondary bg-surface px-3.5 py-2 rounded-xl border border-border shadow-xs">
              Total: <strong>{userStats.total}</strong> registered
            </span>
          </div>
        </div>

        {/* 1. Suspended Users Summary Metrics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Total Users */}
          <button
            type="button"
            onClick={() => handleStatusTabClick('all')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              selectedStatus === 'all'
                ? 'bg-primary/5 border-primary shadow-sm'
                : 'bg-surface border-border hover:border-border-strong shadow-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-content-secondary group-hover:text-primary transition-colors">
                Total Users
              </span>
              <div className="w-7 h-7 rounded-lg bg-muted text-content-secondary flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-content tracking-tight">
              {userStats.total}
            </div>
            <span className="text-[11px] text-content-muted mt-1 block">
              All registered platform profiles
            </span>
          </button>

          {/* Card 2: Active Users */}
          <button
            type="button"
            onClick={() => handleStatusTabClick('Active')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              selectedStatus === 'Active'
                ? 'bg-emerald-500/10 border-emerald-500 shadow-sm'
                : 'bg-surface border-border hover:border-emerald-300 shadow-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-content-secondary group-hover:text-emerald-700 transition-colors">
                Active
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-700 tracking-tight">
              {userStats.active}
            </div>
            <span className="text-[11px] text-emerald-600/80 mt-1 block">
              Standard platform access
            </span>
          </button>

          {/* Card 3: Suspended Users */}
          <button
            type="button"
            onClick={() => handleStatusTabClick('Suspended')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              selectedStatus === 'Suspended'
                ? 'bg-red-500/10 border-red-500 shadow-sm'
                : 'bg-surface border-border hover:border-red-300 shadow-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-content-secondary group-hover:text-red-700 transition-colors">
                Suspended
              </span>
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center justify-center">
                <UserX className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-red-600 tracking-tight">
              {userStats.suspended}
            </div>
            <span className="text-[11px] text-red-600/80 mt-1 block">
              Disciplinary & security holds
            </span>
          </button>

          {/* Card 4: Inactive Users */}
          <button
            type="button"
            onClick={() => handleStatusTabClick('Inactive')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer ${
              selectedStatus === 'Inactive'
                ? 'bg-slate-500/10 border-slate-500 shadow-sm'
                : 'bg-surface border-border hover:border-slate-300 shadow-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-content-secondary group-hover:text-slate-700 transition-colors">
                Inactive
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center">
                <UserMinus className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-700 tracking-tight">
              {userStats.inactive}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Dormant / pending activation
            </span>
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {feedback && (
          <div
            role="alert"
            className={`p-4 rounded-2xl border text-xs font-medium flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-card ${
              feedback.type === 'suspend'
                ? 'bg-red-50 border-red-200 text-red-900'
                : feedback.type === 'restore'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  feedback.type === 'suspend'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                {feedback.type === 'suspend' ? (
                  <UserX className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="font-bold text-sm block">{feedback.title}</span>
                <p className="text-xs opacity-90 mt-0.5">{feedback.message}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFeedback(null)}
              aria-label="Dismiss message"
              className="p-1 rounded-lg hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

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
              placeholder="Search users by name, email, council..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Quick Status Pills */}
            <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/80">
              <button
                type="button"
                onClick={() => handleStatusTabClick('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-surface text-content shadow-xs'
                    : 'text-content-secondary hover:text-content'
                }`}
              >
                All ({userStats.total})
              </button>
              <button
                type="button"
                onClick={() => handleStatusTabClick('Active')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedStatus === 'Active'
                    ? 'bg-surface text-emerald-800 shadow-xs'
                    : 'text-content-secondary hover:text-emerald-700'
                }`}
              >
                Active ({userStats.active})
              </button>
              <button
                type="button"
                onClick={() => handleStatusTabClick('Suspended')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedStatus === 'Suspended'
                    ? 'bg-surface text-red-800 shadow-xs'
                    : 'text-content-secondary hover:text-red-700'
                }`}
              >
                Suspended ({userStats.suspended})
              </button>
            </div>

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
              <option value="Municipal User">Municipal User</option>
              <option value="Collector">Collector</option>
              <option value="System Admin">System Admin</option>
            </select>

            {/* Status Dropdown Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusTabClick(e.target.value)}
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

            {(searchTerm ||
              selectedRole !== 'all' ||
              selectedStatus !== 'all' ||
              selectedMunicipality !== 'all') && (
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
                No users matched your search criteria. Try modifying your status or role filters.
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

                    const isSuspended = user.status === 'Suspended';
                    const isActive = user.status === 'Active';
                    const isSystemAdmin = user.role === 'System Admin';

                    return (
                      <tr
                        key={user.id}
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => setActiveUser(user)}
                      >
                        {/* User Identity Column */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
                                isSuspended
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-primary/10 text-primary border-primary/20'
                              }`}
                            >
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-content group-hover:text-primary transition-colors block truncate">
                                  {user.name}
                                </span>
                              </div>
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
                                : user.role === 'Municipal User'
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

                        {/* Actions Column */}
                        <td
                          className="py-3.5 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Action */}
                            <Tooltip content="View details" placement="top">
                              <button
                                type="button"
                                onClick={() => setActiveUser(user)}
                                aria-label={`View details for ${user.name}`}
                                className="p-1.5 rounded-lg text-content-secondary hover:text-primary hover:bg-muted transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </Tooltip>

                            {/* Contextual Status Action */}
                            {isActive ? (
                              isSystemAdmin ? (
                                <Tooltip
                                  content="System Admin accounts cannot be suspended"
                                  placement="top"
                                >
                                  <span className="p-1.5 rounded-lg text-content-muted/40 cursor-not-allowed">
                                    <UserX className="w-4 h-4" />
                                  </span>
                                </Tooltip>
                              ) : (
                                <Tooltip content="Suspend User" placement="top">
                                  <button
                                    type="button"
                                    onClick={() => setUserToSuspend(user)}
                                    aria-label={`Suspend user ${user.name}`}
                                    className="p-1.5 rounded-lg text-content-secondary hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  >
                                    <UserX className="w-4 h-4" />
                                  </button>
                                </Tooltip>
                              )
                            ) : isSuspended ? (
                              <Tooltip content="Restore User" placement="top">
                                <button
                                  type="button"
                                  onClick={() => setUserToRestore(user)}
                                  aria-label={`Restore user ${user.name}`}
                                  className="p-1.5 rounded-lg text-content-secondary hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </button>
                              </Tooltip>
                            ) : (
                              <Tooltip content="Activate User" placement="top">
                                <button
                                  type="button"
                                  onClick={() => handleActivateUser(user)}
                                  aria-label={`Activate user ${user.name}`}
                                  className="p-1.5 rounded-lg text-content-secondary hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </button>
                              </Tooltip>
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
      <UserDetailModal
        user={activeUser}
        isOpen={Boolean(activeUser)}
        onClose={() => setActiveUser(null)}
        onRequestSuspend={(u) => setUserToSuspend(u)}
        onRequestRestore={(u) => setUserToRestore(u)}
      />

      {/* Suspend Confirmation Modal */}
      <SuspendUserModal
        user={userToSuspend}
        isOpen={Boolean(userToSuspend)}
        onClose={() => setUserToSuspend(null)}
        onConfirm={handleConfirmSuspend}
      />

      {/* Restore Confirmation Modal */}
      <RestoreUserModal
        user={userToRestore}
        isOpen={Boolean(userToRestore)}
        onClose={() => setUserToRestore(null)}
        onConfirm={handleConfirmRestore}
      />
    </AdminLayout>
  );
};
