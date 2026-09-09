import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      success = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
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
        {leftIcon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center text-content-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            inputStateClass,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            disabled && 'cursor-not-allowed opacity-60 bg-muted',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-content-muted">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
