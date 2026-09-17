import React, { useState, useEffect } from 'react';
import { AlertTriangle, UserX, Shield, MapPin, AlertCircle } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AdminUser } from '../types/admin';
import { SUSPENSION_REASONS } from '../data/adminStore';

export interface SuspendUserModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string, reason: string, note: string) => void;
}

const MAX_NOTE_LENGTH = 500;

export const SuspendUserModal: React.FC<SuspendUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalNote, setAdditionalNote] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  // Reset form whenever user changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedReason('');
      setAdditionalNote('');
      setIsTouched(false);
    }
  }, [isOpen, user]);

  if (!user) return null;

  const isNoteValid = additionalNote.trim().length > 0;
  const isReasonValid = selectedReason.trim().length > 0;
  const isFormValid = isReasonValid && isNoteValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    if (!isFormValid) return;
    onConfirm(user.id, selectedReason, additionalNote.trim());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5 text-red-600">
          <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center shrink-0">
            <UserX className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-content">Suspend User</span>
        </div>
      }
      description="Restrict platform access and record administrative suspension context."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm font-semibold text-content">
          Are you sure you want to suspend this user?
        </p>

        {/* User Identity Preview Card */}
        <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted block">
                User
              </span>
              <span className="font-bold text-content text-sm block truncate">
                {user.name}
              </span>
              <span className="text-[11px] text-content-muted block truncate">
                {user.email}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted block">
                Role
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-content mt-0.5">
                <Shield className="w-3 h-3 text-primary" />
                {user.role}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-content-muted block">
                Municipality
              </span>
              <span className="inline-flex items-center gap-1 text-content font-medium mt-0.5 truncate max-w-full">
                <MapPin className="w-3 h-3 text-content-muted shrink-0" />
                <span className="truncate">{user.municipality}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/70 my-2" />

        {/* Reason for Suspension */}
        <div className="space-y-1.5">
          <label
            htmlFor="suspension-reason"
            className="block text-xs font-bold text-content"
          >
            Reason for Suspension <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="suspension-reason"
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
                setIsTouched(true);
              }}
              className={`w-full bg-surface border rounded-xl px-3.5 py-2.5 text-xs text-content font-medium outline-none transition-all cursor-pointer ${
                isTouched && !isReasonValid
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
              }`}
            >
              <option value="" disabled>
                Select a reason
              </option>
              {SUSPENSION_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          {isTouched && !isReasonValid && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3 h-3" />
              Please select a reason for this suspension.
            </p>
          )}
        </div>

        {/* Additional Note */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="suspension-note"
              className="block text-xs font-bold text-content"
            >
              Additional Note <span className="text-red-500">*</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                additionalNote.length >= MAX_NOTE_LENGTH
                  ? 'text-red-600 font-bold'
                  : 'text-content-muted'
              }`}
            >
              {additionalNote.length} / {MAX_NOTE_LENGTH} characters
            </span>
          </div>
          <textarea
            id="suspension-note"
            rows={3}
            maxLength={MAX_NOTE_LENGTH}
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            placeholder="Explain why this account is being suspended..."
            className={`w-full bg-surface border rounded-xl p-3 text-xs text-content outline-none transition-all resize-none ${
              isTouched && !isNoteValid
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
            }`}
          />
          {isTouched && !isNoteValid && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" />
              Please provide an additional administrative note.
            </p>
          )}
        </div>

        {/* Informational Warning Banner */}
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Account Status Change</span>
            <p className="text-[11px] text-red-700/90 mt-0.5">
              This action will change the user&apos;s account status to <strong>Suspended</strong>. The user will be blocked from logging in until restored by a System Administrator.
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
            type="submit"
            size="sm"
            disabled={!isFormValid}
            className={`w-full sm:w-auto rounded-xl text-xs h-9 px-4 font-bold transition-all shadow-sm ${
              isFormValid
                ? 'bg-red-600 hover:bg-red-700 text-white border border-red-600'
                : 'bg-muted text-content-muted border-border cursor-not-allowed opacity-60'
            }`}
          >
            Suspend User
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
