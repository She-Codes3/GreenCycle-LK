import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout';
import { ResidentSidebar } from './ResidentSidebar';
import { ResidentHeader } from './ResidentHeader';
import { ResidentBottomNav } from './ResidentBottomNav';
import type { ResidentLayoutProps } from '../types/resident';
import { cn } from '@/components/ui/utils';

export const ResidentLayout: React.FC<ResidentLayoutProps> = ({
  children,
  activeItem,
  pageTitle,
  pageSubtitle,
  breadcrumbs,
  onLogout,
  className,
  contentClassName,
  showBottomNav = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-canvas text-content">
      <DashboardLayout
        sidebar={
          <ResidentSidebar activeItem={activeItem} onLogout={onLogout} />
        }
        mobileMenu={
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            brandName="GreenCycle LK Resident"
          >
            <ResidentSidebar
              activeItem={activeItem}
              onItemSelect={() => setIsMenuOpen(false)}
              onLogout={onLogout}
            />
          </MobileMenu>
        }
        navbar={
          <ResidentHeader
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen((open) => !open)}
            pageTitle={pageTitle}
            pageSubtitle={pageSubtitle}
            breadcrumbs={breadcrumbs}
            onLogout={onLogout}
          />
        }
        className={cn(showBottomNav ? 'pb-24 lg:pb-8' : '', className)}
        contentClassName={contentClassName}
      >
        {children ?? <Outlet />}
      </DashboardLayout>

      {/* Progressive Web App Mobile Bottom Nav */}
      {showBottomNav && (
        <ResidentBottomNav
          activeItem={activeItem}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      )}
    </div>
  );
};
