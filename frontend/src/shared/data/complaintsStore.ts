// ─── Shared Complaints Store ─────────────────────────────────────────────────
// Single localStorage-backed store for complaint/report records.
// Pattern mirrors the existing collectionStore.ts.
//
// All three dashboards (Resident, Municipal, Admin) read from and write to
// this shared store so that a single report record flows through the entire
// lifecycle without duplication.

import type {
  SharedComplaint,
  ComplaintStatus,
  ComplaintCategory,
  ComplaintPriority,
  ComplaintStatusHistoryEntry,
} from '../types/complaint';

import { MOCK_ADMIN_COMPLAINTS } from '@/features/admin/data/adminMockData';
import { MOCK_MUNICIPAL_COMPLAINTS } from '@/features/municipal/data/municipalMockData';
import { createNotification } from './notificationStore';

// ── Constants ─────────────────────────────────────────────────────────────────
export const GC_SHARED_COMPLAINTS_STORAGE_KEY = 'gc_shared_complaints_v2';
export const GC_COMPLAINTS_SYNC_EVENT = 'gc-complaints-sync';

// ── Seed data mapping ─────────────────────────────────────────────────────────

/** Map legacy status strings to new ComplaintStatus */
function mapLegacyStatus(status: string): ComplaintStatus {
  const normalized = status.trim().toUpperCase().replace(/\s+/g, '_');
  const map: Record<string, ComplaintStatus> = {
    PENDING: 'SUBMITTED',
    SUBMITTED: 'SUBMITTED',
    UNDER_REVIEW: 'UNDER_REVIEW',
    IN_PROGRESS: 'IN_PROGRESS',
    ASSIGNED: 'ASSIGNED',
    RESOLVED: 'RESOLVED',
    REJECTED: 'CLOSED',
    CLOSED: 'CLOSED',
  };
  return map[normalized] || 'SUBMITTED';
}

/** Map legacy category to the shared union. Non-matching categories map to closest fit. */
function mapCategory(cat: string): ComplaintCategory {
  const map: Record<string, ComplaintCategory> = {
    'Missed Collection': 'Missed Collection',
    'Illegal Dumping': 'Illegal Dumping',
    'Overflowing Bin': 'Overflowing Bin',
    'Hazardous Waste': 'Waste Accumulation',
    'Facility Issue': 'Damaged Bin',
    'General Inquiry': 'Waste Accumulation',
    'Damaged Bin': 'Damaged Bin',
    'Waste Accumulation': 'Waste Accumulation',
  };
  return map[cat] || 'Waste Accumulation';
}

function buildSeedData(): SharedComplaint[] {
  const complaints: SharedComplaint[] = [];
  const seenIds = new Set<string>();

  // Convert Admin mock complaints
  for (const c of MOCK_ADMIN_COMPLAINTS) {
    seenIds.add(c.id);
    const status = mapLegacyStatus(c.status);
    complaints.push({
      id: c.id,
      ticketNumber: c.ticketNumber,
      submittedBy: c.submittedBy,
      citizenEmail: c.citizenEmail,
      citizenPhone: c.citizenPhone,
      location: c.location,
      municipality: c.municipality,
      category: mapCategory(c.category),
      priority: c.priority as ComplaintPriority,
      status,
      description: c.description,
      evidenceUrls: [],
      date: c.date,
      time: c.time,
      assignedOfficer: c.assignedOfficer,
      resolvedDate: c.resolvedDate,
      resolutionNotes: c.resolutionNotes,
      statusHistory: [
        {
          timestamp: `${c.date} — ${c.time}`,
          status: 'SUBMITTED',
          title: 'Report submitted',
          description: `Citizen ${c.submittedBy} submitted a complaint: ${c.category}.`,
          performedBy: c.submittedBy,
          role: 'Citizen',
        },
        ...(status !== 'SUBMITTED'
          ? [
              {
                timestamp: `${c.date} — ${c.time}`,
                status,
                title: `Status updated to ${status.replace(/_/g, ' ').toLowerCase()}`,
                description: c.resolutionNotes || `Status changed to ${status}.`,
                performedBy: c.assignedOfficer || 'Municipal Officer',
                role: 'Municipal Officer',
              } as ComplaintStatusHistoryEntry,
            ]
          : []),
      ],
    });
  }

  // Convert Municipal mock complaints (skip duplicates by ID)
  for (const c of MOCK_MUNICIPAL_COMPLAINTS) {
    if (seenIds.has(c.id)) continue;
    seenIds.add(c.id);
    const status = mapLegacyStatus(c.status);
    complaints.push({
      id: c.id,
      ticketNumber: c.ticketNumber,
      submittedBy: c.submittedBy,
      citizenEmail: c.citizenEmail,
      citizenPhone: c.citizenPhone,
      location: c.location,
      municipality: 'Kandy Municipal Council',
      category: mapCategory(c.category),
      priority: c.priority as ComplaintPriority,
      status,
      description: c.description,
      evidenceUrls: [],
      date: c.date,
      time: c.time,
      assignedOfficer: c.assignedOfficer,
      resolvedDate: c.resolvedDate,
      resolutionNotes: c.resolutionNotes,
      statusHistory: [
        {
          timestamp: `${c.date} — ${c.time}`,
          status: 'SUBMITTED',
          title: 'Report submitted',
          description: `Citizen ${c.submittedBy} submitted a complaint: ${c.category}.`,
          performedBy: c.submittedBy,
          role: 'Citizen',
        },
        ...(status !== 'SUBMITTED'
          ? [
              {
                timestamp: `${c.date} — ${c.time}`,
                status,
                title: `Status updated to ${status.replace(/_/g, ' ').toLowerCase()}`,
                description: c.resolutionNotes || `Status changed to ${status}.`,
                performedBy: c.assignedOfficer || 'Municipal Officer',
                role: 'Municipal Officer',
              } as ComplaintStatusHistoryEntry,
            ]
          : []),
      ],
    });
  }

  return complaints;
}

// ── Core store operations ─────────────────────────────────────────────────────

/**
 * Loads all complaints from localStorage. Falls back to merged seed data
 * from the existing Admin + Municipal mock datasets on first load.
 */
export function loadSharedComplaints(): SharedComplaint[] {
  try {
    const raw = localStorage.getItem(GC_SHARED_COMPLAINTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as SharedComplaint[];
      }
    }
  } catch {
    // fallback
  }

  const seed = buildSeedData();
  saveSharedComplaints(seed, false);
  return seed;
}

/**
 * Persists updated complaints to localStorage and dispatches a cross-component
 * sync event so all open views (Resident, Municipal, Admin) immediately
 * re-render with the latest data.
 */
export function saveSharedComplaints(complaints: SharedComplaint[], emit = true): void {
  try {
    localStorage.setItem(GC_SHARED_COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
  } catch {
    // ignore
  }
  if (emit) {
    window.dispatchEvent(new CustomEvent(GC_COMPLAINTS_SYNC_EVENT, { detail: complaints }));
  }
}

// ── Ticket number generator ───────────────────────────────────────────────────
let _ticketSeq = 100;

function nextTicketNumber(): string {
  const existing = loadSharedComplaints();
  // Find highest numeric ticket suffix
  for (const c of existing) {
    const match = c.ticketNumber.match(/RPT-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= _ticketSeq) _ticketSeq = num + 1;
    }
  }
  const ticket = `RPT-${String(_ticketSeq).padStart(3, '0')}`;
  _ticketSeq++;
  return ticket;
}

// ── Resident actions ──────────────────────────────────────────────────────────

export interface SubmitComplaintPayload {
  category: ComplaintCategory;
  description: string;
  location: string;
  municipality: string;
  latitude?: number;
  longitude?: number;
  evidenceUrls: string[];
  submittedBy: string;
  citizenEmail: string;
  citizenPhone: string;
  priority?: ComplaintPriority;
}

/**
 * Creates a new complaint from a resident submission.
 * Appends to shared store, returns the created complaint.
 */
export function submitNewComplaint(payload: SubmitComplaintPayload): SharedComplaint {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const complaint: SharedComplaint = {
    id: `RPT-${Date.now()}`,
    ticketNumber: nextTicketNumber(),
    submittedBy: payload.submittedBy,
    citizenEmail: payload.citizenEmail,
    citizenPhone: payload.citizenPhone,
    location: payload.location,
    municipality: payload.municipality,
    latitude: payload.latitude,
    longitude: payload.longitude,
    category: payload.category,
    priority: payload.priority || 'Medium',
    status: 'SUBMITTED',
    description: payload.description,
    evidenceUrls: payload.evidenceUrls,
    date: dateStr,
    time: timeStr,
    statusHistory: [
      {
        timestamp: `${dateStr} — ${timeStr}`,
        status: 'SUBMITTED',
        title: 'Report submitted',
        description: `Citizen ${payload.submittedBy} submitted a complaint: ${payload.category} at ${payload.location}.`,
        performedBy: payload.submittedBy,
        role: 'Citizen',
      },
    ],
  };

  const existing = loadSharedComplaints();
  const updated = [complaint, ...existing];
  saveSharedComplaints(updated);

  // ── Dispatch notifications across roles ─────────────────────────────────────
  // 1. Resident Confirmation
  createNotification({
    recipientId: complaint.submittedBy,
    recipientRole: 'RESIDENT',
    type: 'complaint',
    title: 'Report Submitted',
    message: `Your complaint ${complaint.ticketNumber} (${complaint.category}) has been submitted successfully.`,
    relatedEntityType: 'complaint',
    relatedEntityId: complaint.id,
    link: `/my-reports/${complaint.id}`,
  });

  // 2. Municipal Alert
  createNotification({
    recipientId: 'Eng. Sunil Jayatissa',
    recipientRole: 'MUNICIPAL',
    type: 'complaint',
    title: 'New Complaint Received',
    message: `A new resident complaint ${complaint.ticketNumber} (${complaint.category}) was submitted in ${complaint.municipality || 'Colombo'} and requires review.`,
    relatedEntityType: 'complaint',
    relatedEntityId: complaint.id,
    link: '/municipal/complaints',
  });

  // 3. Admin System Log
  createNotification({
    recipientId: 'Eng. Anura Jayasinghe',
    recipientRole: 'ADMIN',
    type: 'complaint',
    title: 'New Complaint Reported',
    message: `A new resident complaint ${complaint.ticketNumber} was reported in ${complaint.municipality || 'Western Province'}.`,
    relatedEntityType: 'complaint',
    relatedEntityId: complaint.id,
    link: '/admin/complaints',
  });

  return complaint;
}

// ── Municipal / Admin actions ─────────────────────────────────────────────────

/**
 * Updates the status of an existing complaint.
 * Appends a status-history entry and persists.
 */
export function updateSharedComplaintStatus(
  complaintId: string,
  newStatus: ComplaintStatus,
  performer: string,
  performerRole: string,
  notes?: string,
  assignedOfficer?: string,
): SharedComplaint[] {
  const current = loadSharedComplaints();
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  let targetComplaint: SharedComplaint | undefined;

  const updated = current.map((c) => {
    if (c.id !== complaintId) return c;

    targetComplaint = c;

    const historyEntry: ComplaintStatusHistoryEntry = {
      timestamp: `${dateStr} — ${timeStr}`,
      status: newStatus,
      title: `Status updated to ${newStatus.replace(/_/g, ' ').toLowerCase()}`,
      description: notes || `Status changed to ${newStatus.replace(/_/g, ' ')}.`,
      performedBy: performer,
      role: performerRole,
    };

    return {
      ...c,
      status: newStatus,
      statusHistory: [...c.statusHistory, historyEntry],
      ...(assignedOfficer ? { assignedOfficer } : {}),
      ...(newStatus === 'RESOLVED' || newStatus === 'CLOSED'
        ? { resolvedDate: dateStr, resolutionNotes: notes || '' }
        : {}),
    };
  });

  saveSharedComplaints(updated);

  // ── Dispatch notifications based on status transition ───────────────────────
  if (targetComplaint) {
    const ticket = targetComplaint.ticketNumber;

    let resTitle = 'Complaint Status Updated';
    let resMsg = `Your complaint ${ticket} status has been updated to ${newStatus.replace(/_/g, ' ').toLowerCase()}.`;

    if (newStatus === 'UNDER_REVIEW') {
      resTitle = 'Report Under Review';
      resMsg = `Your complaint ${ticket} is now being reviewed by the municipal team.`;
    } else if (newStatus === 'ASSIGNED') {
      resTitle = 'Report Assigned';
      resMsg = `Your complaint ${ticket} has been assigned for action${assignedOfficer ? ` to ${assignedOfficer}` : ''}.`;
    } else if (newStatus === 'IN_PROGRESS') {
      resTitle = 'Report In Progress';
      resMsg = `Work on your complaint ${ticket} is now in progress.`;
    } else if (newStatus === 'RESOLVED') {
      resTitle = 'Report Resolved';
      resMsg = `Your complaint ${ticket} has been resolved.${notes ? ` Notes: ${notes}` : ''}`;
    } else if (newStatus === 'CLOSED') {
      resTitle = 'Report Closed';
      resMsg = `Your complaint ${ticket} has been closed.${notes ? ` Notes: ${notes}` : ''}`;
    }

    createNotification({
      recipientId: targetComplaint.submittedBy,
      recipientRole: 'RESIDENT',
      type: 'status_update',
      title: resTitle,
      message: resMsg,
      relatedEntityType: 'complaint',
      relatedEntityId: targetComplaint.id,
      link: `/my-reports/${targetComplaint.id}`,
    });

    if (assignedOfficer) {
      createNotification({
        recipientId: 'Eng. Sunil Jayatissa',
        recipientRole: 'MUNICIPAL',
        type: 'complaint',
        title: 'Complaint Assigned',
        message: `Complaint ${ticket} has been assigned to ${assignedOfficer}.`,
        relatedEntityType: 'complaint',
        relatedEntityId: targetComplaint.id,
        link: '/municipal/complaints',
      });
    }
  }

  return updated;
}
