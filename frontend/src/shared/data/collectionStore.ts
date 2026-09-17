import type {
  CollectionRequest,
  CollectionRequestStatus,
  CollectorInfo,
} from '@/features/admin/types/collectionRequest';
import { MOCK_COLLECTION_REQUESTS } from '@/features/admin/data/collectionRequestMockData';
import { MOCK_MUNICIPAL_COLLECTION_REQUESTS } from '@/features/municipal/data/municipalMockData';

export const GC_SHARED_COLLECTION_STORAGE_KEY = 'gc_shared_collection_requests_v2';
export const GC_COLLECTION_SYNC_EVENT = 'gc-collection-requests-sync';

/**
 * Initializes and retrieves collection requests from shared localStorage.
 * If not yet initialized, merges the Admin mock data with the Kandy Municipal
 * Council collection requests.
 */
export function loadSharedCollectionRequests(): CollectionRequest[] {
  try {
    const raw = localStorage.getItem(GC_SHARED_COLLECTION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as CollectionRequest[];
      }
    }
  } catch {
    // Fallback to initial seed
  }

  // Merge Admin mock requests + Municipal mock requests
  const initial: CollectionRequest[] = [...MOCK_COLLECTION_REQUESTS];
  for (const mcr of MOCK_MUNICIPAL_COLLECTION_REQUESTS) {
    const existingIdx = initial.findIndex((r) => r.id === mcr.id);
    const converted: CollectionRequest = {
      id: mcr.id,
      citizenName: mcr.citizenName,
      citizenPhone: mcr.citizenPhone,
      citizenEmail: mcr.citizenEmail,
      municipality: mcr.municipality || 'Kandy Municipal Council',
      location: mcr.location,
      area: mcr.area,
      city: mcr.city,
      wasteType: mcr.wasteType,
      quantity: mcr.quantity,
      status: mcr.status as CollectionRequestStatus,
      requestedDate: mcr.requestedDate,
      requestedTime: mcr.requestedTime,
      notes: mcr.notes,
      assignedCollectorId: mcr.assignedCollectorId || mcr.collector?.id,
      assignedCollectorName: mcr.assignedCollectorName || mcr.collector?.name,
      collector: mcr.collector
        ? {
            id: mcr.collector.id,
            name: mcr.collector.name,
            collectorId: mcr.collector.collectorId,
            phone: mcr.collector.phone,
            assignedBy: 'Eng. Sunil Jayatissa (Municipal Officer)',
            assignedAt: `${mcr.requestedDate} — 10:00 AM`,
            vehicleType: mcr.collector.vehicleType,
          }
        : undefined,
      statusHistory: mcr.statusHistory.map((sh) => ({
        timestamp: sh.timestamp,
        date: sh.timestamp.split('—')[0]?.trim() || mcr.requestedDate,
        status: sh.status as CollectionRequestStatus,
        title: sh.title,
        description: sh.description,
        performedBy: sh.performedBy,
        role: sh.role,
      })),
    };

    if (existingIdx >= 0) {
      initial[existingIdx] = converted;
    } else {
      initial.push(converted);
    }
  }

  saveSharedCollectionRequests(initial, false);
  return initial;
}

/**
 * Persists updated collection requests to localStorage and dispatches a
 * cross-component sync event so all open views (Municipal, Admin, Collector)
 * immediately re-render with the latest data.
 */
export function saveSharedCollectionRequests(requests: CollectionRequest[], emit = true): void {
  try {
    localStorage.setItem(GC_SHARED_COLLECTION_STORAGE_KEY, JSON.stringify(requests));
  } catch {
    // Ignore storage quota or access issues in private browsing
  }
  if (emit) {
    window.dispatchEvent(new CustomEvent(GC_COLLECTION_SYNC_EVENT, { detail: requests }));
  }
}

/**
 * Assigns a collector to a pending request.
 * Transitions status strictly from 'Pending' -> 'In Progress' (never directly to 'Completed').
 */
export function assignCollectorToSharedRequest(
  requestId: string,
  collector: {
    id: string;
    name: string;
    collectorId: string;
    phone: string;
    vehicleType?: string;
  },
  performer = 'Eng. Sunil Jayatissa',
  performerRole = 'Municipal Officer',
): CollectionRequest[] {
  const current = loadSharedCollectionRequests();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const updated = current.map((r) => {
    if (r.id !== requestId) return r;

    const collectorInfo: CollectorInfo = {
      id: collector.id,
      name: collector.name,
      collectorId: collector.collectorId,
      phone: collector.phone,
      assignedBy: `${performer} (${performerRole})`,
      assignedAt: `${dateStr} — ${timeStr}`,
      vehicleType: collector.vehicleType,
    };

    const newHistory = [
      ...r.statusHistory,
      {
        timestamp: `${dateStr} — ${timeStr}`,
        date: dateStr,
        status: 'In Progress' as CollectionRequestStatus,
        title: 'Collector assigned',
        description: `${performerRole} ${performer} assigned request to ${collector.name} (${collector.collectorId}). Collection is now in progress.`,
        performedBy: performer,
        role: performerRole,
      },
    ];

    return {
      ...r,
      status: 'In Progress' as CollectionRequestStatus,
      assignedCollectorId: collector.id,
      assignedCollectorName: collector.name,
      collector: collectorInfo,
      statusHistory: newHistory,
    };
  });

  saveSharedCollectionRequests(updated, true);
  return updated;
}

/**
 * Marks a collection request as completed.
 * Used by Collector operations and depot intake.
 */
export function completeSharedCollectionRequest(
  requestId: string,
  meta?: {
    collectedBy?: string;
    completionNotes?: string;
    performer?: string;
    performerRole?: string;
  },
): CollectionRequest[] {
  const current = loadSharedCollectionRequests();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const updated = current.map((r) => {
    if (r.id !== requestId) return r;

    const collectorName = meta?.collectedBy || r.collector?.name || 'Assigned Collector';
    const performer = meta?.performer || collectorName;
    const performerRole = meta?.performerRole || 'Collector';

    const newHistory = [
      ...r.statusHistory,
      {
        timestamp: `${dateStr} — ${timeStr}`,
        date: dateStr,
        status: 'Completed' as CollectionRequestStatus,
        title: 'Collection completed',
        description: meta?.completionNotes || `Waste collection completed by ${collectorName}. Verified at disposal depot.`,
        performedBy: performer,
        role: performerRole,
      },
    ];

    return {
      ...r,
      status: 'Completed' as CollectionRequestStatus,
      completionInfo: {
        collectedBy: collectorName,
        collectedAt: `${dateStr} — ${timeStr}`,
        completedAt: `${dateStr} — ${timeStr}`,
        completionNotes: meta?.completionNotes || 'Physical collection completed and verified.',
      },
      statusHistory: newHistory,
    };
  });

  saveSharedCollectionRequests(updated, true);
  return updated;
}
