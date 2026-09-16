import React from 'react';
import { DisposalCenterView, DisposalSortOption } from '../types/disposal';
import { DisposalCenterCard } from '@/components/disposal/DisposalCenterCard';
import { EmptyState } from '@/components/ui/EmptyState';

export interface DisposalResultsPanelProps {
  centers: DisposalCenterView[];
  selectedCenterId: string | null;
  onSelectCenter: (id: string) => void;
  onViewDetails: (center: DisposalCenterView) => void;
  sortBy: DisposalSortOption;
  onSortChange: (sort: DisposalSortOption) => void;
  onClearFilters: () => void;
  className?: string;
}

export const DisposalResultsPanel: React.FC<DisposalResultsPanelProps> = ({
  centers,
  selectedCenterId,
  onSelectCenter,
  onViewDetails,
  sortBy,
  onSortChange,
  onClearFilters,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-3.5 h-[680px] ${className || ''}`}>
      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline">
          <span className="font-bold text-base text-content">
            {centers.length} Centers
          </span>
          <span className="text-xs text-content-secondary ml-1.5 font-medium">
            in Colombo
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as DisposalSortOption)}
            aria-label="Sort disposal centers"
            className="text-xs font-semibold text-content bg-surface border border-border rounded-xl px-3 py-1.5 shadow-sm hover:border-secondary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value="nearest">Nearest First</option>
            <option value="name">Name (A–Z)</option>
            <option value="open">Open Now First</option>
          </select>
        </div>
      </div>

      {/* Cards List Container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {centers.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No Disposal Centers Found"
            description="Try adjusting your keywords, widening the distance radius, or clearing category filters."
            action={
              <button
                type="button"
                onClick={onClearFilters}
                className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-xl shadow-sm hover:bg-primary-dark transition-colors"
              >
                Reset All Filters
              </button>
            }
            className="py-12 bg-surface rounded-2xl border border-border shadow-card"
          />
        ) : (
          centers.map((center) => (
            <div
              key={center.id}
              onClick={() => onSelectCenter(center.id)}
              className="cursor-pointer"
            >
              <DisposalCenterCard
                id={center.id}
                name={center.name}
                type={center.type}
                address={center.address}
                distanceKm={center.distanceKm}
                openingHours={center.openingHoursDisplay}
                isOpenNow={center.isOpen}
                nextStatusText={center.nextStatusText}
                acceptedWaste={center.acceptedWasteTypes}
                isSelected={center.id === selectedCenterId}
                variant="compact"
                onViewDetails={() => onViewDetails(center)}
              />
            </div>
          ))
        )}
      </div>

      {/* Bottom Civic Demonstration Disclaimer */}
      <div className="bg-surface/80 border border-border/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-content-secondary mt-auto shadow-sm">
        <svg
          className="w-4 h-4 text-primary shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="leading-snug text-[11px]">
          Demonstration civic data for Colombo Municipal Council solid waste portal.
        </span>
      </div>
    </div>
  );
};
