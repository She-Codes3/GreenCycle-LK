import React from 'react';
import { cn } from '../ui/utils';
import { Skeleton } from '../ui/Skeleton';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  change?: {
    value: number | string;
    isPositive?: boolean;
    label?: string;
  };
  description?: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  change,
  description,
  loading = false,
  className,
  ...props
}) => {
  if (loading) {
    return (
      <div className={cn('ui-dashboard-surface flex flex-col gap-3', className)}>
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="circular" width={36} height={36} />
        </div>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="50%" height={12} />
      </div>
    );
  }

  return (
    <div className={cn('ui-dashboard-surface flex flex-col justify-between', className)} {...props}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-bold tracking-tight text-content">{value}</span>
        {unit && <span className="text-sm font-medium text-content-secondary">{unit}</span>}
      </div>

      {(change || description) && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-1 font-semibold rounded-md px-1.5 py-0.5',
                change.isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              )}
            >
              <svg
                className={cn('w-3 h-3', !change.isPositive && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {typeof change.value === 'number' ? `${change.value}%` : change.value}
            </span>
          )}
          <span className="text-content-muted truncate">
            {change?.label || description}
          </span>
        </div>
      )}
    </div>
  );
};
