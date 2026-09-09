import React from 'react';
import { cn } from '../ui/utils';

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
  className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  onClick,
  active = false,
  badge,
  className,
}) => {
  const content = (
    <>
      {icon && <span className="w-5 h-5 shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'ml-auto text-xs px-2 py-0.5 rounded-full font-semibold',
            active ? 'bg-white/20 text-white' : 'bg-primary-light text-primary'
          )}
        >
          {badge}
        </span>
      )}
    </>
  );

  const itemClass = cn(
    active ? 'ui-sidebar-link-active' : 'ui-sidebar-link',
    className
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={itemClass} aria-current={active ? 'page' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(itemClass, 'w-full text-left')}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </button>
  );
};
