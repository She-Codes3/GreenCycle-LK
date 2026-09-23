// ─── Notification Types ───────────────────────────────────────────────────────
// Shared across Resident, Municipal, and Administrator dashboards.

export type NotificationRole = 'RESIDENT' | 'MUNICIPAL' | 'ADMIN';

export type NotificationType =
  | 'complaint'
  | 'status_update'
  | 'collection'
  | 'pickup'
  | 'reward'
  | 'capacity'
  | 'announcement'
  | 'system';

export interface AppNotification {
  id: string;
  recipientId: string;
  recipientRole: NotificationRole;
  type: NotificationType;
  title: string;
  message: string;
  relatedEntityType?: 'complaint' | 'collection' | 'depot' | 'user';
  relatedEntityId?: string;
  isRead: boolean;
  createdAt: string; // ISO 8601 timestamp
  link?: string;
}
