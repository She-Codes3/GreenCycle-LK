export type Role = 'RESIDENT' | 'COLLECTOR' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  district?: string;
  province?: string;
  nic?: string;
  employeeId?: string;
  municipality?: string;
  assignedZone?: string;
  designation?: string;
  employmentType?: string;
  username?: string;
  organizationName?: string;
  collectorType?: string;
  brNumber?: string;
  acceptedWasteTypes?: string[];
  serviceModes?: string[];
  operatingArea?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
