import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminSidebarItem } from '../types/admin';

export interface AdminLayoutProps {
  children: React.ReactNode;
  activeItem?: AdminSidebarItem;
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
  contentClassName?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeItem,
  pageTitle,
  breadcrumbs,
  className,
  contentClassName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={<AdminSidebar activeItem={activeItem} />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK Admin"
        >
          <AdminSidebar
            activeItem={activeItem}
            onItemSelect={() => setIsMenuOpen(false)}
          />
        </MobileMenu>
      }
      navbar={
        <AdminHeader
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
