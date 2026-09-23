// ─── Shared Complaint / Report Types ─────────────────────────────────────────
// Consumed by Resident, Municipal, and Admin features. Any downstream
// feature-specific type should be derived from (or aliased to) these.

export type ComplaintStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED';

export type ComplaintCategory =
  | 'Illegal Dumping'
  | 'Overflowing Bin'
  | 'Missed Collection'
  | 'Damaged Bin'
  | 'Waste Accumulation';

export type ComplaintPriority = 'High' | 'Medium' | 'Low';

export interface ComplaintStatusHistoryEntry {
  timestamp: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  performedBy: string;
  role: string;
}

export interface SharedComplaint {
  id: string;
  ticketNumber: string;

  // Reporter identity
  submittedBy: string;
  citizenEmail: string;
  citizenPhone: string;

  // Location
  location: string;
  municipality: string;
  latitude?: number;
  longitude?: number;

  // Issue details
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  description: string;
  evidenceUrls: string[]; // base64 data-urls or remote urls

  // Timestamps
  date: string; // YYYY-MM-DD
  time: string; // e.g. "08:30 AM"

  // Assignment & resolution
  assignedOfficer?: string;
  resolvedDate?: string;
  resolutionNotes?: string;

  // Full status history
  statusHistory: ComplaintStatusHistoryEntry[];
}

/** Human-readable labels for every status */
export const COMPLAINT_STATUS_LABELS: Record<ComplaintStatus, string> = {
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

/** Ordered list of statuses for progress visualisation */
export const COMPLAINT_STATUS_ORDER: ComplaintStatus[] = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
];

/** All supported issue categories */
export const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  'Illegal Dumping',
  'Overflowing Bin',
  'Missed Collection',
  'Damaged Bin',
  'Waste Accumulation',
];
