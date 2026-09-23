import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellOff,
  CheckCheck,
  Filter,
  ShieldCheck,
  Building2,
  User,
} from 'lucide-react';
import type { NotificationRole, AppNotification } from '@/shared/types/notification';
import { useNotifications } from '@/shared/data/notificationStore';
import { NotificationItem } from './NotificationItem';

export interface NotificationCenterProps {
  role: NotificationRole;
  title?: string;
  description?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  role,
  title,
  description,
}) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications(role);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getDefaultMeta = () => {
    switch (role) {
      case 'MUNICIPAL':
        return {
          title: 'Municipal Notifications & Dispatch Alerts',
          description:
            'Monitor incoming resident issue reports, collection requests, and facility capacity notices.',
          icon: <Building2 className="w-6 h-6 text-primary" />,
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'ADMIN':
        return {
          title: 'System Notifications & Platform Alerts',
          description:
            'Platform-wide audit events, municipal escalations, user management, and critical alerts.',
          icon: <ShieldCheck className="w-6 h-6 text-primary" />,
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        };
      default:
        return {
          title: 'Notifications & Citizen Alerts',
          description:
            'Track your complaint resolutions, garbage truck arrivals, and earned eco-points in real time.',
          icon: <User className="w-6 h-6 text-primary" />,
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
    }
  };

  const meta = getDefaultMeta();
  const pageTitle = title || meta.title;
  const pageDesc = description || meta.description;

  const displayedNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  const handleSelectNotification = (notif: AppNotification) => {
    markAsRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-xs shrink-0">
            {meta.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-content tracking-tight">
                {pageTitle}
              </h1>
              {unreadCount > 0 ? (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-200/80 text-xs font-bold">
                  All caught up
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-content-secondary mt-1 max-w-xl">
              {pageDesc}
            </p>
          </div>
        </div>

        {/* Header Action Button */}
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold text-content transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0 shadow-2xs self-end sm:self-center"
          >
            <CheckCheck className="w-4 h-4 text-primary" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-muted/60 text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'unread'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-muted/60 text-content-secondary hover:bg-muted hover:text-content'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-content-muted">
          <Filter className="w-3.5 h-3.5" />
          <span>Real-time cross-system synchronization</span>
        </div>
      </div>

      {/* Notifications List Card */}
      <div className="rounded-2xl border border-border/80 bg-surface shadow-xs divide-y divide-border/60 overflow-hidden">
        {displayedNotifications.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center mx-auto mb-3 text-content-muted shadow-2xs">
              <BellOff className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-content">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
            <p className="text-xs text-content-secondary mt-1 max-w-sm mx-auto">
              {filter === 'unread'
                ? 'You are up to date! Switch to "All" to review previous notifications.'
                : 'New alerts regarding issue reports, collection updates, and platform tasks will show up here.'}
            </p>
          </div>
        ) : (
          displayedNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onSelect={handleSelectNotification}
            />
          ))
        )}
      </div>
    </div>
  );
};
