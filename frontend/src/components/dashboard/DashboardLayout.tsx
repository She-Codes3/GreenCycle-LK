import React from 'react';
import { cn } from '../ui/utils';

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  mobileMenu?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  navbar,
  mobileMenu,
  children,
  className,
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas font-sans text-content">
      {/* Desktop Sidebar */}
      <div className="hidden h-full lg:flex lg:shrink-0">{sidebar}</div>

      {/* Mobile Menu Drawer */}
      {mobileMenu}

      {/* Main Content Column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top navigation for the main content area */}
        {navbar}

        {/* Scrollable dashboard content */}
        <main className={cn('min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8', className)}>
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
