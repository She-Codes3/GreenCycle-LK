import React, { useEffect } from 'react';
import { cn } from './utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'bottom';
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const placementClasses = {
  left: {
    container: 'inset-y-0 left-0',
    translateClosed: '-translate-x-full',
    translateOpen: 'translate-x-0',
    dimensions: {
      sm: 'w-72',
      md: 'w-96',
      lg: 'w-[32rem]',
    },
  },
  right: {
    container: 'inset-y-0 right-0',
    translateClosed: 'translate-x-full',
    translateOpen: 'translate-x-0',
    dimensions: {
      sm: 'w-72',
      md: 'w-96',
      lg: 'w-[32rem]',
    },
  },
  bottom: {
    container: 'inset-x-0 bottom-0 max-h-[85vh]',
    translateClosed: 'translate-y-full',
    translateOpen: 'translate-y-0',
    dimensions: {
      sm: 'h-64',
      md: 'h-96',
      lg: 'h-[32rem]',
    },
  },
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  title,
  children,
  size = 'md',
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

  const config = placementClasses[placement];

  return (
    <div
      className={cn(
        'fixed inset-0 z-modal transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-content/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed bg-surface border-border shadow-elevated flex flex-col transition-transform duration-300 ease-in-out',
          config.container,
          config.dimensions[size],
          isOpen ? config.translateOpen : config.translateClosed,
          placement === 'left' && 'border-r',
          placement === 'right' && 'border-l',
          placement === 'bottom' && 'border-t rounded-t-2xl',
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-base font-semibold text-content">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1 rounded-lg text-content-muted hover:text-content hover:bg-muted transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
