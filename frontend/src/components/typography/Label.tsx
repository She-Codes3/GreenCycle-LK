import React from 'react';
import { cn } from '../ui/utils';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  required,
  children,
  className,
  ...props
}) => {
  return (
    <span className={cn('text-sm font-medium text-content inline-flex items-center gap-1', className)} {...props}>
      {children}
      {required && <span className="text-red-600" aria-hidden="true">*</span>}
    </span>
  );
};
