export type ResidentSidebarItem =
  | 'dashboard'
  | 'schedule'
  | 'tracking'
  | 'scanner'
  | 'pickup'
  | 'disposal-centers'
  | 'rewards'
  | 'reports'
  | 'notifications'
  | 'settings';

export type NotificationCategory = 'collection' | 'pickup' | 'reward' | 'alert' | 'system';

export interface ResidentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: NotificationCategory;
  isRead: boolean;
  link?: string;
}

export interface ResidentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  municipality: string;
  zone: string;
  address: string;
  greenPoints: number;
  ecoLevel: string;
  rankTitle: string;
  avatarUrl?: string;
  monthlyRecycledKg: number;
  streakDays: number;
}

export interface ResidentBreadcrumb {
  label: string;
  href?: string;
}

export interface ResidentLayoutProps {
  children?: React.ReactNode;
  activeItem?: ResidentSidebarItem;
  pageTitle?: string;
  pageSubtitle?: string;
  breadcrumbs?: ResidentBreadcrumb[];
  onLogout?: () => void;
  className?: string;
  contentClassName?: string;
  showBottomNav?: boolean;
}
