// ─── Shared Notification Store ───────────────────────────────────────────────
// Single localStorage-backed store for all notifications (Resident, Municipal, Admin).
// Designed for clean substitution with REST API & WebSocket when backend is connected.

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { AppNotification, NotificationRole } from '../types/notification';

export const GC_NOTIFICATIONS_STORAGE_KEY = 'gc_shared_notifications_v1';
export const GC_NOTIFICATIONS_SYNC_EVENT = 'gc-notifications-sync';

// ── Initial Seed Data ─────────────────────────────────────────────────────────
const SEED_NOTIFICATIONS: AppNotification[] = [
  // Resident Seeds
  {
    id: 'notif-res-1',
    recipientId: 'Kasun Perera',
    recipientRole: 'RESIDENT',
    type: 'collection',
    title: 'Truck Approaching Your Lane',
    message: 'Organic collection truck LK-WP-8921 is approximately 10 minutes away from your street.',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    link: '/resident/tracking',
  },
  {
    id: 'notif-res-2',
    recipientId: 'Kasun Perera',
    recipientRole: 'RESIDENT',
    type: 'pickup',
    title: 'Bulky Pickup Approved',
    message: 'Your scheduled e-waste collection has been assigned for tomorrow at 9:30 AM.',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    link: '/resident/pickup',
  },
  {
    id: 'notif-res-3',
    recipientId: 'Kasun Perera',
    recipientRole: 'RESIDENT',
    type: 'reward',
    title: '+50 Green Points Earned!',
    message: 'Verified drop-off at Town Hall Recycling Center. Your new balance is 680 GP.',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    link: '/resident/rewards',
  },

  // Municipal Seeds
  {
    id: 'notif-mun-1',
    recipientId: 'Eng. Sunil Jayatissa',
    recipientRole: 'MUNICIPAL',
    type: 'complaint',
    title: 'Complaint MCMP-004 Reported',
    message: 'Hazardous waste reported at Asgiriya requires immediate inspection.',
    relatedEntityType: 'complaint',
    relatedEntityId: 'MCMP-004',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    link: '/municipal/complaints',
  },
  {
    id: 'notif-mun-2',
    recipientId: 'Eng. Sunil Jayatissa',
    recipientRole: 'MUNICIPAL',
    type: 'collection',
    title: 'New Collection Request',
    message: 'New request from Dilini Samarasekera for recyclable cardboard.',
    isRead: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    link: '/municipal/collection-requests',
  },
  {
    id: 'notif-mun-3',
    recipientId: 'Eng. Sunil Jayatissa',
    recipientRole: 'MUNICIPAL',
    type: 'capacity',
    title: 'Drop-off Station High Capacity',
    message: 'Ampitiya Drop-off Station reached 88% capacity.',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    link: '/municipal/disposal-centers',
  },

  // Admin Seeds
  {
    id: 'notif-adm-1',
    recipientId: 'Eng. Anura Jayasinghe',
    recipientRole: 'ADMIN',
    type: 'complaint',
    title: 'New Urgent Complaint Logged',
    message: 'Complaint CMP-2026-001 reported illegal chemical dumping near Hamilton Canal.',
    relatedEntityType: 'complaint',
    relatedEntityId: 'CMP-2026-001',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    link: '/admin/complaints',
  },
  {
    id: 'notif-adm-2',
    recipientId: 'Eng. Anura Jayasinghe',
    recipientRole: 'ADMIN',
    type: 'capacity',
    title: 'Center DC006 at 85% Capacity',
    message: 'Disposal Center DC006 reached critical operating threshold.',
    isRead: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    link: '/admin/disposal-centers',
  },
  {
    id: 'notif-adm-3',
    recipientId: 'Eng. Anura Jayasinghe',
    recipientRole: 'ADMIN',
    type: 'system',
    title: 'KMC Solid Waste Manifest Uploaded',
    message: 'Quarterly environmental audit log submitted by Kandy Municipal Council.',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    link: '/admin/activity',
  },
];

// ── Storage Helpers ───────────────────────────────────────────────────────────

export function loadNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(GC_NOTIFICATIONS_STORAGE_KEY);
    if (!raw) {
      saveNotifications(SEED_NOTIFICATIONS);
      return SEED_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveNotifications(SEED_NOTIFICATIONS);
    return SEED_NOTIFICATIONS;
  } catch {
    return SEED_NOTIFICATIONS;
  }
}

export function saveNotifications(notifications: AppNotification[]): void {
  try {
    localStorage.setItem(GC_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // ignore localStorage errors
  }
  emitSyncEvent();
}

function emitSyncEvent(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(GC_NOTIFICATIONS_SYNC_EVENT));
  }
}

// ── Query Functions ───────────────────────────────────────────────────────────

export function getNotificationsForRole(
  role: NotificationRole,
  recipientId?: string
): AppNotification[] {
  const all = loadNotifications();
  return all
    .filter((n) => {
      if (n.recipientRole !== role) return false;
      if (recipientId && n.recipientId && n.recipientId !== recipientId) {
        // Allow general role broadcasts if recipientId is not specified or matches
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUnreadCount(role: NotificationRole, recipientId?: string): number {
  return getNotificationsForRole(role, recipientId).filter((n) => !n.isRead).length;
}

// ── Mutation Functions ────────────────────────────────────────────────────────

export function markAsRead(id: string): AppNotification[] {
  const all = loadNotifications();
  const updated = all.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  saveNotifications(updated);
  return updated;
}

export function markAllAsRead(role: NotificationRole, recipientId?: string): AppNotification[] {
  const all = loadNotifications();
  const updated = all.map((n) => {
    if (n.recipientRole !== role) return n;
    if (recipientId && n.recipientId && n.recipientId !== recipientId) return n;
    return { ...n, isRead: true };
  });
  saveNotifications(updated);
  return updated;
}

export function createNotification(
  payload: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>
): AppNotification {
  const newNotif: AppNotification = {
    ...payload,
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };

  const all = loadNotifications();
  const updated = [newNotif, ...all];
  saveNotifications(updated);
  return newNotif;
}

// ── React Hook ────────────────────────────────────────────────────────────────

export function useNotifications(role: NotificationRole, recipientId?: string) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    getNotificationsForRole(role, recipientId)
  );

  const refresh = useCallback(() => {
    setNotifications(getNotificationsForRole(role, recipientId));
  }, [role, recipientId]);

  useEffect(() => {
    refresh();
    const handleSync = () => refresh();
    window.addEventListener(GC_NOTIFICATIONS_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(GC_NOTIFICATIONS_SYNC_EVENT, handleSync);
  }, [refresh]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const handleMarkAsRead = useCallback((id: string) => {
    markAsRead(id);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsRead(role, recipientId);
  }, [role, recipientId]);

  return {
    notifications,
    unreadCount,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    refresh,
  };
}
