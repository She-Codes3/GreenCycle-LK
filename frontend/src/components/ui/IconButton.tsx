import React, { forwardRef } from 'react';
import { cn } from './utils';
import { ButtonVariant, ButtonSize } from './Button';
import { Spinner } from './Spinner';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:translate-y-px',
  secondary: 'border border-border-strong bg-surface text-primary hover:border-secondary hover:bg-secondary-light active:translate-y-px',
  outline: 'border border-primary text-primary hover:bg-primary-light active:translate-y-px',
  ghost: 'text-content-secondary hover:text-primary hover:bg-primary-light/50 active:translate-y-px',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:translate-y-px',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      children,
      variant = 'secondary',
      size = 'md',
      rounded = false,
      loading = false,
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          rounded ? 'rounded-full' : 'rounded-xl',
          variantClasses[variant],
          sizeClasses[size],
          loading && 'cursor-wait',
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner
            size="sm"
            variant={variant === 'primary' || variant === 'danger' ? 'white' : 'primary'}
          />
        ) : (
          icon || children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
