import React from 'react';
import { cn } from '../ui/utils';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4';
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  as: Component = 'h2',
  subtitle,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <Component className={cn('ui-section-title', className)} {...props}>
          {children}
        </Component>
        {subtitle && <p className="text-xs text-content-muted mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
