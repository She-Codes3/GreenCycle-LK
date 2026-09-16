import React from 'react';
import { cn } from './utils';

export type ProgressBarTone = 'primary' | 'info' | 'neutral' | 'warning' | 'danger';
export type ProgressBarSize = 'sm' | 'md';

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Completion percentage, clamped to the 0-100 range. */
  value: number;
  tone?: ProgressBarTone;
  size?: ProgressBarSize;
  /** Accessible name for the bar, announced alongside the percentage. */
  label?: string;
}

const toneClasses: Record<ProgressBarTone, string> = {
  primary: 'bg-emerald-600',
  info: 'bg-blue-500',
  neutral: 'bg-slate-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
};

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: 'h-2',
  md: 'h-3',
};

/** Displays a horizontal completion bar for a single measured value. */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  tone = 'primary',
  size = 'sm',
  label,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('w-full overflow-hidden rounded-full bg-muted', sizeClasses[size], className)}
      {...props}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-500', toneClasses[tone])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
