import React from 'react';
import { cn } from '../ui/utils';

export interface QuickActionItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
}

export interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions: QuickActionItem[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  title = 'Quick Actions',
  actions,
  className,
  ...props
}) => {
  return (
    <div className={cn('ui-dashboard-surface flex flex-col gap-3', className)} {...props}>
      {title && (
        <h3 className="text-sm font-semibold text-content uppercase tracking-wider mb-1">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-surface hover:border-secondary hover:bg-primary-light/30 transition-all text-center group active:translate-y-px"
          >
            {action.badge && (
              <span className="absolute top-2 right-2 text-[10px] font-bold bg-secondary text-white px-1.5 py-0.2 rounded-full shadow-sm">
                {action.badge}
              </span>
            )}
            <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-105 transition-transform mb-2">
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-content group-hover:text-primary transition-colors">
              {action.label}
            </span>
            {action.description && (
              <span className="text-[11px] text-content-muted mt-0.5 line-clamp-1">
                {action.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
