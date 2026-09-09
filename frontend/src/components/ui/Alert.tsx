import React from 'react';
import { cn } from './utils';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; text: string; icon: string }> = {
  success: {
    container: 'ui-feedback-success',
    text: 'text-emerald-900',
    icon: 'text-emerald-700',
  },
  error: {
    container: 'ui-feedback-error',
    text: 'text-red-900',
    icon: 'text-red-700',
  },
  warning: {
    container: 'rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800',
    text: 'text-amber-900',
    icon: 'text-amber-700',
  },
  info: {
    container: 'rounded-xl border border-sky-200 bg-sky-50 p-4 text-sky-800',
    text: 'text-sky-900',
    icon: 'text-sky-700',
  },
};

const DefaultIcons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  icon,
  onClose,
  children,
  className,
  ...props
}) => {
  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn('flex items-start gap-3', current.container, className)}
      {...props}
    >
      <div className={current.icon}>{icon || DefaultIcons[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && <h5 className={cn('text-sm font-semibold mb-0.5', current.text)}>{title}</h5>}
        {children && <div className="text-sm leading-5 opacity-90">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="shrink-0 -mr-1 -mt-1 p-1 rounded-lg text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
