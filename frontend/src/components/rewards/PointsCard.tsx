import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface PointsCardProps {
  points: number;
  tierName?: string;
  tierBadge?: string;
  expiringPoints?: {
    amount: number;
    date: string;
  };
  onRedeem?: () => void;
  onHistory?: () => void;
  className?: string;
}

export const PointsCard: React.FC<PointsCardProps> = ({
  points,
  tierName = 'Eco Guardian',
  tierBadge = '🌿',
  expiringPoints,
  onRedeem,
  onHistory,
  className,
}) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-primary via-[#114532] to-primary-dark text-white border-primary shadow-elevated p-6 flex flex-col justify-between',
        className
      )}
    >
      {/* Decorative eco leaf motif in background */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-secondary/10 pointer-events-none" />
      <div className="absolute -right-2 -bottom-2 text-8xl opacity-10 select-none pointer-events-none">
        🌱
      </div>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold">
            <span>{tierBadge}</span>
            <span>{tierName}</span>
          </div>

          {onHistory && (
            <button
              type="button"
              onClick={onHistory}
              className="text-xs text-secondary-light hover:text-white underline underline-offset-2 transition-colors"
            >
              Points History
            </button>
          )}
        </div>

        {/* Balance */}
        <div className="my-2">
          <span className="text-xs font-medium uppercase tracking-wider text-secondary-light/80 block">
            Available GreenPoints
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {points.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-secondary-light">pts</span>
          </div>
        </div>

        {expiringPoints && (
          <p className="text-xs text-amber-200 mt-2 flex items-center gap-1.5">
            <span>⏳</span>
            <span>
              {expiringPoints.amount} pts expire on {expiringPoints.date}
            </span>
          </p>
        )}
      </div>

      {/* Action CTA */}
      <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/15">
        {onRedeem && (
          <Button
            variant="secondary"
            onClick={onRedeem}
            className="border-none bg-secondary hover:bg-secondary-dark text-white font-semibold flex-1 shadow-sm"
          >
            Redeem Eco Rewards
          </Button>
        )}
      </div>
    </Card>
  );
};
