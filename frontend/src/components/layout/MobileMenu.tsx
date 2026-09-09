import React, { useEffect } from 'react';
import { cn } from '../ui/utils';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  brandName?: string;
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  children,
  brandName = 'GreenCycle LK',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        data-open={isOpen}
        onClick={onClose}
        className="ui-mobile-menu-backdrop"
        aria-hidden="true"
      />

      {/* Slide-out Menu Panel */}
      <aside
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        className={cn('ui-mobile-menu flex flex-col', className)}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-sm shadow-sm">
              🌱
            </div>
            <span className="font-bold text-sm text-content">{brandName}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 rounded-lg text-content-muted hover:text-content hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1" onClick={onClose}>
          {children}
        </div>
      </aside>
    </>
  );
};
