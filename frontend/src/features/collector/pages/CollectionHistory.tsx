import { useState } from 'react';
import { MobileMenu } from '@/components/layout';
import { DashboardLayout } from '@/components/dashboard';
import { CollectorNavbar, CollectorSidebar } from '@/features/collector/components';

/** Composes the responsive shell for the collector collection history page. */
export function CollectionHistory() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={<CollectorSidebar activeItem="collection-history" />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="Collector portal"
        >
          <CollectorSidebar activeItem="collection-history" />
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
