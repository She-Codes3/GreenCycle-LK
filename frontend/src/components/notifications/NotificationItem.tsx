import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Package,
  Gift,
  Bell,
  ChevronRight,
} from 'lucide-react';
import type { AppNotification } from '@/shared/types/notification';

export interface NotificationItemProps {
  notification: AppNotification;
  onSelect: (notification: AppNotification) => void;
}

function formatRelativeTime(dateIso: string): string {
  try {
    const now = Date.now();
    const then = new Date(dateIso).getTime();
    if (isNaN(then)) return dateIso;

    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Date(dateIso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateIso;
  }
}

function getNotificationIcon(type: AppNotification['type']) {
  switch (type) {
    case 'complaint':
      return {
        icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
        bg: 'bg-amber-50 border-amber-200',
      };
    case 'status_update':
      return {
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
        bg: 'bg-emerald-50 border-emerald-200',
      };
    case 'collection':
      return {
        icon: <Truck className="w-4 h-4 text-sky-600" />,
        bg: 'bg-sky-50 border-sky-200',
      };
    case 'pickup':
      return {
        icon: <Package className="w-4 h-4 text-indigo-600" />,
        bg: 'bg-indigo-50 border-indigo-200',
      };
    case 'reward':
      return {
        icon: <Gift className="w-4 h-4 text-amber-500" />,
        bg: 'bg-amber-50 border-amber-200',
      };
    case 'capacity':
      return {
        icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
        bg: 'bg-rose-50 border-rose-200',
      };
    default:
      return {
        icon: <Bell className="w-4 h-4 text-primary" />,
        bg: 'bg-primary-light border-primary/20',
      };
  }
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onSelect,
}) => {
  const { icon, bg } = getNotificationIcon(notification.type);
  const timeStr = formatRelativeTime(notification.createdAt);

  return (
    <div
      onClick={() => onSelect(notification)}
      className={`group relative flex items-start gap-3 p-3.5 transition-all cursor-pointer hover:bg-muted/70 ${
        !notification.isRead ? 'bg-primary-light/15 hover:bg-primary-light/30' : ''
      }`}
    >
      {/* Type Icon */}
      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${bg}`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <p
            className={`text-xs leading-snug truncate ${
              !notification.isRead
                ? 'font-bold text-content'
                : 'font-semibold text-content-secondary'
            }`}
          >
            {notification.title}
          </p>
          <span className="text-[10px] text-content-muted whitespace-nowrap shrink-0">
            {timeStr}
          </span>
        </div>

        <p className="text-[11px] text-content-secondary line-clamp-2 leading-relaxed">
          {notification.message}
        </p>
      </div>

      {/* Unread indicator dot or link indicator */}
      <div className="shrink-0 flex items-center self-center pl-1">
        {!notification.isRead ? (
          <span
            className="w-2 h-2 rounded-full bg-primary ring-2 ring-surface shadow-xs"
            title="Unread"
          />
        ) : notification.link ? (
          <ChevronRight className="w-3.5 h-3.5 text-content-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : null}
      </div>
    </div>
  );
};
