import React from 'react';
import { cn } from '../ui/utils';
import { InteractiveCard } from '../ui/InteractiveCard';
import { Button } from '../ui/Button';
import { WasteCategoryBadge } from '../waste/WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface DisposalCenterCardProps {
  id: string;
  name: string;
  type?: string;
  address: string;
  distanceKm?: number;
  openingHours: string;
  isOpenNow?: boolean;
  nextStatusText?: string;
  acceptedWaste: (WasteCategory | string)[];
  onDirections?: () => void;
  onViewDetails?: () => void;
  className?: string;
  isSelected?: boolean;
  variant?: 'default' | 'compact';
}

export const DisposalCenterCard: React.FC<DisposalCenterCardProps> = ({
  name,
  type = 'Disposal',
  address,
  distanceKm,
  openingHours,
  isOpenNow = true,
  nextStatusText,
  acceptedWaste,
  onDirections,
  onViewDetails,
  className,
  isSelected = false,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <InteractiveCard
        onClick={onViewDetails}
        className={cn(
          'p-4 bg-surface rounded-2xl border transition-all text-left relative overflow-hidden',
          isSelected
            ? 'border-border border-l-4 border-l-primary shadow-sm bg-surface'
            : 'border-border hover:border-border-strong bg-surface',
          className
        )}
      >
        {/* Top line: Status dot + OPEN / CLOSED · Opening Hours + Chevron */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'w-2 h-2 rounded-full shrink-0',
                isOpenNow ? 'bg-emerald-500' : 'bg-gray-400'
              )}
            />
            <span
              className={cn(
                'font-bold uppercase tracking-wide text-[11px]',
                isOpenNow ? 'text-emerald-700' : 'text-content-muted'
              )}
            >
              {isOpenNow ? 'OPEN' : 'CLOSED'}
            </span>
            <span className="text-content-muted">•</span>
            <span className="text-content-secondary font-medium">
              {isOpenNow ? openingHours : nextStatusText || openingHours}
            </span>
          </div>

          <span className="text-content-muted text-sm font-semibold">›</span>
        </div>

        {/* Center Name */}
        <h3 className="font-bold text-base text-content tracking-tight leading-snug mb-1">
          {name}
        </h3>

        {/* Distance and Location */}
        <div className="flex items-center gap-1.5 text-xs text-content-secondary mb-2.5">
          <svg
            className="w-3.5 h-3.5 text-secondary shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          {distanceKm !== undefined && (
            <span className="font-bold text-content">{distanceKm.toFixed(1)} km</span>
          )}
          <span className="text-content-muted">•</span>
          <span className="truncate">{address}</span>
        </div>

        {/* Accepted Waste Tags */}
        {acceptedWaste.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {acceptedWaste.map((tag, idx) => {
              const tagStr = String(tag);
              const isHazardOrEwaste = /e-waste|hazardous|batteries/i.test(tagStr);
              const isOrganic = /organic|compost/i.test(tagStr);
              return (
                <span
                  key={idx}
                  className={cn(
                    'text-[11px] px-2.5 py-0.5 rounded-full font-medium',
                    isHazardOrEwaste
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : isOrganic
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-muted text-content-secondary border border-border/80'
                  )}
                >
                  {tagStr}
                </span>
              );
            })}
          </div>
        )}
      </InteractiveCard>
    );
  }
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
