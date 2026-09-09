import React from 'react';
import { cn } from '../ui/utils';

export type CollectionType = 'MUNICIPAL' | 'RECYCLING' | 'BULKY' | 'HAZARDOUS' | string;

export interface CollectionTypeBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: CollectionType;
  size?: 'sm' | 'md';
}

const typeMap: Record<string, { label: string; className: string; icon: string }> = {
  MUNICIPAL: {
    label: 'Municipal Routine',
    className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: '🚛',
  },
  RECYCLING: {
    label: 'Recyclables Only',
    className: 'bg-sky-50 text-sky-800 border-sky-200',
    icon: '♻️',
  },
  BULKY: {
    label: 'Bulky Waste',
    className: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: '🛋️',
  },
  HAZARDOUS: {
    label: 'Hazardous Collection',
    className: 'bg-red-50 text-red-800 border-red-200',
    icon: '⚠️',
  },
};

export const CollectionTypeBadge: React.FC<CollectionTypeBadgeProps> = ({
  type,
  size = 'md',
  className,
  ...props
}) => {
  const normKey = (type || 'MUNICIPAL').toUpperCase();
  const config = typeMap[normKey] || {
    label: type,
    className: 'bg-muted text-content-secondary border-border',
    icon: '📦',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium select-none',
        size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-2.5 py-1 gap-1.5',
        config.className,
        className
      )}
      {...props}
    >
      <span className="text-xs leading-none">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};
