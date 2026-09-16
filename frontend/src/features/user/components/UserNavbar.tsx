import React from 'react';
import { Navbar } from '@/components/layout';

export interface UserNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

/** Configures the shared navbar with resident/user-specific defaults. */
export const UserNavbar: React.FC<UserNavbarProps> = (props) => (
  <Navbar
    {...props}
    showBrand={false}
    userName={props.userName ?? 'Kasun Perera'}
    userRole={props.userRole ?? 'Resident'}
    notificationCount={props.notificationCount ?? 3}
  />
);
