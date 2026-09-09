import React, { useState, useRef, useEffect } from 'react';
import { cn } from './utils';

export interface DropdownProps {
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  align = 'left',
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            'absolute z-dropdown mt-2 min-w-48 rounded-xl border border-border bg-surface p-1.5 shadow-elevated focus:outline-none animate-in fade-in zoom-in-95 duration-100',
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
            className
          )}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
};

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  danger?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  danger = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors',
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-content hover:bg-primary-light hover:text-primary',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-current">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
    </button>
  );
};

export const DropdownDivider: React.FC = () => {
  return <div className="my-1 border-t border-border" role="separator" />;
};

export const DropdownLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="px-3 py-1.5 text-[11px] font-semibold text-content-muted uppercase tracking-wider">
      {children}
    </div>
  );
};
