import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout';
import { MunicipalSidebar } from './MunicipalSidebar';
import { MunicipalHeader } from './MunicipalHeader';
import type { MunicipalSidebarItem } from '../types/municipal';

export interface MunicipalLayoutProps {
  children: React.ReactNode;
  activeItem?: MunicipalSidebarItem;
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  onLogout?: () => void;
  className?: string;
  contentClassName?: string;
}

export const MunicipalLayout: React.FC<MunicipalLayoutProps> = ({
  children,
  activeItem,
  pageTitle,
  breadcrumbs,
  onLogout,
  className,
  contentClassName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={<MunicipalSidebar activeItem={activeItem} onLogout={onLogout} />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK Municipal"
        >
          <MunicipalSidebar
            activeItem={activeItem}
            onItemSelect={() => setIsMenuOpen(false)}
            onLogout={onLogout}
          />
        </MobileMenu>
      }
      navbar={
        <MunicipalHeader
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
        />
      }
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </DashboardLayout>
  );
};
