import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  /** Replaces the default chevron rendered in the trailing slot. */
  icon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      children,
      error = false,
      success = false,
      fullWidth = true,
      icon,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const inputStateClass = error
      ? 'ui-input-error'
      : success
      ? 'ui-input-success'
      : 'ui-input';

    return (
      <div className={cn('relative flex items-center', fullWidth && 'w-full')}>
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            inputStateClass,
            'appearance-none pr-10 cursor-pointer',
            disabled && 'cursor-not-allowed opacity-60 bg-muted',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected={!props.value && !props.defaultValue}>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute right-3.5 flex items-center text-content-muted">
          {icon ?? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
