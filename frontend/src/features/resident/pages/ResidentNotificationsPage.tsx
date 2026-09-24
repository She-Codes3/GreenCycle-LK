import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { UserNavbar, UserSidebar } from '@/features/user/components';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const ResidentNotificationsPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={<UserSidebar activeItem="notifications" />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK"
        >
          <UserSidebar activeItem="notifications" />
        </MobileMenu>
      }
      navbar={
        <UserNavbar
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      }
    >
      <NotificationCenter role="RESIDENT" />
    </DashboardLayout>
  );
};
