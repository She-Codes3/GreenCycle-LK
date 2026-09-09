import React from 'react';
import { cn } from '../ui/utils';

export interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  userName?: string;
  role?: string;
  title?: string;
  subtitle?: string;
  dateString?: string;
  actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  role,
  title,
  subtitle,
  dateString,
  actions,
  className,
  ...props
}) => {
  const defaultTitle = userName ? `Welcome back, ${userName}!` : 'Overview Dashboard';
  const defaultSubtitle = role
    ? `Logged in as ${role} • GreenCycle LK Smart Portal`
    : 'Monitor waste management operations and recycling metrics in Sri Lanka';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border',
        className
      )}
      {...props}
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-content">
          {title || defaultTitle}
        </h1>
        <p className="text-sm text-content-secondary mt-1">
          {subtitle || defaultSubtitle}
        </p>
        {dateString && (
          <div className="flex items-center gap-1.5 text-xs text-content-muted mt-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{dateString}</span>
          </div>
        )}
      </div>

      {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
    </div>
  );
};
