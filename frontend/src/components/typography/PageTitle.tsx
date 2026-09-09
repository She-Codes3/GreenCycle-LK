import React from 'react';
import { cn } from '../ui/utils';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2';
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  as: Component = 'h1',
  subtitle,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <Component className={cn('ui-page-title font-sans', className)} {...props}>
          {children}
        </Component>
        {subtitle && <p className="text-sm text-content-secondary mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 mt-2 sm:mt-0">{action}</div>}
    </div>
  );
};
