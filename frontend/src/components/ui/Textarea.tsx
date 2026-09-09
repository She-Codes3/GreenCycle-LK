import React, { forwardRef } from 'react';
import { cn } from './utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
  showCount?: boolean;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error = false,
      success = false,
      showCount = false,
      fullWidth = true,
      maxLength,
      value,
      defaultValue,
      disabled,
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputStateClass = error
      ? 'ui-input-error'
      : success
      ? 'ui-input-success'
      : 'ui-input';

    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('relative flex flex-col', fullWidth && 'w-full')}>
        <textarea
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            inputStateClass,
            'resize-y',
            disabled && 'cursor-not-allowed opacity-60 bg-muted',
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <div className="mt-1 self-end text-xs text-content-muted">
            {currentLength} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
