import React from 'react';
import { cn } from '../ui/utils';
import { StatusBadge, StatusBadgeVariant } from '../ui/StatusBadge';
import { Skeleton } from '../ui/Skeleton';

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status?: {
    label: string;
    variant?: StatusBadgeVariant;
  };
  icon?: React.ReactNode;
}

export interface ActivityListProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: ActivityItem[];
  onViewAll?: () => void;
  loading?: boolean;
  emptyMessage?: string;
}

export const ActivityList: React.FC<ActivityListProps> = ({
  title = 'Recent Activity',
  items,
  onViewAll,
  loading = false,
  emptyMessage = 'No recent activities found.',
  className,
  ...props
}) => {
  return (
    <div className={cn('ui-dashboard-surface flex flex-col', className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
        <h3 className="text-base font-semibold text-content">{title}</h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-primary hover:underline"
          >
            View All
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 py-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" width={36} height={36} />
              <div className="flex-1">
                <Skeleton variant="text" width="60%" height={14} />
                <Skeleton variant="text" width="40%" height={10} />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-8 text-center text-xs text-content-muted">{emptyMessage}</div>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="py-3 flex items-start gap-3 hover:bg-muted/40 px-2 rounded-xl transition-colors">
              {item.icon ? (
                <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-muted text-content-muted flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-content truncate">{item.title}</p>
                  <span className="text-[11px] text-content-muted shrink-0">{item.timestamp}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-content-secondary line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>

              {item.status && (
                <StatusBadge
                  variant={item.status.variant || 'default'}
                  size="sm"
                  className="shrink-0 self-center"
                >
                  {item.status.label}
                </StatusBadge>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
