import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CollectionStatus } from './CollectionStatus';
import { CollectionTypeBadge } from './CollectionTypeBadge';
import { WasteCategoryBadge } from '../waste/WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface CollectionCardProps {
  id: string;
  date: string;
  timeWindow: string;
  area: string;
  type: string;
  status: string;
  wasteCategories: (WasteCategory | string)[];
  truckNumber?: string;
  onTrack?: () => void;
  onDetails?: () => void;
  className?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  id,
  date,
  timeWindow,
  area,
  type,
  status,
  wasteCategories,
  truckNumber,
  onTrack,
  onDetails,
  className,
}) => {
  return (
    <Card className={cn('flex flex-col justify-between gap-4', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <CollectionTypeBadge type={type} size="sm" />
          <span className="text-xs text-content-muted">#{id}</span>
        </div>
        <CollectionStatus status={status} size="sm" />
      </div>

      {/* Main Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-content font-bold text-base">
          <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-content-secondary">
            {timeWindow}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-content-secondary">
          <svg className="w-4 h-4 text-content-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span>{area}</span>
          {truckNumber && (
            <span className="ml-auto text-content-muted font-mono">Truck: {truckNumber}</span>
          )}
        </div>

        {/* Accepted Waste Types */}
        {wasteCategories.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-content-muted uppercase tracking-wider block mb-1.5">
              Accepted Waste
            </span>
            <div className="flex flex-wrap gap-1.5">
              {wasteCategories.map((cat, idx) => (
                <WasteCategoryBadge key={idx} category={cat} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
        {onDetails && (
          <Button variant="secondary" size="sm" onClick={onDetails}>
            Schedule Details
          </Button>
        )}
        {onTrack && (
          <Button
            variant="primary"
            size="sm"
            onClick={onTrack}
            leftIcon={
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          >
            Track Live Truck
          </Button>
        )}
      </div>
    </Card>
  );
};
