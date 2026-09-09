import React from 'react';
import { cn } from './utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white' | 'muted';
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
};

const variantMap = {
  primary: 'text-primary border-primary/20 border-t-primary',
  secondary: 'text-secondary border-secondary/20 border-t-secondary',
  white: 'text-white border-white/20 border-t-white',
  muted: 'text-content-muted border-border border-t-content-muted',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full',
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
