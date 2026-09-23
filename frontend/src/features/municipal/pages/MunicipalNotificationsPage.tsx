import React from 'react';
import { MunicipalLayout } from '../components/MunicipalLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const MunicipalNotificationsPage: React.FC = () => {
  return (
    <MunicipalLayout>
      <NotificationCenter role="MUNICIPAL" />
    </MunicipalLayout>
  );
};
