import React from 'react';
import { cn } from '../ui/utils';
import { Card } from '../ui/Card';

export interface LevelProgressProps {
  currentLevel: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  perks?: string[];
  className?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  levelTitle,
  currentXp,
  nextLevelXp,
  perks,
  className,
}) => {
  const percent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));
  const remaining = Math.max(0, nextLevelXp - currentXp);

  return (
    <Card className={cn('flex flex-col gap-4 p-5', className)}>
      {/* Level Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex flex-col items-center justify-center font-bold shadow-sm">
            <span className="text-[10px] uppercase font-medium text-secondary-light">LVL</span>
            <span className="text-base leading-none">{currentLevel}</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-content">{levelTitle}</h3>
            <p className="text-xs text-content-muted">
              {remaining > 0
                ? `${remaining} XP needed for Level ${currentLevel + 1}`
                : 'Maximum tier achieved!'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary-light">
          {percent}% XP
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-muted overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-content-muted">
          <span>{currentXp} XP</span>
          <span>{nextLevelXp} XP</span>
        </div>
      </div>

      {/* Level Perks */}
      {perks && perks.length > 0 && (
        <div className="pt-3 border-t border-border">
          <span className="text-[11px] font-semibold text-content-muted uppercase tracking-wider block mb-2">
            Level {currentLevel} Member Perks
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-content-secondary">
            {perks.map((perk, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-secondary font-bold">★</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
