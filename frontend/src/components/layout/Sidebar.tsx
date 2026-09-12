import React from 'react';
import { cn } from '../ui/utils';
import logoImage from '@/assets/GreenCycle-logo.png';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  brandName?: string;
  brandSubtitle?: string;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  logo,
  brandName = 'GreenCycle LK',
  brandSubtitle = 'Smart Waste Management',
  footer,
  children,
  className,
  ...props
}) => {
  return (
    <aside className={cn('flex min-h-screen w-64 shrink-0 flex-col bg-[#046a38] p-4 text-white', className)} style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.35)' }} {...props}>
      {/* Brand Header */}
      <div className="space-y-5">
        <div className="pb-1">
          <div className="flex items-center gap-2.5 px-2 pt-2">
            {logo || <img src={logoImage} alt={brandName} className="h-9 w-9 shrink-0 object-contain" />}
            <span className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
              {brandName === 'GreenCycle LK' ? (
                <>
                  GreenCycle <span className="text-emerald-400">LK</span>
                </>
              ) : (
                brandName
              )}
            </span>
          </div>
          {brandSubtitle && <span className="sr-only">{brandSubtitle}</span>}
        </div>
        <div className="mb-2 h-px bg-white/15 shadow-[0_-2px_8px_rgba(0,0,0,0.45),0_4px_16px_rgba(0,0,0,0.8)]" />
      </div>

      {/* Nav Content */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pt-6">{children}</nav>

      {/* Optional Footer */}
      {footer && <div className="mt-auto border-t border-emerald-700/60 pt-4">{footer}</div>}
    </aside>
  );
};
