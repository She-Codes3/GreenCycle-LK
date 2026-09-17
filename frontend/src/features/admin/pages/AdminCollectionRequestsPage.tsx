import React, { useState, useMemo } from 'react';
import {
  Search,
  Truck,
  Clock,
  UserCheck,
  PackageCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { CollectionRequestTable } from '../components/collection/CollectionRequestTable';
import { CollectionRequestDetails } from '../components/collection/CollectionRequestDetails';
import { MOCK_COLLECTION_REQUESTS } from '../data/collectionRequestMockData';
import {
  CollectionRequest,
  CollectionRequestStatus,
} from '../types/collectionRequest';
import { Button } from '@/components/ui/Button';

export const AdminCollectionRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<CollectionRequest[]>(MOCK_COLLECTION_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedCollector, setSelectedCollector] = useState<string>('all');

  // Selected request for details modal
  const [activeRequest, setActiveRequest] = useState<CollectionRequest | null>(null);

  // Derive distinct filter options
  const municipalitiesList = useMemo(
    () => Array.from(new Set(requests.map((r) => r.municipality))),
    [requests]
  );

  const collectorsList = useMemo(() => {
    const list = requests
      .map((r) => r.collector?.name)
      .filter((name): name is string => Boolean(name));
    return Array.from(new Set(list));
  }, [requests]);

  // Derived counts for metric cards
  const stats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'Pending').length,
      assigned: requests.filter((r) => r.status === 'Assigned').length,
      inProgress: requests.filter((r) => r.status === 'In Progress').length,
      collected: requests.filter((r) => r.status === 'Collected').length,
      completed: requests.filter((r) => r.status === 'Completed').length,
      cancelled: requests.filter((r) => r.status === 'Cancelled').length,
    };
  }, [requests]);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesCitizen = r.citizenName.toLowerCase().includes(q);
        const matchesLocation = `${r.location} ${r.area} ${r.city}`.toLowerCase().includes(q);
        const matchesCollector = r.collector?.name.toLowerCase().includes(q) || false;
        if (!matchesId && !matchesCitizen && !matchesLocation && !matchesCollector) {
          return false;
        }
      }

      if (selectedStatus !== 'all' && r.status !== selectedStatus) {
        return false;
      }

      if (selectedMunicipality !== 'all' && r.municipality !== selectedMunicipality) {
        return false;
      }

      if (selectedCollector !== 'all') {
        if (selectedCollector === 'unassigned') {
          if (r.collector) return false;
        } else if (r.collector?.name !== selectedCollector) {
          return false;
        }
      }

      return true;
    });
  }, [requests, searchTerm, selectedStatus, selectedMunicipality, selectedCollector]);

  // Status transition simulation
  const handleUpdateStatus = (requestId: string, newStatus: CollectionRequestStatus) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== requestId) return r;

        const updatedHistory = [
          ...r.statusHistory,
          {
            timestamp: `${dateStr} — ${timeStr}`,
            date: dateStr,
            status: newStatus,
            title: `Status transitioned to ${newStatus}`,
            description: `Admin updated request status to ${newStatus} in operational dispatch simulation.`,
            performedBy: 'System Administrator',
            role: 'System Admin',
          },
        ];

        let updatedCompletion = r.completionInfo;
        if (newStatus === 'Collected' && !r.completionInfo?.collectedAt) {
          updatedCompletion = {
            collectedBy: r.collector?.name || 'Assigned Collector',
            collectedAt: `${dateStr} — ${timeStr}`,
            completedAt: '',
            completionNotes: 'Waste successfully collected and loaded into municipal transit unit.',
          };
        } else if (newStatus === 'Completed') {
          updatedCompletion = {
            collectedBy: r.collector?.name || r.completionInfo?.collectedBy || 'Assigned Collector',
            collectedAt: r.completionInfo?.collectedAt || `${dateStr} — ${timeStr}`,
            completedAt: `${dateStr} — ${timeStr}`,
            completionNotes: 'Collection completed and verified with depot materials recovery audit.',
          };
        }

        return {
          ...r,
          status: newStatus,
          statusHistory: updatedHistory,
          completionInfo: updatedCompletion,
        };
      })
    );

    setActiveRequest((prev) => {
      if (!prev || prev.id !== requestId) return prev;
      return {
        ...prev,
        status: newStatus,
      };
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedMunicipality('all');
    setSelectedCollector('all');
  };

  const isFiltering =
    Boolean(searchTerm.trim()) ||
    selectedStatus !== 'all' ||
    selectedMunicipality !== 'all' ||
    selectedCollector !== 'all';

  return (
    <AdminLayout activeItem="collection-requests" pageTitle="Collection Requests">
      <div className="space-y-6">
        {/* 1. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-content tracking-tight">
              Collection Requests
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              Monitor citizen waste collection requests and their collection progress.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              {stats.total} Total Requests
            </span>
          </div>
        </div>

        {/* 2. Six Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Card 1: Total */}
          <div
            onClick={() => setSelectedStatus('all')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'all'
                ? 'bg-emerald-950 text-white border-emerald-800 ring-2 ring-emerald-600/30'
                : 'bg-surface text-content border-border hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'all' ? 'text-emerald-300' : 'text-content-muted'}`}>
                Total Requests
              </span>
              <Truck className="w-4 h-4 opacity-70" />
            </div>
            <span className="text-xl sm:text-2xl font-black block mt-1.5">
              {stats.total}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'all' ? 'text-emerald-400' : 'text-content-muted'}`}>
              All logged requests
            </span>
          </div>

          {/* Card 2: Pending */}
          <div
            onClick={() => setSelectedStatus('Pending')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'Pending'
                ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400/30'
                : 'bg-surface text-content border-border hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'Pending' ? 'text-amber-100' : 'text-content-muted'}`}>
                Pending
              </span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <span className={`text-xl sm:text-2xl font-black block mt-1.5 ${selectedStatus === 'Pending' ? 'text-white' : 'text-amber-600'}`}>
              {stats.pending}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'Pending' ? 'text-amber-100' : 'text-content-muted'}`}>
              Awaiting collector
            </span>
          </div>

          {/* Card 3: Assigned */}
          <div
            onClick={() => setSelectedStatus('Assigned')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'Assigned'
                ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400/30'
                : 'bg-surface text-content border-border hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'Assigned' ? 'text-blue-100' : 'text-content-muted'}`}>
                Assigned
              </span>
              <UserCheck className="w-4 h-4 text-blue-500" />
            </div>
            <span className={`text-xl sm:text-2xl font-black block mt-1.5 ${selectedStatus === 'Assigned' ? 'text-white' : 'text-blue-600'}`}>
              {stats.assigned}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'Assigned' ? 'text-blue-100' : 'text-content-muted'}`}>
              Dispatched to staff
            </span>
          </div>

          {/* Card 4: In Progress */}
          <div
            onClick={() => setSelectedStatus('In Progress')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'In Progress'
                ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-400/30'
                : 'bg-surface text-content border-border hover:border-indigo-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'In Progress' ? 'text-indigo-100' : 'text-content-muted'}`}>
                In Progress
              </span>
              <Truck className="w-4 h-4 text-indigo-500" />
            </div>
            <span className={`text-xl sm:text-2xl font-black block mt-1.5 ${selectedStatus === 'In Progress' ? 'text-white' : 'text-indigo-600'}`}>
              {stats.inProgress}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'In Progress' ? 'text-indigo-100' : 'text-content-muted'}`}>
              On pickup route
            </span>
          </div>

          {/* Card 5: Collected */}
          <div
            onClick={() => setSelectedStatus('Collected')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'Collected'
                ? 'bg-teal-600 text-white border-teal-700 ring-2 ring-teal-400/30'
                : 'bg-surface text-content border-border hover:border-teal-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'Collected' ? 'text-teal-100' : 'text-content-muted'}`}>
                Collected
              </span>
              <PackageCheck className="w-4 h-4 text-teal-500" />
            </div>
            <span className={`text-xl sm:text-2xl font-black block mt-1.5 ${selectedStatus === 'Collected' ? 'text-white' : 'text-teal-600'}`}>
              {stats.collected}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'Collected' ? 'text-teal-100' : 'text-content-muted'}`}>
              En route to depot
            </span>
          </div>

          {/* Card 6: Completed */}
          <div
            onClick={() => setSelectedStatus('Completed')}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer shadow-card ${
              selectedStatus === 'Completed'
                ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-400/30'
                : 'bg-surface text-content border-border hover:border-emerald-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold ${selectedStatus === 'Completed' ? 'text-emerald-100' : 'text-content-muted'}`}>
                Completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <span className={`text-xl sm:text-2xl font-black block mt-1.5 ${selectedStatus === 'Completed' ? 'text-white' : 'text-emerald-600'}`}>
              {stats.completed}
            </span>
            <span className={`text-[10px] block mt-0.5 ${selectedStatus === 'Completed' ? 'text-emerald-100' : 'text-content-muted'}`}>
              Fully closed requests
            </span>
          </div>
        </div>

        {/* 3. Toolbar: Search, Dropdown Filters, Clear */}
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search request ID, citizen, location..."
              className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-content outline-none focus:border-primary/50 focus:bg-surface focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-content-muted text-xs font-bold px-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Collected">Collected</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Municipality Filter */}
            <select
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Municipalities</option>
              {municipalitiesList.map((muni) => (
                <option key={muni} value={muni}>
                  {muni}
                </option>
              ))}
            </select>

            {/* Collector Filter */}
            <select
              value={selectedCollector}
              onChange={(e) => setSelectedCollector(e.target.value)}
              className="bg-muted/50 border border-border rounded-xl px-3 py-2 text-xs text-content font-medium outline-none focus:border-primary/50 cursor-pointer"
            >
              <option value="all">All Collectors</option>
              <option value="unassigned">Unassigned Only</option>
              {collectorsList.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>

            {isFiltering && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-content-muted hover:text-content"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* 4. Table */}
        <CollectionRequestTable
          requests={filteredRequests}
          onSelectRequest={(req) => setActiveRequest(req)}
        />

        {/* 5. Detail Modal */}
        {activeRequest && (
          <CollectionRequestDetails
            request={activeRequest}
            isOpen={Boolean(activeRequest)}
            onClose={() => setActiveRequest(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </AdminLayout>
  );
};
