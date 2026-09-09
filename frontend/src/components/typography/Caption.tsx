import React from 'react';
import { cn } from '../ui/utils';

export interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'small' | 'span' | 'p';
}

export const Caption: React.FC<CaptionProps> = ({
  as: Component = 'span',
  children,
  className,
  ...props
}) => {
  return (
    <Component className={cn('ui-caption', className)} {...props}>
      {children}
    </Component>
  );
};
