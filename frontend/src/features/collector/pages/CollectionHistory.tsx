import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  CircleCheck,
  Download,
  Funnel,
  Leaf,
  ShieldCheck,
  SquareCheck,
  Truck,
} from 'lucide-react';
import { MobileMenu, PageHeader } from '@/components/layout';
import { DashboardGrid, DashboardLayout } from '@/components/dashboard';
import {
  Button,
  Pagination,
  ProgressBar,
  SearchInput,
  Select,
  cn,
} from '@/components/ui';
import { CollectorNavbar, CollectorSidebar } from '@/features/collector/components';

type WasteStreamTone = 'primary' | 'info' | 'neutral' | 'warning';

const streamDotClasses: Record<WasteStreamTone, string> = {
  primary: 'bg-emerald-600',
  info: 'bg-blue-500',
  neutral: 'bg-slate-500',
  warning: 'bg-amber-500',
};

const wasteBreakdown: Array<{
  label: string;
  weightKg: number;
  percentage: number;
  tone: WasteStreamTone;
}> = [
  { label: 'Organic', weightKg: 218, percentage: 39.4, tone: 'primary' },
  { label: 'Recyclable', weightKg: 176, percentage: 31.8, tone: 'info' },
  { label: 'General', weightKg: 126, percentage: 22.7, tone: 'neutral' },
  { label: 'Special', weightKg: 34, percentage: 6.1, tone: 'warning' },
];

const totalWasteKg = wasteBreakdown.reduce((sum, stream) => sum + stream.weightKg, 0);

const periodOptions = [
  { label: 'This Month', value: 'this-month' },
  { label: 'Last Month', value: 'last-month' },
  { label: 'This Year', value: 'this-year' },
];

const collectionRecords: Array<{
  id: string;
  date: string;
  route: string;
  area: string;
  wasteType: string;
  wasteTone: WasteStreamTone;
  stops: number;
  status: string;
}> = [
  { id: 'C-1021', date: 'Sep 13, 2026', route: 'R-102', area: 'Colombo 05', wasteType: 'General', wasteTone: 'neutral', stops: 24, status: 'Completed' },
  { id: 'C-0984', date: 'Sep 12, 2026', route: 'R-098', area: 'Colombo 06', wasteType: 'Organic', wasteTone: 'primary', stops: 31, status: 'Completed' },
  { id: 'C-0952', date: 'Sep 11, 2026', route: 'R-095', area: 'Colombo 04', wasteType: 'Recyclable', wasteTone: 'info', stops: 19, status: 'Completed' },
  { id: 'C-0913', date: 'Sep 10, 2026', route: 'R-091', area: 'Colombo 07', wasteType: 'General', wasteTone: 'neutral', stops: 27, status: 'Completed' },
  { id: 'C-0876', date: 'Sep 09, 2026', route: 'R-087', area: 'Colombo 03', wasteType: 'Special', wasteTone: 'warning', stops: 14, status: 'Completed' },
];

const totalCollections = 116;
const totalPages = 5;

const dateRangeOptions = [
  { label: 'Date Range: All', value: 'all' },
  { label: 'Date Range: Last 7 Days', value: 'last-7-days' },
  { label: 'Date Range: Last 30 Days', value: 'last-30-days' },
];

const wasteTypeOptions = [
  { label: 'All Waste Types', value: 'all' },
  { label: 'Organic', value: 'organic' },
  { label: 'Recyclable', value: 'recyclable' },
  { label: 'General', value: 'general' },
  { label: 'Special', value: 'special' },
];

const statusOptions = [
  { label: 'Status: All', value: 'all' },
  { label: 'Status: Completed', value: 'completed' },
  { label: 'Status: Missed', value: 'missed' },
];

interface HistoryStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  /** Renders the card in the filled dark-green treatment used for the primary metric. */
  highlighted?: boolean;
  /** Shows a small dot beside the title, marking a live metric. */
  showTitleDot?: boolean;
  footer: React.ReactNode;
}

/** Renders a single collection-history metric tile. */
const HistoryStatCard: React.FC<HistoryStatCardProps> = ({
  title,
  value,
  icon,
  highlighted = false,
  showTitleDot = false,
  footer,
}) => (
  <div
    className={cn(
      'flex flex-col justify-between rounded-xl p-3 shadow-card',
      highlighted
        ? 'bg-gradient-to-br from-[#0f5c34] to-[#0a3d23] text-white'
        : 'border border-border bg-surface'
    )}
  >
    <div className="mb-2 flex items-start justify-between gap-2">
      <span
        className={cn(
          'flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider',
          highlighted ? 'text-white' : 'text-content-muted'
        )}
      >
        {title}
        {showTitleDot && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      </span>
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          highlighted ? 'bg-white/15 text-white' : 'bg-primary-light text-primary'
        )}
      >
        {icon}
      </div>
    </div>

    <span
      className={cn(
        'text-2xl font-extrabold leading-none tracking-tight',
        highlighted ? 'text-white' : 'text-content'
      )}
    >
      {value}
    </span>

    <div className="mt-2 flex items-center gap-1.5 text-[10px]">{footer}</div>
  </div>
);

/** Renders the trend pill used in the card footers. */
const TrendPill: React.FC<{ change: string; highlighted?: boolean }> = ({ change, highlighted }) => (
  <span
    className={cn(
      'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-bold',
      highlighted ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'
    )}
  >
    <ArrowUpRight className="h-3 w-3" strokeWidth={2.6} />
    {change}
  </span>
);

/** Composes the responsive shell for the collector collection history page. */
export function CollectionHistory() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [period, setPeriod] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [wasteType, setWasteType] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const firstRecordIndex = (page - 1) * collectionRecords.length + 1;
  const lastRecordIndex = firstRecordIndex + collectionRecords.length - 1;

  const handleResetFilters = () => {
    setSearchTerm('');
    setDateRange('all');
    setWasteType('all');
    setStatus('all');
    setPage(1);
  };

  return (
    <DashboardLayout
      className="p-3 sm:p-4 lg:py-4 lg:pr-4 lg:pl-8"
      contentClassName="space-y-3"
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
      <PageHeader
        className="gap-2 pb-3 sm:items-start"
        title={
          <span className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl">
            Collection History
          </span>
        }
        subtitle={<span className="-mt-1 block text-xs">Review your completed collection activities and environmental impact.</span>}
        actions={
          <Button className="mt-1 py-1.5 text-xs" leftIcon={<Download className="h-3.5 w-3.5" strokeWidth={2.4} />}>
            Export Report
          </Button>
        }
      />

      <DashboardGrid columns={4}>
        <HistoryStatCard
          highlighted
          title="Collections This Week"
          value="28"
          icon={<Truck className="h-4 w-4" strokeWidth={2.2} />}
          footer={
            <>
              <TrendPill highlighted change="↑12.5%" />
              <span className="text-emerald-100/80">vs last week</span>
            </>
          }
        />

        <HistoryStatCard
          title="Collections This Month"
          value="116"
          icon={<Calendar className="h-4 w-4" strokeWidth={2.2} />}
          footer={
            <>
              <TrendPill change="↑8.2%" />
              <span className="text-content-muted">vs last month</span>
            </>
          }
        />

        <HistoryStatCard
          title="Successful Rate"
          value="98.3%"
          icon={<CircleCheck className="h-4 w-4" strokeWidth={2.2} />}
          footer={
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
              Excellent performance
            </span>
          }
        />

        <HistoryStatCard
          showTitleDot
          title="Environmental Impact"
          value="86 / 100"
          icon={<Leaf className="h-4 w-4" strokeWidth={2.2} />}
          footer={
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-0.5 font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Details
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
          }
        />
      </DashboardGrid>

      <section className="ui-dashboard-surface p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-content">Waste Collection Overview</h2>
            <p className="mt-0.5 text-[10px] text-content-muted">
              Aggregated curbside weight classification metrics
            </p>
          </div>
          <Select
            fullWidth={false}
            aria-label="Reporting period"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            options={periodOptions}
            className="w-auto rounded-lg py-1 pl-2 pr-8 text-[10px] font-semibold text-content-secondary"
          />
        </div>

        <div className="mt-3 space-y-3">
          {wasteBreakdown.map((stream) => (
            <div key={stream.label}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-content">
                  <span className={cn('h-2 w-2 rounded-full', streamDotClasses[stream.tone])} />
                  {stream.label}
                </span>
                <span className="text-xs font-bold text-content">
                  {stream.weightKg} kg{' '}
                  <span className="text-[10px] font-medium text-content-muted">
                    ({stream.percentage}%)
                  </span>
                </span>
              </div>
              <ProgressBar
                value={stream.percentage}
                tone={stream.tone}
                label={`${stream.label} share of collected waste`}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-2">
          <span className="text-xs text-content-secondary">Total Waste Collected</span>
          <span className="text-lg font-extrabold tracking-tight text-primary">
            {totalWasteKg} kg
          </span>
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold tracking-tight text-content">Collection History</h2>
        <p className="mt-0.5 text-xs text-content-secondary">
          View and manage your completed collection records.
        </p>

        <div className="ui-dashboard-surface mt-2 flex flex-col gap-2 p-3 lg:flex-row lg:items-center">
          <SearchInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search route, area or collection ID..."
            aria-label="Search collections"
            className="py-1.5 text-[10px]"
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:shrink-0 lg:items-center">
            <Select
              fullWidth={false}
              aria-label="Date range"
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value)}
              options={dateRangeOptions}
              icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
              className="w-full py-1.5 text-[10px] lg:w-40"
            />
            <Select
              fullWidth={false}
              aria-label="Waste type"
              value={wasteType}
              onChange={(event) => setWasteType(event.target.value)}
              options={wasteTypeOptions}
              icon={<Funnel className="h-4 w-4" strokeWidth={2} />}
              className="w-full py-1.5 text-[10px] lg:w-40"
            />
            <Select
              fullWidth={false}
              aria-label="Status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              options={statusOptions}
              icon={<SquareCheck className="h-4 w-4" strokeWidth={2} />}
              className="w-full py-1.5 text-[10px] lg:w-36"
            />
            <Button variant="secondary" className="py-1.5 text-[10px]" onClick={handleResetFilters}>
              Reset
            </Button>
          </div>
        </div>

        {/* Collection History Data Table - Styled according to Admin/Municipal/Resident tables */}
        <div className="mt-3 bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
                  <th className="py-3.5 px-4 font-bold">Date</th>
                  <th className="py-3.5 px-4 font-bold">Route ID</th>
                  <th className="py-3.5 px-4 font-bold">Area</th>
                  <th className="py-3.5 px-4 font-bold">Waste Stream</th>
                  <th className="py-3.5 px-4 font-bold text-center">Stops</th>
                  <th className="py-3.5 px-4 font-bold text-center">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {collectionRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-medium text-content whitespace-nowrap">
                      {record.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-light text-primary font-mono font-bold text-xs">
                        {record.route}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-content">
                      {record.area}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 font-medium text-content">
                        <span
                          className={cn('h-2 w-2 rounded-full', streamDotClasses[record.wasteTone])}
                        />
                        {record.wasteType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-content">
                      {record.stops}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
                        <CircleCheck className="w-3 h-3 text-emerald-600" />
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border/60 bg-muted/20">
            <p className="text-xs text-content-secondary">
              Showing{' '}
              <span className="font-semibold text-content">
                {firstRecordIndex}&ndash;{lastRecordIndex}
              </span>{' '}
              of <span className="font-semibold text-content">{totalCollections}</span> collections
            </p>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              className="py-0"
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
