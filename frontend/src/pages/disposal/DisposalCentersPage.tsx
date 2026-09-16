import React, { useState, useMemo } from 'react';
import { Page } from '@/components/layout/Page';
import { Navbar } from '@/components/layout/Navbar';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

import { DisposalSearchPanel } from '@/features/disposal/components/DisposalSearchPanel';
import { DisposalMapView } from '@/features/disposal/components/DisposalMapView';
import { DisposalResultsPanel } from '@/features/disposal/components/DisposalResultsPanel';

import { MOCK_DISPOSAL_CENTERS } from '@/features/disposal/data/disposalCenters.mock';
import {
  DisposalFilterState,
  DisposalSortOption,
  DisposalCenter,
} from '@/features/disposal/types/disposal';
import {
  filterDisposalCenters,
  sortDisposalCenters,
} from '@/features/disposal/utils/disposalFilters';

const INITIAL_FILTERS: DisposalFilterState = {
  keyword: '',
  streamGroup: 'all',
  acceptedItems: ['Organic', 'Paper', 'Plastic', 'Glass', 'Metal', 'E-Waste', 'Bulky'],
  openNowOnly: false,
  distanceRadius: 25,
};

export const DisposalCentersPage: React.FC = () => {
  const [filters, setFilters] = useState<DisposalFilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<DisposalSortOption>('nearest');
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(
    'colombo-recycling-center'
  );
  const navigate = useNavigate();

  const handleNavigateToDetails = (center: DisposalCenter) => {
    navigate(`/disposal-centers/${center.code || center.id}`);
  };

  // Filter and sort centers
  const filteredCenters = useMemo(() => {
    const filtered = filterDisposalCenters(MOCK_DISPOSAL_CENTERS, filters);
    return sortDisposalCenters(filtered, sortBy);
  }, [filters, sortBy]);

  const handleFilterChange = (updated: Partial<DisposalFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      streamGroup: 'all',
      acceptedItems: [
        'Organic',
        'Paper',
        'Plastic',
        'Glass',
        'Metal',
        'E-Waste',
        'Bulky',
      ],
      openNowOnly: false,
      distanceRadius: 50,
    });
  };

  const handleUseMyLocation = () => {
    // Recenter around Havelock Town demo coordinate
    setSelectedCenterId('thimbirigasyaya-bio-waste-hub');
  };

  return (
    <Page className="bg-canvas min-h-screen flex flex-col font-sans">
      {/* 1. Global Navigation Bar (Matching Stitch Design) */}
      <Navbar
        brand={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-lg text-white shadow-sm shrink-0">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-content tracking-tight">
                  GreenCycle LK
                </span>
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  CMC
                </span>
              </div>
              <span className="text-[11px] text-content-secondary block font-medium">
                Colombo Municipal Solid Waste Management Directive
              </span>
            </div>
          </div>
        }
        navigation={
          <div className="flex items-center gap-1.5 ml-4">
            <a
              href="#home"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/disposal-centers"
              className="px-4 py-1.5 rounded-full text-sm font-bold bg-primary text-white shadow-sm"
            >
              Map
            </a>
            <a
              href="#report"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Report
            </a>
            <a
              href="#rewards"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Rewards
            </a>
            <a
              href="#bulky"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              Bulky
            </a>
            <a
              href="#about"
              className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-content-secondary hover:text-primary transition-colors"
            >
              About
            </a>
          </div>
        }
        actions={
          <div className="flex items-center gap-3">
            {/* Quick Header Search */}
            <div className="relative w-64 hidden xl:block">
              <input
                type="text"
                placeholder="Search ward, zone, e-waste centers."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-muted/60 border border-border rounded-full text-content placeholder:text-content-muted focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface"
              />
              <svg
                className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Hotline 1910 Pill */}
            <a
              href="tel:1910"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors shadow-sm"
              title="Colombo Municipal Solid Waste Hotline"
            >
              <span className="text-sm">📞</span>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] uppercase font-bold tracking-wider text-red-600">
                  HOTLINE
                </span>
                <span className="text-xs font-black tracking-tight text-red-700">1910</span>
              </div>
            </a>
          </div>
        }
      />

      {/* 2. Main Page Container */}
      <Container size="full" className="px-6 py-6 flex-1 flex flex-col">
        {/* Page Header matching Stitch */}
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

        {/* 3. Three-Column Desktop Layout (Filter Panel | Map View | Results Panel) */}
        <main className="grid grid-cols-12 gap-5 flex-1 items-start">
          {/* Left Column: Filter Panel (width approx 280px) */}
          <div className="col-span-3">
            <DisposalSearchPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Center Column: Dominant Map View (width approx 550-600px) */}
          <div className="col-span-5">
            <DisposalMapView
              centers={filteredCenters}
              selectedCenterId={selectedCenterId}
              onSelectCenter={(id) => setSelectedCenterId(id)}
              onViewDetails={handleNavigateToDetails}
            />
          </div>

          {/* Right Column: Results Panel (width approx 370px) */}
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


      {/* 5. Civic Footer matching Stitch */}
      <footer className="border-t border-border/80 bg-surface/80 py-4 px-8 mt-8 text-xs text-content-secondary flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-content">GreenCycle LK</span>
          <span>•</span>
          <span>Colombo Municipal Solid Waste Portal</span>
        </div>
        <div>
          © 2025 Colombo Municipal Council (CMC). Environmental Services & Waste
          Management Division. All rights reserved.
        </div>
      </footer>
    </Page>
  );
};

export default DisposalCentersPage;
