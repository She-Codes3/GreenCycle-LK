import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
  History,
} from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AdminUser } from '../types/admin';

export interface UserDetailModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSuspend?: (user: AdminUser) => void;
  onRequestRestore?: (user: AdminUser) => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  isOpen,
  onClose,
  onRequestSuspend,
  onRequestRestore,
}) => {
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isSuspended = user.status === 'Suspended';
  const isSystemAdmin = user.role === 'System Admin';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`User Profile — ${user.name}`}
      description={`ID: ${user.id} • Registered Platform Account`}
      size="md"
    >
      <div className="space-y-4">
        {/* User Identity Header Card */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-muted/40 border border-border">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white text-base font-black flex items-center justify-center shrink-0 shadow-sm">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-sm text-content truncate">{user.name}</h4>
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
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-content-secondary flex-wrap">
              <span className="inline-flex items-center gap-1 font-medium">
                <Shield className="w-3 h-3 text-primary" />
                {user.role}
              </span>
              <span>•</span>
              <span className="text-content-muted">{user.municipality}</span>
            </div>
          </div>
        </div>

        {/* Contact & Platform Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-surface border border-border text-xs">
          <div className="flex items-center gap-2 text-content min-w-0">
            <Mail className="w-4 h-4 text-content-muted shrink-0" />
            <span className="truncate font-semibold">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-content min-w-0">
            <Phone className="w-4 h-4 text-content-muted shrink-0" />
            <span className="truncate">{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-content min-w-0">
            <MapPin className="w-4 h-4 text-content-muted shrink-0" />
            <span className="truncate">{user.municipality}</span>
          </div>
          <div className="flex items-center gap-2 text-content min-w-0">
            <Calendar className="w-4 h-4 text-content-muted shrink-0" />
            <span className="truncate font-mono text-[11px]">
              Joined: {user.joinedDate}
            </span>
          </div>
        </div>

        {/* Dedicated Suspension Information Section (Visible if user is suspended or has suspension details) */}
        {isSuspended && user.suspension && (
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-red-200/80">
              <div className="flex items-center gap-1.5 text-red-700">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h5 className="font-bold text-xs uppercase tracking-wider">
                  Suspension Information
                </h5>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                Status: Suspended
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-red-900/70 uppercase block">
                  Reason
                </span>
                <span className="font-bold text-red-950 text-sm block mt-0.5">
                  {user.suspension.reason}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-red-900/70 uppercase block">
                  Suspended By
                </span>
                <span className="font-semibold text-red-950 block mt-0.5">
                  {user.suspension.suspendedBy}
                </span>
                <span className="text-[11px] text-red-700 block">
                  {user.suspension.suspendedByRole || 'System Administrator'}
                </span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] font-bold text-red-900/70 uppercase block">
                  Suspended On
                </span>
                <span className="font-mono text-[11px] text-red-900 block mt-0.5">
                  {user.suspension.suspendedAt}
                </span>
              </div>

              <div className="sm:col-span-2 bg-white/80 p-3 rounded-lg border border-red-200">
                <span className="text-[10px] font-bold text-content-secondary uppercase block mb-1">
                  Admin Note
                </span>
                <p className="text-xs text-content leading-relaxed whitespace-pre-wrap">
                  {user.suspension.note}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Account Activity / History Section */}
        <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/80">
            <div className="flex items-center gap-1.5 text-content">
              <History className="w-4 h-4 text-primary" />
              <h5 className="font-bold text-xs uppercase tracking-wider">
                Account Activity
              </h5>
            </div>
            <span className="text-[10px] text-content-muted">Audit Record</span>
          </div>

          <div className="space-y-3">
            {user.history && user.history.length > 0 ? (
              user.history.map((record, index) => (
                <div
                  key={record.id || index}
                  className="flex items-start gap-2.5 text-xs pl-1 border-l-2 border-border/80 relative"
                >
                  <span
                    className={`w-2 h-2 rounded-full absolute -left-[5px] top-1.5 ${
                      record.action === 'Suspended'
                        ? 'bg-red-500 ring-2 ring-red-100'
                        : record.action === 'Restored' || record.action === 'Activated'
                        ? 'bg-emerald-500 ring-2 ring-emerald-100'
                        : 'bg-primary ring-2 ring-primary/20'
                    }`}
                  />
                  <div className="flex-1 min-w-0 ml-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-content">
                        {record.action === 'Suspended'
                          ? 'Account suspended'
                          : record.action === 'Restored'
                          ? 'Account restored'
                          : record.action === 'Activated'
                          ? 'Account status changed to Active'
                          : 'Account created'}
                      </span>
                      <span className="text-[10px] text-content-muted font-mono shrink-0">
                        {record.date}
                      </span>
                    </div>

                    {record.reason && (
                      <p className="text-[11px] text-content-secondary mt-0.5">
                        <strong className="font-semibold text-content">Reason:</strong>{' '}
                        {record.reason}
                      </p>
                    )}

                    {record.performedBy && (
                      <p className="text-[10px] text-content-muted mt-0.5">
                        By: {record.performedBy}
                        {record.performedByRole && ` (${record.performedByRole})`}
                      </p>
                    )}

                    {record.note && (
                      <p className="text-[11px] text-content-muted italic bg-muted/50 p-1.5 rounded mt-1">
                        &quot;{record.note}&quot;
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-content-muted py-2 text-center">
                Joined on {user.joinedDate}. No recent disciplinary actions recorded.
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalFooter className="flex items-center justify-between gap-3">
        <div>
          {isSuspended && onRequestRestore && (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                onClose();
                onRequestRestore(user);
              }}
              className="rounded-xl text-xs h-9 px-4 font-bold bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 hover:border-emerald-700 transition-all shadow-sm"
            >
              Restore User
            </Button>
          )}

          {!isSuspended && !isSystemAdmin && onRequestSuspend && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                onClose();
                onRequestSuspend(user);
              }}
              className="rounded-xl text-xs h-9 px-4 font-bold text-red-600 border border-red-300 hover:bg-red-50 hover:border-red-400 transition-all"
            >
              Suspend User
            </Button>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="rounded-xl text-xs h-9 px-4 font-semibold border-border hover:border-border-strong text-content-secondary hover:text-content hover:bg-muted"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
