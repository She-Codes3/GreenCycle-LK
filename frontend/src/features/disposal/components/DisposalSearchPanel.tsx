import React from 'react';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { DisposalFilterState, WasteCategoryType } from '../types/disposal';

export interface DisposalSearchPanelProps {
  filters: DisposalFilterState;
  onFilterChange: (updated: Partial<DisposalFilterState>) => void;
  onResetFilters: () => void;
  className?: string;
}

const ALL_CATEGORIES: WasteCategoryType[] = [
  'Organic',
  'Paper',
  'Plastic',
  'Glass',
  'Metal',
  'E-Waste',
  'Hazardous',
  'Bulky',
  'General Residual',
];

export const DisposalSearchPanel: React.FC<DisposalSearchPanelProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  className,
}) => {
  const isAllSelected = filters.acceptedItems.length === ALL_CATEGORIES.length;

  const handleToggleCategory = (cat: WasteCategoryType) => {
    if (filters.acceptedItems.includes(cat)) {
      onFilterChange({
        acceptedItems: filters.acceptedItems.filter((item) => item !== cat),
      });
    } else {
      onFilterChange({
        acceptedItems: [...filters.acceptedItems, cat],
      });
    }
  };

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      onFilterChange({ acceptedItems: [] });
    } else {
      onFilterChange({ acceptedItems: [...ALL_CATEGORIES] });
    }
  };

  return (
    <aside
      className={`bg-surface border border-border rounded-2xl p-4 shadow-card flex flex-col gap-3.5 ${
        className || ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-border/60">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <h2 className="font-bold text-base text-content">Filter Centers</h2>
        </div>
        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          9 Categories
        </span>
      </div>

      {/* 1. Search Keywords */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-content-secondary uppercase tracking-wider block">
          Search Keywords
        </label>
        <SearchInput
          placeholder="Center name, street, waste type..."
          value={filters.keyword}
          onChange={(e) => onFilterChange({ keyword: e.target.value })}
          onClear={() => onFilterChange({ keyword: '' })}
          className="w-full"
        />
      </div>

      {/* 2. Waste Stream Group */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-content-secondary uppercase tracking-wider block">
          Waste Stream Group
        </label>
        <Select
          value={filters.streamGroup}
          onChange={(e) => onFilterChange({ streamGroup: e.target.value })}
          options={[
            { label: 'All Waste Streams', value: 'all' },
            { label: 'Municipal Recyclables', value: 'recycling' },
            { label: 'Organic & Food Compost', value: 'organic' },
            { label: 'Hazardous & E-Waste', value: 'hazardous' },
            { label: 'Bulky & Large Items', value: 'bulky' },
          ]}
          className="w-full"
        />
      </div>

      {/* 3. Accepted Items (2-column grid) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-content-secondary uppercase tracking-wider">
            Accepted Items
          </label>
          <button
            type="button"
            onClick={handleToggleSelectAll}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            {isAllSelected ? 'Deselect all' : 'Select all'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-1">
          {ALL_CATEGORIES.map((cat) => (
            <Checkbox
              key={cat}
              label={cat}
              checked={filters.acceptedItems.includes(cat)}
              onChange={() => handleToggleCategory(cat)}
              className="text-xs"
            />
          ))}
        </div>
      </div>

      {/* 4. Open Now Only Switch */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-content block">Open Now Only</span>
          <span className="text-xs text-content-muted block">
            Active operating municipal hours
          </span>
        </div>
        <Switch
          checked={filters.openNowOnly}
          onChange={(checked) => onFilterChange({ openNowOnly: checked })}
          aria-label="Filter centers open now only"
        />
      </div>

      {/* 5. Distance Radius */}
      <div className="pt-2 border-t border-border/60 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-content-secondary uppercase tracking-wider">
            Distance Radius
          </span>
          <span className="text-sm font-bold text-content">
            {filters.distanceRadius} km
          </span>
        </div>

        <input
          type="range"
          min={5}
          max={50}
          step={5}
          value={filters.distanceRadius}
          onChange={(e) => onFilterChange({ distanceRadius: Number(e.target.value) })}
          className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
          aria-label="Distance Radius Slider"
        />

        <div className="flex items-center justify-between text-[11px] text-content-muted font-medium">
          <span>0 km</span>
          <span>25 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* 6. Clear Filters Action */}
      <div className="pt-2">
        <Button
          variant="secondary"
          fullWidth
          onClick={onResetFilters}
          className="bg-muted hover:bg-muted/80 text-content border border-border rounded-xl font-medium shadow-none"
          leftIcon={
            <svg
              className="w-4 h-4 text-content-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          }
        >
          Clear Filters
        </Button>
      </div>
    </aside>
  );
};
