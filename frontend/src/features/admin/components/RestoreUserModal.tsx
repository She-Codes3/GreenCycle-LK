import React from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AdminUser } from '../types/admin';

export interface RestoreUserModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => void;
}

export const RestoreUserModal: React.FC<RestoreUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5 text-emerald-600">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-content">Restore User</span>
        </div>
      }
      description={`Reactivate account access for ${user.name}.`}
      size="md"
    >
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-content-secondary block">
            Restore access for:
          </span>
          <h4 className="text-base font-bold text-content mt-0.5">{user.name}</h4>
          <span className="text-xs text-content-muted font-mono">{user.email}</span>
        </div>

        {/* Existing Suspension Context Box */}
        <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-content-secondary font-medium">Current Status</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-800 border border-red-200">
              Suspended
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-content-secondary font-medium">Suspension Reason</span>
            <span className="font-bold text-content text-right">
              {user.suspension?.reason || 'Policy Violation'}
            </span>
          </div>

          {user.suspension?.suspendedAt && (
            <div className="flex items-center justify-between">
              <span className="text-content-secondary font-medium">Suspended On</span>
              <span className="text-content-muted text-right font-mono text-[11px]">
                {user.suspension.suspendedAt}
              </span>
            </div>
          )}

          {user.suspension?.suspendedBy && (
            <div className="flex items-center justify-between">
              <span className="text-content-secondary font-medium">Suspended By</span>
              <span className="text-content-muted text-right">
                {user.suspension.suspendedBy}
              </span>
            </div>
          )}
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Restore Confirmation</span>
            <p className="text-[11px] text-emerald-700/90 mt-0.5">
              Are you sure you want to restore this user&apos;s account? This will reactivate the account to <strong>Active</strong> status and grant immediate platform access. Previous suspension records will be retained in the audit history.
            </p>
          </div>
        </div>

        <ModalFooter className="px-0 pb-0 pt-3 bg-transparent border-t border-border/80 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl text-xs h-9 px-4 font-semibold border-border hover:border-border-strong text-content-secondary hover:text-content hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onConfirm(user.id)}
            className="w-full sm:w-auto rounded-xl text-xs h-9 px-4 font-bold bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 hover:border-emerald-700 transition-all shadow-sm"
          >
            Restore User
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};
