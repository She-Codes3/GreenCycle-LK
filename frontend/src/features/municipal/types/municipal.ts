export type MunicipalSidebarItem =
  | 'dashboard'
  | 'collection-requests'
  | 'disposal-centers'
  | 'collectors'
  | 'complaints'
  | 'notifications'
  | 'schedule'
  | 'activity'
  | 'settings';

export type CollectorStatus = 'Active' | 'On Leave' | 'Inactive';

export interface MunicipalCollector {
  id: string;
  name: string;
  phone: string;
  email: string;
  collectorId: string;
  zone: string;
  status: CollectorStatus;
  vehicleType: string;
  vehicleNumber: string;
  completedToday: number;
  totalCompleted: number;
  joinedDate: string;
  avatarUrl?: string;
}

export type ScheduleStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

export interface MunicipalScheduleEntry {
  id: string;
  day: string;
  zone: string;
  route: string;
  collectorName: string;
  collectorId: string;
  wasteType: string;
  timeSlot: string;
  status: ScheduleStatus;
}

export type MunicipalComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
export type MunicipalComplaintCategory =
  | 'Missed Collection'
  | 'Illegal Dumping'
  | 'Overflowing Bin'
  | 'Hazardous Waste'
  | 'Facility Issue'
  | 'General Inquiry';
export type MunicipalComplaintPriority = 'High' | 'Medium' | 'Low';

export interface MunicipalComplaint {
  id: string;
  ticketNumber: string;
  submittedBy: string;
  citizenEmail: string;
  citizenPhone: string;
  location: string;
  category: MunicipalComplaintCategory;
  priority: MunicipalComplaintPriority;
  status: MunicipalComplaintStatus;
  date: string;
  time: string;
  description: string;
  assignedOfficer?: string;
  resolvedDate?: string;
  resolutionNotes?: string;
}

export interface MunicipalDisposalCenter {
  id: string;
  name: string;
  address: string;
  zone: string;
  capacityPercent: number;
  wasteTypesAccepted: string[];
  operatingHours: string;
  contactPhone: string;
  status: 'Operational' | 'Maintenance' | 'Closed';
  latitude?: number;
  longitude?: number;
}

export type MunicipalActivityModule =
  | 'Collection Requests'
  | 'Collectors'
  | 'Disposal Centers'
  | 'Complaints'
  | 'Schedule'
  | 'Settings';

export type MunicipalActivitySeverity = 'info' | 'success' | 'warning' | 'error';

export interface MunicipalActivityLog {
  id: string;
  timestamp: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  title: string;
  description: string;
  module: MunicipalActivityModule;
  performedBy: string;
  performedByRole: string;
  severity: MunicipalActivitySeverity;
}

export interface MunicipalDashboardStats {
  totalCollectionRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedToday: number;
  activeCollectors: number;
  totalCollectors: number;
  disposalCenters: number;
  activeComplaints: number;
}

export interface MunicipalCollectionRequest {
  id: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail?: string;
  location: string;
  area: string;
  city: string;
  wasteType: string;
  quantity: string;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Collected' | 'Completed' | 'Cancelled';
  requestedDate: string;
  requestedTime: string;
  notes?: string;
  municipality?: string;
  assignedCollectorId?: string;
  assignedCollectorName?: string;
  collector?: {
    id: string;
    name: string;
    collectorId: string;
    phone: string;
    vehicleType?: string;
  };
  statusHistory: Array<{
    timestamp: string;
    status: string;
    title: string;
    description: string;
    performedBy: string;
    role: string;
  }>;
}
