import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  MunicipalCollectionRequest,
  MunicipalCollector,
  MunicipalDisposalCenter,
  MunicipalScheduleEntry,
  MunicipalActivityLog,
  MunicipalDashboardStats,
} from '../types/municipal';
import {
  MOCK_MUNICIPAL_COLLECTORS,
  MOCK_MUNICIPAL_DISPOSAL_CENTERS,
  MOCK_MUNICIPAL_SCHEDULE,
  MOCK_MUNICIPAL_ACTIVITY_LOGS,
  MUNICIPAL_USER,
} from './municipalMockData';
import {
  loadSharedCollectionRequests,
  assignCollectorToSharedRequest,
  GC_SHARED_COLLECTION_STORAGE_KEY,
  GC_COLLECTION_SYNC_EVENT,
} from '@/shared/data/collectionStore';
import {
  loadSharedComplaints,
  updateSharedComplaintStatus,
  GC_COMPLAINTS_SYNC_EVENT,
} from '@/shared/data/complaintsStore';
import type { SharedComplaint, ComplaintStatus } from '@/shared/types/complaint';

// ──── Storage Keys ────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  requests: GC_SHARED_COLLECTION_STORAGE_KEY,
  collectors: 'gc_municipal_collectors',
  complaints: 'gc_municipal_complaints',
  schedule: 'gc_municipal_schedule',
  activityLogs: 'gc_municipal_activity_logs',
} as const;

const SYNC_EVENT = 'gc-municipal-store-sync';

// ──── Helpers ─────────────────────────────────────────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as T;
    }
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function emitSync() {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
}

function getMunicipalRequests(): MunicipalCollectionRequest[] {
  const all = loadSharedCollectionRequests();
  return all
    .filter((r) => !r.municipality || r.municipality === MUNICIPAL_USER.municipality || r.id.startsWith('MCR-'))
    .map((r) => ({
      id: r.id,
      citizenName: r.citizenName,
      citizenPhone: r.citizenPhone,
      citizenEmail: r.citizenEmail,
      municipality: r.municipality,
      location: r.location,
      area: r.area,
      city: r.city,
      wasteType: r.wasteType,
      quantity: r.quantity,
      status: r.status as MunicipalCollectionRequest['status'],
      requestedDate: r.requestedDate,
      requestedTime: r.requestedTime,
      notes: r.notes,
      assignedCollectorId: r.assignedCollectorId || r.collector?.id,
      assignedCollectorName: r.assignedCollectorName || r.collector?.name,
      collector: r.collector
        ? {
            id: r.collector.id,
            name: r.collector.name,
            collectorId: r.collector.collectorId,
            phone: r.collector.phone,
            vehicleType: r.collector.vehicleType,
          }
        : undefined,
      statusHistory: r.statusHistory,
    }));
}

// ──── Hook ────────────────────────────────────────────────────────────────────
export function useMunicipalData() {
  const [requests, setRequests] = useState<MunicipalCollectionRequest[]>(getMunicipalRequests);
  const [collectors, setCollectors] = useState<MunicipalCollector[]>(() =>
    loadFromStorage(STORAGE_KEYS.collectors, MOCK_MUNICIPAL_COLLECTORS),
  );
  const [complaints, setComplaints] = useState<SharedComplaint[]>(() => {
    const all = loadSharedComplaints();
    return all.filter(
      (c) =>
        !c.municipality ||
        c.municipality === MUNICIPAL_USER.municipality ||
        c.id.startsWith('MCMP-'),
    );
  });
  const [disposalCenters] = useState<MunicipalDisposalCenter[]>(MOCK_MUNICIPAL_DISPOSAL_CENTERS);
  const [schedule] = useState<MunicipalScheduleEntry[]>(() =>
    loadFromStorage(STORAGE_KEYS.schedule, MOCK_MUNICIPAL_SCHEDULE),
  );
  const [activityLogs, setActivityLogs] = useState<MunicipalActivityLog[]>(() =>
    loadFromStorage(STORAGE_KEYS.activityLogs, MOCK_MUNICIPAL_ACTIVITY_LOGS),
  );

  // ── Sync across components & shared store events ────────────────────────────
  useEffect(() => {
    const handleSync = () => {
      setRequests(getMunicipalRequests());
      setCollectors(loadFromStorage(STORAGE_KEYS.collectors, MOCK_MUNICIPAL_COLLECTORS));
      const allComplaints = loadSharedComplaints();
      setComplaints(
        allComplaints.filter(
          (c) =>
            !c.municipality ||
            c.municipality === MUNICIPAL_USER.municipality ||
            c.id.startsWith('MCMP-'),
        ),
      );
      setActivityLogs(loadFromStorage(STORAGE_KEYS.activityLogs, MOCK_MUNICIPAL_ACTIVITY_LOGS));
    };
    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener(GC_COLLECTION_SYNC_EVENT, handleSync);
    window.addEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener(GC_COLLECTION_SYNC_EVENT, handleSync);
      window.removeEventListener(GC_COMPLAINTS_SYNC_EVENT, handleSync);
    };
  }, []);

  // ── Add activity log ────────────────────────────────────────────────────────
  const addLog = useCallback(
    (
      title: string,
      description: string,
      module: MunicipalActivityLog['module'],
      severity: MunicipalActivityLog['severity'] = 'info',
      performer?: string,
      performerRole?: string,
    ) => {
      const log: MunicipalActivityLog = {
        id: `MLOG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        dateGroup: 'Today',
        title,
        description,
        module,
        performedBy: performer || MUNICIPAL_USER.name,
        performedByRole: performerRole || MUNICIPAL_USER.role,
        severity,
      };
      setActivityLogs((prev) => {
        const next = [log, ...prev];
        saveToStorage(STORAGE_KEYS.activityLogs, next);
        return next;
      });
    },
    [],
  );

  // ── Assign collector to a request (Transitions Pending -> In Progress) ──────
  const assignCollector = useCallback(
    (requestId: string, collectorId: string) => {
      const collector = collectors.find((c) => c.id === collectorId);
      if (!collector) return;

      // Update shared store -> marks status as 'In Progress' with collector assignment
      assignCollectorToSharedRequest(
        requestId,
        {
          id: collector.id,
          name: collector.name,
          collectorId: collector.collectorId,
          phone: collector.phone,
          vehicleType: `${collector.vehicleType} #${collector.vehicleNumber}`,
        },
        MUNICIPAL_USER.name,
        MUNICIPAL_USER.role,
      );

      // Refresh local view
      setRequests(getMunicipalRequests());

      // Log activity indicating assignment (not completion)
      addLog(
        `${requestId} assigned to ${collector.name}`,
        `Municipal Officer ${MUNICIPAL_USER.name} assigned ${collector.name} (${collector.collectorId}) to request ${requestId}. Status is now In Progress.`,
        'Collection Requests',
        'info',
      );
    },
    [collectors, addLog],
  );

  // ── Update complaint status ─────────────────────────────────────────────────
  const updateComplaintStatus = useCallback(
    (complaintId: string, newStatus: string, notes?: string) => {
      // Delegate to the shared complaints store
      updateSharedComplaintStatus(
        complaintId,
        newStatus as ComplaintStatus,
        MUNICIPAL_USER.name,
        MUNICIPAL_USER.role,
        notes,
      );

      // Reload from shared store
      const allComplaints = loadSharedComplaints();
      setComplaints(
        allComplaints.filter(
          (c: SharedComplaint) =>
            !c.municipality ||
            c.municipality === MUNICIPAL_USER.municipality ||
            c.id.startsWith('MCMP-'),
        ),
      );

      addLog(
        `Complaint ${complaintId} updated to ${newStatus}`,
        `Complaint ${complaintId} status changed to ${newStatus}.${notes ? ` Notes: ${notes}` : ''}`,
        'Complaints',
        newStatus === 'RESOLVED' ? 'success' : 'info',
      );
    },
    [addLog],
  );

  // ── Dashboard stats (strictly derived from current request states) ──────────
  const dashboardStats: MunicipalDashboardStats = useMemo(() => {
    const pending = requests.filter((r) => r.status === 'Pending').length;
    const inProgress = requests.filter((r) => r.status === 'In Progress').length;
    const completed = requests.filter((r) => r.status === 'Completed').length;
    const activeCollectors = collectors.filter((c) => c.status === 'Active').length;
    const activeComplaints = complaints.filter((c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW' || c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS').length;

    return {
      totalCollectionRequests: requests.length,
      pendingRequests: pending,
      inProgressRequests: inProgress,
      completedToday: completed,
      activeCollectors,
      totalCollectors: collectors.length,
      disposalCenters: disposalCenters.length,
      activeComplaints,
    };
  }, [requests, collectors, complaints, disposalCenters]);

  // ── Reset store ─────────────────────────────────────────────────────────────
  const resetStore = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem(GC_SHARED_COLLECTION_STORAGE_KEY);
    // Also clear shared complaints storage so it re-seeds
    localStorage.removeItem('gc_shared_complaints_v2');
    setRequests(getMunicipalRequests());
    setCollectors(MOCK_MUNICIPAL_COLLECTORS);
    // Reload complaints from shared store (which will re-seed)
    const allComplaints = loadSharedComplaints();
    setComplaints(
      allComplaints.filter(
        (c: SharedComplaint) =>
          !c.municipality ||
          c.municipality === MUNICIPAL_USER.municipality ||
          c.id.startsWith('MCMP-'),
      ),
    );
    setActivityLogs(MOCK_MUNICIPAL_ACTIVITY_LOGS);
    emitSync();
  }, []);

  return {
    requests,
    collectors,
    complaints,
    disposalCenters,
    schedule,
    activityLogs,
    dashboardStats,
    assignCollector,
    updateComplaintStatus,
    resetStore,
  };
}
