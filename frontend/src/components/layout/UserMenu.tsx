import React from 'react';
import { cn } from '../ui/utils';
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel } from '../ui/Dropdown';

export interface UserMenuProps {
  user?: {
    name: string;
    email?: string;
    role?: string;
    avatarUrl?: string;
  };
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  customItems?: React.ReactNode;
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  user = { name: 'Guest User', role: 'RESIDENT' },
  onProfile,
  onSettings,
  onLogout,
  customItems,
  className,
}) => {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const trigger = (
    <div
      className={cn(
        'flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-muted transition-colors text-left select-none',
        className
      )}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover border border-border"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm">
          {initials}
        </div>
      )}
      <div className="hidden md:flex flex-col">
        <span className="text-xs font-semibold text-content leading-tight">{user.name}</span>
        {user.role && (
          <span className="text-[10px] text-content-muted uppercase tracking-wider font-medium">
            {user.role}
          </span>
        )}
      </div>
      <svg className="w-4 h-4 text-content-muted hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <Dropdown trigger={trigger} align="right">
      <DropdownLabel>
        <div className="flex flex-col">
          <span>Signed in as</span>
          <span className="font-semibold normal-case text-content truncate max-w-[180px]">
            {user.email || user.name}
          </span>
        </div>
      </DropdownLabel>
      <DropdownDivider />
      {onProfile && (
        <DropdownItem
          onClick={onProfile}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        >
          My Profile
        </DropdownItem>
      )}
      {onSettings && (
        <DropdownItem
          onClick={onSettings}
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          Settings
        </DropdownItem>
      )}
      {customItems}
      {onLogout && (
        <>
          <DropdownDivider />
          <DropdownItem
            onClick={onLogout}
            danger
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
          >
            Log Out
          </DropdownItem>
        </>
      )}
    </Dropdown>
  );
};
