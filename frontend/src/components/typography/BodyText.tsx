import React from 'react';
import { cn } from '../ui/utils';

export interface BodyTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div';
  variant?: 'default' | 'secondary' | 'muted';
  size?: 'sm' | 'base' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold';
}

const colorVariants = {
  default: 'text-content',
  secondary: 'text-content-secondary',
  muted: 'text-content-muted',
};

const sizeVariants = {
  sm: 'text-sm leading-6',
  base: 'text-base leading-7',
  lg: 'text-lg leading-8',
};

const weightVariants = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

export const BodyText: React.FC<BodyTextProps> = ({
  as: Component = 'p',
  variant = 'secondary',
  size = 'base',
  weight = 'normal',
  children,
  className,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'ui-body',
        colorVariants[variant],
        sizeVariants[size],
        weightVariants[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
