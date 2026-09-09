import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';

export interface AchievementCardProps {
  title: string;
  description: string;
  icon?: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: {
    current: number;
    total: number;
    unit?: string;
  };
  rewardPoints?: number;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon = '🏆',
  unlocked,
  unlockedDate,
  progress,
  rewardPoints,
  className,
}) => {
  const percent = progress
    ? Math.min(100, Math.round((progress.current / progress.total) * 100))
    : unlocked
    ? 100
    : 0;

  return (
    <Card
      className={cn(
        'flex flex-col justify-between p-5 transition-all',
        unlocked
          ? 'border-border bg-surface'
          : 'border-border/60 bg-muted/40 opacity-75',
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform',
              unlocked
                ? 'bg-primary-light text-primary'
                : 'bg-muted text-content-muted grayscale'
            )}
          >
            {icon}
          </div>

          <div className="flex flex-col items-end gap-1">
            {unlocked ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ Unlocked
              </span>
            ) : (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted text-content-muted border border-border">
                🔒 Locked
              </span>
            )}
            {rewardPoints && (
              <span className="text-[11px] font-bold text-primary">+{rewardPoints} pts</span>
            )}
          </div>
        </div>

        <h4 className="text-sm font-bold text-content leading-snug">{title}</h4>
        <p className="text-xs text-content-secondary mt-1 leading-relaxed">{description}</p>
      </div>

      <div className="pt-3 mt-3 border-t border-border">
        {progress && !unlocked && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-content-muted">
              <span>Progress</span>
              <span>
                {progress.current} / {progress.total} {progress.unit || ''} ({percent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        {unlocked && unlockedDate && (
          <span className="text-[11px] text-content-muted">Unlocked on {unlockedDate}</span>
        )}
      </div>
    </Card>
  );
};
