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
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
