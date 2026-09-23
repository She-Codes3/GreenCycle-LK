import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import type { AppNotification, NotificationRole } from '@/shared/types/notification';
import { NotificationItem } from './NotificationItem';

export interface NotificationPanelProps {
  role: NotificationRole;
  notifications: AppNotification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  role,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}) => {
  const navigate = useNavigate();

  const title =
    role === 'ADMIN'
      ? 'Admin Notifications'
      : role === 'MUNICIPAL'
      ? 'Municipal Notifications'
      : 'Notifications';

  const viewAllLink =
    role === 'ADMIN'
      ? '/admin/complaints'
      : role === 'MUNICIPAL'
      ? '/municipal/complaints'
      : '/my-reports';

  const viewAllText =
    role === 'ADMIN'
      ? 'View All Complaints →'
      : role === 'MUNICIPAL'
      ? 'View All Municipal Complaints →'
      : 'View My Reports →';

  const handleSelect = (notif: AppNotification) => {
    onMarkAsRead(notif.id);
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div
      role="dialog"
      aria-label={title}
      className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-2xl bg-surface border border-border shadow-elevated z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="p-3.5 border-b border-border/80 flex items-center justify-between bg-muted/40">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xs text-content">{title}</span>
          {unreadCount > 0 && (
            <span className="bg-primary-light text-primary border border-primary/20 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-bold transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border/50 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-content">You&apos;re all caught up!</p>
            <p className="text-[11px] text-content-secondary max-w-[200px] mx-auto">
              No new notifications at this time.
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-border/80 bg-muted/20 text-center">
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate(viewAllLink);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline py-0.5 transition-colors"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
