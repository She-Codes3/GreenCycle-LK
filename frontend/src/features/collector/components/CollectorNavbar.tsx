import React from 'react';
import { Navbar } from '@/components/layout';

export interface CollectorNavbarProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
}

export const CollectorNavbar: React.FC<CollectorNavbarProps> = (props) => (
  <Navbar
    {...props}
    showBrand={false}
    userName={props.userName ?? 'Kanishka Perera'}
    userRole={props.userRole ?? 'Field Collector'}
    notificationCount={props.notificationCount ?? 5}
  />
);
