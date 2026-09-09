import React from 'react';
import { cn } from '../ui/utils';
import { InteractiveCard } from '../ui/InteractiveCard';
import { Button } from '../ui/Button';
import { WasteCategoryBadge } from '../waste/WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface DisposalCenterCardProps {
  id: string;
  name: string;
  type: string;
  address: string;
  distanceKm?: number;
  openingHours: string;
  isOpenNow?: boolean;
  acceptedWaste: (WasteCategory | string)[];
  onDirections?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const DisposalCenterCard: React.FC<DisposalCenterCardProps> = ({
  name,
  type,
  address,
  distanceKm,
  openingHours,
  isOpenNow = true,
  acceptedWaste,
  onDirections,
  onViewDetails,
  className,
}) => {
  return (
    <InteractiveCard
      onClick={onViewDetails}
      className={cn('flex flex-col justify-between gap-4 p-5', className)}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
              {type} Facility
            </span>
            <h3 className="text-base font-bold text-content mt-0.5 leading-snug">{name}</h3>
          </div>
          {distanceKm !== undefined && (
            <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-light text-primary">
              {distanceKm.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Location & Hours */}
        <div className="space-y-1.5 my-3 text-xs text-content-secondary">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-content-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{address}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-content-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{openingHours}</span>
            <span
              className={cn(
                'ml-auto font-semibold px-1.5 py-0.2 rounded text-[10px]',
                isOpenNow ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
              )}
            >
              {isOpenNow ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Accepted Categories */}
        {acceptedWaste.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-[11px] font-semibold text-content-muted block mb-1.5">
              Accepted Materials
            </span>
            <div className="flex flex-wrap gap-1">
              {acceptedWaste.map((cat, idx) => (
                <WasteCategoryBadge key={idx} category={cat} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-primary font-semibold hover:underline">
          View details & schedule →
        </span>
        {onDirections && (
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onDirections();
            }}
            leftIcon={
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          >
            Directions
          </Button>
        )}
      </div>
    </InteractiveCard>
  );
};
