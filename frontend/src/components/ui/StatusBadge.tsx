import React from 'react';
import { cn } from './utils';

export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusBadgeVariant;
  dot?: boolean;
  size?: 'sm' | 'md';
}

const variantClasses: Record<StatusBadgeVariant, string> = {
  success: 'ui-status-success',
  warning: 'ui-status-warning',
  error: 'ui-status-error',
  info: 'ui-status-info',
  default: 'ui-status-pill border-border-strong bg-muted text-content-secondary',
};

const dotColors: Record<StatusBadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-sky-500',
  default: 'bg-content-muted',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5 gap-1.5',
  md: 'text-sm px-2.5 py-1 gap-2',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  size = 'md',
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('inline-block h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
