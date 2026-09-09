import React from 'react';
import { cn } from '../ui/utils';

export interface DashboardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  columns = 4,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('grid gap-5', columnClasses[columns], className)} {...props}>
      {children}
    </div>
  );
};
