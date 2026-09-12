import React from 'react';
import { cn } from '../ui/utils';

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
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
      {icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'ml-auto rounded-full px-2 py-0.5 text-xs font-semibold',
            active ? 'bg-white/20 text-white' : 'bg-white/10 text-emerald-100'
          )}
        >
          {badge}
        </span>
      )}
    </>
  );

  const itemClass = cn(
    active
      ? 'flex items-center gap-3 rounded-xl bg-white/20 px-3.5 py-3 text-xs font-bold text-white transition-all'
      : 'flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-semibold text-emerald-100 transition-all hover:bg-white/10 hover:text-white',
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
