import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, error, disabled, className, id, ...props }, ref) => {
    const resolvedId =
      id ||
      (label && typeof label === 'string'
        ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}`
        : undefined);

    return (
      <div className={cn('flex items-start gap-2.5', className)}>
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            type="radio"
            id={resolvedId}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              'peer h-4 w-4 appearance-none rounded-full border transition-all cursor-pointer',
              'border-border-strong bg-surface',
              'checked:border-primary checked:border-[5px]',
              'focus:ring-2 focus:ring-secondary/30 focus:ring-offset-1 focus:outline-none',
              error && 'border-red-400',
              disabled && 'cursor-not-allowed opacity-50 bg-muted'
            )}
            {...props}
          />
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

Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: string;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  orientation = 'vertical',
  children,
  className,
  ...props
}) => {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)} {...props}>
      {label && (
        <legend className="text-sm font-medium text-content mb-1.5">{label}</legend>
      )}
      <div
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
      >
        {children}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </fieldset>
  );
};
