import { useState } from 'react';
import { MobileMenu } from '@/components/layout';
import { DashboardLayout } from '@/components/dashboard';
import { CollectorNavbar, CollectorSidebar } from '@/features/collector/components';

/** Composes the responsive shell for the collector dashboard. */
export function CollectorDashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={<CollectorSidebar />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="Collector portal"
        >
          <CollectorSidebar />
        </MobileMenu>
      }
      navbar={
        <CollectorNavbar
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      }
    >
      <></>
    </DashboardLayout>
  );
}
