import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from './utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  indeterminate?: boolean;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, indeterminate, error, disabled, className, id, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedId = id || (label && typeof label === 'string' ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    useEffect(() => {
      const el = (ref && 'current' in ref ? ref.current : internalRef.current);
      if (el) {
        el.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate, ref]);

    return (
      <div className={cn('flex items-start gap-2.5', className)}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref || internalRef}
            type="checkbox"
            id={resolvedId}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              'peer h-4 w-4 appearance-none rounded-md border transition-all cursor-pointer',
              'border-border-strong bg-surface',
              'checked:bg-primary checked:border-primary',
              'focus:ring-2 focus:ring-secondary/30 focus:ring-offset-1 focus:outline-none',
              error && 'border-red-400',
              disabled && 'cursor-not-allowed opacity-50 bg-muted'
            )}
            {...props}
          />
          <svg
            className="pointer-events-none absolute left-0.5 top-1 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            {indeterminate ? (
              <line x1="5" y1="12" x2="19" y2="12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            )}
          </svg>
        </div>
        {(label || helperText) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={resolvedId}
                className={cn(
                  'text-sm font-medium text-content cursor-pointer select-none',
                  disabled && 'cursor-not-allowed opacity-60'
                )}
              >
                {label}
              </label>
            )}
            {helperText && (
              <span className="text-xs text-content-muted leading-4 mt-0.5">{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
