import React from 'react';
import { cn } from '../ui/utils';
import { InteractiveCard } from '../ui/InteractiveCard';
import { WasteCategoryBadge } from './WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface WasteCategoryCardProps {
  category: WasteCategory | string;
  title: string;
  description: string;
  isRecyclable?: boolean;
  guidelines?: string[];
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const WasteCategoryCard: React.FC<WasteCategoryCardProps> = ({
  category,
  title,
  description,
  isRecyclable = true,
  guidelines,
  icon,
  onClick,
  className,
}) => {
  return (
    <InteractiveCard
      onClick={onClick}
      className={cn('flex flex-col justify-between h-full p-5', className)}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary text-2xl shadow-sm">
            {icon || '♻️'}
          </div>
          <WasteCategoryBadge category={category} size="sm" />
        </div>

        <h3 className="text-base font-bold text-content mb-1">{title}</h3>
        <p className="text-xs text-content-secondary leading-relaxed mb-3">{description}</p>

        {guidelines && guidelines.length > 0 && (
          <div className="border-t border-border pt-3 mt-3">
            <span className="text-[11px] font-semibold text-content-muted uppercase tracking-wider block mb-1.5">
              Handling Tips
            </span>
            <ul className="space-y-1">
              {guidelines.map((tip, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-content-secondary">
                  <span className="w-1 h-1 rounded-full bg-secondary shrink-0" />
                  <span className="truncate">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-xs">
        <span
          className={cn(
            'font-semibold inline-flex items-center gap-1',
            isRecyclable ? 'text-emerald-700' : 'text-amber-700'
          )}
        >
          {isRecyclable ? '✓ Recyclable in Sri Lanka' : '⚠️ Non-recyclable / Special'}
        </span>
        <span className="text-primary font-medium group-hover:underline">Explore →</span>
      </div>
    </InteractiveCard>
  );
};
