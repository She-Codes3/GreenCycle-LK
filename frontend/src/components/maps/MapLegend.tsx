import React, { useState } from 'react';
import { cn } from '../ui/utils';

export interface LegendItem {
  color: string;
  label: string;
  symbol?: string;
}

export interface MapLegendProps {
  title?: string;
  items?: LegendItem[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}

const defaultItems: LegendItem[] = [
  { color: '#134e39', label: 'Collection Truck', symbol: '🚛' },
  { color: '#10b981', label: 'Recycling Facility', symbol: '♻️' },
  { color: '#15803d', label: 'Organic Compost Site', symbol: '🌿' },
  { color: '#ea580c', label: 'Plastic Drop-off', symbol: '🥤' },
  { color: '#dc2626', label: 'Hazardous / E-Waste', symbol: '⚠️' },
];

const positionClasses = {
  'top-right': 'top-4 right-16',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-6 right-4',
  'bottom-left': 'bottom-6 left-4',
};

export const MapLegend: React.FC<MapLegendProps> = ({
  title = 'Map Legend',
  items = defaultItems,
  position = 'bottom-left',
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'absolute z-[1000] rounded-xl border border-border bg-surface/95 backdrop-blur shadow-card p-3 font-sans transition-all text-content max-w-xs',
        positionClasses[position],
        className
      )}
    >
      <div
        className="flex items-center justify-between gap-3 cursor-pointer select-none"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <span className="text-xs font-bold uppercase tracking-wider text-content">{title}</span>
        <button
          type="button"
          aria-label={isCollapsed ? 'Expand legend' : 'Collapse legend'}
          className="text-content-muted hover:text-content text-xs p-0.5"
        >
          {isCollapsed ? '▲' : '▼'}
        </button>
      </div>

      {!isCollapsed && (
        <ul className="mt-2.5 space-y-1.5 text-xs">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center text-[9px] text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.symbol || '•'}
              </span>
              <span className="text-content-secondary leading-tight">{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
