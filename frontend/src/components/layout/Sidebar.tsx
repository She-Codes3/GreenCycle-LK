import React from 'react';
import { cn } from '../ui/utils';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  brandName?: string;
  brandSubtitle?: string;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  brandName = 'GreenCycle LK',
  brandSubtitle = 'Smart Waste Management',
  footer,
  children,
  className,
  ...props
}) => {
  return (
    <aside className={cn('ui-sidebar', className)} {...props}>
      {/* Brand Header */}
      <div className="flex items-center gap-3 p-5 border-b border-border">
        {logo || (
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary-light font-bold text-lg shadow-sm">
            🌱
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-bold text-base text-content tracking-tight">{brandName}</span>
          <span className="text-[11px] text-content-muted leading-tight">{brandSubtitle}</span>
        </div>
      </div>

      {/* Nav Content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">{children}</nav>

      {/* Optional Footer */}
      {footer && <div className="p-4 border-t border-border mt-auto">{footer}</div>}
    </aside>
  );
};
