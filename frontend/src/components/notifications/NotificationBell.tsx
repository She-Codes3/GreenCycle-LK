import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import type { NotificationRole } from '@/shared/types/notification';
import { useNotifications } from '@/shared/data/notificationStore';
import { NotificationPanel } from './NotificationPanel';

export interface NotificationBellProps {
  role: NotificationRole;
  recipientId?: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  role,
  recipientId,
  className = '',
  buttonClassName = '',
  iconClassName = 'h-4 w-4',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications(
    role,
    recipientId
  );

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const defaultBtnClasses =
    'relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-muted/60 hover:bg-muted text-content transition-all border border-border/60 hover:border-primary/40 active:translate-y-px';

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        aria-label="View notifications"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={buttonClassName || defaultBtnClasses}
      >
        <Bell className={iconClassName} strokeWidth={2} />

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-primary text-[9px] font-black text-white shadow-sm ring-2 ring-surface animate-in zoom-in-75">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <NotificationPanel
          role={role}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
