import React from 'react';
import { ResidentLayout } from '../components/ResidentLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const ResidentNotificationsPage: React.FC = () => {
  return (
    <ResidentLayout activeItem="notifications" pageTitle="Notifications & Alerts">
      <NotificationCenter role="RESIDENT" />
    </ResidentLayout>
  );
};
