import React from 'react';
import { cn } from '../ui/utils';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  backButton?: {
    label?: string;
    onClick: () => void;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  backButton,
  className,
  ...props
}) => {
  return (
    <header className={cn('ui-page-header', className)} {...props}>
      <div className="flex flex-col gap-2">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="mb-1" />}
        <div className="flex items-center gap-3">
          {backButton && (
            <button
              type="button"
              onClick={backButton.onClick}
              aria-label={backButton.label || 'Go back'}
              className="p-1.5 rounded-xl border border-border bg-surface text-content-secondary hover:text-primary hover:border-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <h1 className="ui-page-title">{title}</h1>
        </div>
        {subtitle && <p className="text-sm text-content-secondary max-w-2xl">{subtitle}</p>}
      </div>

      {actions && <div className="flex items-center gap-2.5 flex-wrap shrink-0">{actions}</div>}
    </header>
  );
};
