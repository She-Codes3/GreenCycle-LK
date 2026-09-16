import React, { useState, useMemo, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardLayout } from '@/components/dashboard';
import { MobileMenu } from '@/components/layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

import { UserNavbar, UserSidebar } from '@/features/user/components';

import { DisposalSearchPanel } from '@/features/disposal/components/DisposalSearchPanel';
import { DisposalMapView } from '@/features/disposal/components/DisposalMapView';
import { DisposalResultsPanel } from '@/features/disposal/components/DisposalResultsPanel';

import { MOCK_DISPOSAL_CENTERS } from '@/features/disposal/data/disposalCenters.mock';
import {
  DisposalFilterState,
  DisposalSortOption,
  DisposalCenterView,
  ALL_WASTE_CATEGORIES,
} from '@/features/disposal/types/disposal';
import {
  enrichCenters,
  filterDisposalCenters,
  sortDisposalCenters,
} from '@/features/disposal/utils/disposalFilters';

const INITIAL_FILTERS: DisposalFilterState = {
  keyword: '',
  streamGroup: 'all',
  acceptedItems: [...ALL_WASTE_CATEGORIES],
  openNowOnly: false,
  distanceRadius: 25,
};

export const DisposalCentersPage: React.FC = () => {
  const [filters, setFilters] = useState<DisposalFilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<DisposalSortOption>('nearest');
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Enrich raw data with computed distance + isOpen
  const enrichedCenters = useMemo(() => enrichCenters(MOCK_DISPOSAL_CENTERS), []);

  // Filter and sort centers
  const filteredCenters = useMemo(() => {
    const filtered = filterDisposalCenters(enrichedCenters, filters);
    return sortDisposalCenters(filtered, sortBy);
  }, [enrichedCenters, filters, sortBy]);

  // Auto-select nearest center when filters change if nothing is selected or current selection is excluded
  useEffect(() => {
    if (filteredCenters.length > 0 && (!selectedCenterId || !filteredCenters.find(c => c.id === selectedCenterId))) {
      setSelectedCenterId(filteredCenters[0].id);
    }
  }, [filteredCenters, selectedCenterId]);

  const handleNavigateToDetails = (center: DisposalCenterView) => {
    navigate(`/disposal-centers/${center.code || center.id}`);
  };

  const handleFilterChange = (updated: Partial<DisposalFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({ ...INITIAL_FILTERS, distanceRadius: 50 });
  };

  const handleUseMyLocation = () => {
    // In demo mode, recenter around nearest center
    if (filteredCenters.length > 0) {
      setSelectedCenterId(filteredCenters[0].id);
    }
  };

  return (
    <DashboardLayout
      sidebar={<UserSidebar activeItem="disposal-centers" />}
      mobileMenu={
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandName="GreenCycle LK"
        >
          <UserSidebar activeItem="disposal-centers" />
        </MobileMenu>
      }
      navbar={
        <UserNavbar
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
      }
      className="p-0 sm:p-0 lg:p-0"
      contentClassName="max-w-none"
    >
      {/* Main Page Container */}
      <Container size="full" className="px-6 py-6 flex-1 flex flex-col">
        {/* Page Header */}
        <PageHeader
          title={
            <div className="flex items-center gap-3">
              <span>Disposal Centers</span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                CMC LIVE GIS
              </span>
            </div>
          }
          subtitle="Find nearby recycling and special-waste disposal centers across Colombo."
          actions={
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUseMyLocation}
                leftIcon={
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                className="bg-surface hover:bg-muted font-medium border-border text-content rounded-xl"
              >
                Use My Location
              </Button>

              <div className="flex items-center gap-2 text-xs font-semibold text-content bg-surface px-3 py-1.5 rounded-xl border border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Havelock Town (CMC Ward 47)</span>
              </div>
            </div>
          }
          className="mb-5 pb-4 border-b border-border/60"
        />

        {/* Three-Column Desktop Layout (Filter Panel | Map View | Results Panel) */}
        <main className="grid grid-cols-12 gap-5 flex-1 items-start">
          {/* Left Column: Filter Panel */}
          <div className="col-span-3">
            <DisposalSearchPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Center Column: Dominant Map View */}
          <div className="col-span-5">
            <DisposalMapView
              centers={filteredCenters}
              selectedCenterId={selectedCenterId}
              onSelectCenter={(id) => setSelectedCenterId(id)}
              onViewDetails={handleNavigateToDetails}
            />
          </div>

          {/* Right Column: Results Panel */}
          <div className="col-span-4">
            <DisposalResultsPanel
              centers={filteredCenters}
              selectedCenterId={selectedCenterId}
              onSelectCenter={(id) => setSelectedCenterId(id)}
              onViewDetails={handleNavigateToDetails}
              sortBy={sortBy}
              onSortChange={(sort) => setSortBy(sort)}
              onClearFilters={handleResetFilters}
            />
          </div>
        </main>
      </Container>
    </DashboardLayout>
  );
};

export default DisposalCentersPage;
