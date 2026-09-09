import React from 'react';
import { cn } from '../ui/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('ui-container', sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
};
