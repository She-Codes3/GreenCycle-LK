import React from 'react';
import { ResidentLayout } from '../components/ResidentLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const ResidentNotificationsPage: React.FC = () => (
  <ResidentLayout activeItem="notifications">
    <NotificationCenter role="RESIDENT" />
  </ResidentLayout>
);
