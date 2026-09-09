import React from 'react';
import { cn } from '../ui/utils';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  periods?: string[];
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  action?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  periods,
  selectedPeriod,
  onPeriodChange,
  action,
  loading = false,
  empty = false,
  emptyMessage = 'No chart data available for this period.',
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('ui-dashboard-surface flex flex-col', className)} {...props}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border mb-4">
        <div>
          <h3 className="text-base font-semibold text-content">{title}</h3>
          {subtitle && <p className="text-xs text-content-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {periods && periods.length > 0 && onPeriodChange && (
            <div className="inline-flex rounded-xl bg-muted p-1 border border-border">
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => onPeriodChange(period)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-lg transition-all',
                    selectedPeriod === period
                      ? 'bg-surface text-primary shadow-sm font-semibold'
                      : 'text-content-secondary hover:text-content'
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
          {action}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[220px] flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col gap-3 w-full p-4">
            <Skeleton variant="rectangular" height={160} />
            <div className="flex justify-between">
              <Skeleton variant="text" width="20%" height={12} />
              <Skeleton variant="text" width="20%" height={12} />
              <Skeleton variant="text" width="20%" height={12} />
            </div>
          </div>
        ) : empty ? (
          <EmptyState title="No Data" description={emptyMessage} />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
