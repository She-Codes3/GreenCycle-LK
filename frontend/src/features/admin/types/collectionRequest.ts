export type CollectionRequestStatus =
  | 'Pending'
  | 'Assigned'
  | 'In Progress'
  | 'Collected'
  | 'Completed'
  | 'Cancelled';

export type CollectionWasteType =
  | 'Household Waste'
  | 'Recyclable Plastics'
  | 'E-Waste / Electronics'
  | 'Bulky Items'
  | 'Organic / Compost'
  | 'Paper & Cardboard'
  | 'Glass Waste';

export interface CollectorInfo {
  id: string;
  name: string;
  collectorId: string;
  phone: string;
  assignedBy: string;
  assignedAt: string;
  avatarUrl?: string;
  vehicleType?: string;
}

export interface CollectionStatusHistoryEntry {
  timestamp: string;
  date: string;
  status: CollectionRequestStatus;
  title: string;
  description: string;
  performedBy: string;
  role: string;
}

export interface CollectionCompletionInfo {
  collectedBy: string;
  collectedAt: string;
  completedAt: string;
  completionNotes?: string;
}

export interface CollectionRequest {
  id: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail?: string;
  municipality: string;
  location: string;
  area: string;
  city: string;
  wasteType: CollectionWasteType | string;
  quantity: string;
  status: CollectionRequestStatus;
  requestedDate: string;
  requestedTime: string;
  notes?: string;
  assignedCollectorId?: string;
  assignedCollectorName?: string;
  collector?: CollectorInfo;
  statusHistory: CollectionStatusHistoryEntry[];
  completionInfo?: CollectionCompletionInfo;
}
