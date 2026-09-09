import React from 'react';
import { cn } from '../ui/utils';
import { WasteCategory } from '@/shared/types/common';

export interface WasteCategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: WasteCategory | string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

interface CategoryStyle {
  label: string;
  badgeClass: string;
  icon: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  ORGANIC: {
    label: 'Organic / Compost',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: '🌿',
  },
  PLASTIC: {
    label: 'Plastic',
    badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
    icon: '🥤',
  },
  PAPER: {
    label: 'Paper & Cardboard',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    icon: '📦',
  },
  GLASS: {
    label: 'Glass',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
    icon: '🍾',
  },
  METAL: {
    label: 'Metal & Cans',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: '🥫',
  },
  E_WASTE: {
    label: 'E-Waste',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: '🔋',
  },
  HAZARDOUS: {
    label: 'Hazardous',
    badgeClass: 'bg-red-50 text-red-800 border-red-200',
    icon: '⚠️',
  },
  OTHER: {
    label: 'General Waste',
    badgeClass: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '🗑️',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
};

export const WasteCategoryBadge: React.FC<WasteCategoryBadgeProps> = ({
  category,
  size = 'md',
  showIcon = true,
  className,
  ...props
}) => {
  const normKey = (category || 'OTHER').toUpperCase();
  const config = categoryStyles[normKey] || {
    label: category,
    badgeClass: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '♻️',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium select-none',
        config.badgeClass,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {showIcon && <span className="text-xs leading-none">{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
};
