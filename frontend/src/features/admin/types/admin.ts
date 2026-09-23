export type AdminRole = 'Citizen' | 'Municipal User' | 'Collector' | 'System Admin';
export type AdminUserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface SuspensionRecord {
  reason: string;
  note: string;
  suspendedAt: string;
  suspendedBy: string;
  suspendedByRole?: string;
}

export interface AccountActivityRecord {
  id: string;
  action: 'Suspended' | 'Restored' | 'Activated' | 'Created';
  date: string;
  performedBy: string;
  performedByRole?: string;
  reason?: string;
  note?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  municipality: string;
  status: AdminUserStatus;
  joinedDate: string;
  avatarUrl?: string;
  lastActive?: string;
  suspension?: SuspensionRecord;
  history?: AccountActivityRecord[];
}

export type MunicipalityStatus = 'Active' | 'Onboarding' | 'Pending';

export interface AdminMunicipality {
  id: string;
  name: string;
  code: string;
  province: string;
  district: string;
  contactOfficer: string;
  phone: string;
  email: string;
  usersCount: number;
  centersCount: number;
  complaintsCount: number;
  status: MunicipalityStatus;
  joinedDate: string;
  description?: string;
}

export type ComplaintCategory =
  | 'Missed Collection'
  | 'Illegal Dumping'
  | 'Overflowing Bin'
  | 'Hazardous Waste'
  | 'Facility Issue'
  | 'General Inquiry';

export type ComplaintPriority = 'High' | 'Medium' | 'Low';
export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';

export interface AdminComplaint {
  id: string;
  ticketNumber: string;
  submittedBy: string;
  citizenEmail: string;
  citizenPhone: string;
  municipality: string;
  location: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  date: string;
  time: string;
  description: string;
  assignedOfficer?: string;
  resolvedDate?: string;
  resolutionNotes?: string;
}

export type ActivityModule =
  | 'User Management'
  | 'Municipality Management'
  | 'Disposal Centers'
  | 'Complaints'
  | 'Settings'
  | 'Security';

export type ActivitySeverity = 'info' | 'success' | 'warning' | 'error';

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  title: string;
  description: string;
  module: ActivityModule;
  performedBy: string;
  performedByRole: string;
  ipAddress: string;
  severity: ActivitySeverity;
}

export interface UserGrowthPoint {
  month: string;
  users: number;
  growthPct: number;
}

export interface ComplaintDistribution {
  status: ComplaintStatus;
  count: number;
  color: string;
  percentage: number;
}

export interface AdminDashboardStats {
  totalUsers: {
    value: string;
    subtext: string;
    growth: string;
    isPositive: boolean;
  };
  municipalities: {
    value: number;
    active: number;
    subtext: string;
  };
  disposalCenters: {
    value: number;
    active: number;
    subtext: string;
  };
  complaints: {
    value: number;
    pending: number;
    subtext: string;
  };
}

export type AdminSidebarItem =
  | 'dashboard'
  | 'users'
  | 'municipalities'
  | 'disposal-centers'
  | 'collection-requests'
  | 'complaints'
  | 'notifications'
  | 'activity'
  | 'settings';
