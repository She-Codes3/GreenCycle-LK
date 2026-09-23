import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const AdminNotificationsPage: React.FC = () => {
  return (
    <AdminLayout>
      <NotificationCenter role="ADMIN" />
    </AdminLayout>
  );
};
