import React from 'react';
import { cn } from '../ui/utils';
import { InteractiveCard } from '../ui/InteractiveCard';
import { WasteCategoryBadge } from './WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface WasteItemCardProps {
  name: string;
  category: WasteCategory | string;
  imageUrl?: string;
  icon?: string;
  points?: number;
  preparationTip?: string;
  onClick?: () => void;
  className?: string;
}

export const WasteItemCard: React.FC<WasteItemCardProps> = ({
  name,
  category,
  imageUrl,
  icon = '📦',
  points,
  preparationTip,
  onClick,
  className,
}) => {
  return (
    <InteractiveCard
      onClick={onClick}
      padding="none"
      className={cn('overflow-hidden flex flex-col', className)}
    >
      {/* Header Visual */}
      <div className="relative h-32 w-full bg-muted flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl select-none">{icon}</span>
        )}
        <div className="absolute top-2.5 left-2.5">
          <WasteCategoryBadge category={category} size="sm" />
        </div>
        {points !== undefined && (
          <div className="absolute top-2.5 right-2.5 bg-primary/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            +{points} pts
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h4 className="font-bold text-sm text-content mb-1">{name}</h4>
          {preparationTip && (
            <p className="text-xs text-content-secondary line-clamp-2">
              <span className="font-semibold text-primary">Tip:</span> {preparationTip}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-[11px] text-content-muted">
          <span>Sort & segregate</span>
          <span className="text-primary font-semibold">View details</span>
        </div>
      </div>
    </InteractiveCard>
  );
};
