import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PickupStatus } from './PickupStatus';
import { WasteCategoryBadge } from '../waste/WasteCategoryBadge';
import { WasteCategory, PickupStatus as PickupStatusType } from '@/shared/types/common';

export interface PickupCardProps {
  id: string;
  address: string;
  scheduledDate: string;
  timeSlot: string;
  wasteCategories: (WasteCategory | string)[];
  status: PickupStatusType | string;
  estimatedWeightKg?: number;
  collectorName?: string;
  onCancel?: () => void;
  onReschedule?: () => void;
  onTrack?: () => void;
  className?: string;
}

export const PickupCard: React.FC<PickupCardProps> = ({
  id,
  address,
  scheduledDate,
  timeSlot,
  wasteCategories,
  status,
  estimatedWeightKg,
  collectorName,
  onCancel,
  onReschedule,
  onTrack,
  className,
}) => {
  const isCancellable = status === 'PENDING' || status === 'ASSIGNED';
  const isTrackable = status === 'IN_PROGRESS';

  return (
    <Card className={cn('flex flex-col justify-between gap-4', className)}>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-content font-mono">Request #{id}</span>
          {estimatedWeightKg && (
            <span className="text-xs text-content-secondary bg-muted px-2 py-0.5 rounded-full">
              ~{estimatedWeightKg} kg
            </span>
          )}
        </div>
        <PickupStatus status={status} size="sm" />
      </div>

      {/* Details */}
      <div className="space-y-2.5">
        <div className="flex items-start gap-2 text-sm text-content">
          <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="font-medium line-clamp-1">{address}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-content-secondary">
          <svg className="w-4 h-4 text-content-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{scheduledDate}</span>
          <span className="text-content-muted">•</span>
          <span>{timeSlot}</span>
        </div>

        {collectorName && (
          <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary-light/50 px-2.5 py-1.5 rounded-xl">
            <span>🚛 Collector: {collectorName}</span>
          </div>
        )}

        {/* Waste Types */}
        {wasteCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {wasteCategories.map((cat, idx) => (
              <WasteCategoryBadge key={idx} category={cat} size="sm" />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border flex-wrap">
        {onCancel && isCancellable && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-red-600 hover:bg-red-50">
            Cancel
          </Button>
        )}
        {onReschedule && isCancellable && (
          <Button variant="secondary" size="sm" onClick={onReschedule}>
            Reschedule
          </Button>
        )}
        {onTrack && isTrackable && (
          <Button
            variant="primary"
            size="sm"
            onClick={onTrack}
            leftIcon={
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
          >
            Track Collector
          </Button>
        )}
      </div>
    </Card>
  );
};
