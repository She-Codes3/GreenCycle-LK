import React from 'react';
import { StatusBadge, StatusBadgeVariant } from '../ui/StatusBadge';
import { PickupStatus as PickupStatusType } from '@/shared/types/common';

export interface PickupStatusProps {
  status: PickupStatusType | string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusMap: Record<string, { label: string; variant: StatusBadgeVariant }> = {
  PENDING: { label: 'Pending Assignment', variant: 'warning' },
  ASSIGNED: { label: 'Collector Assigned', variant: 'info' },
  IN_PROGRESS: { label: 'Driver En Route', variant: 'info' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'error' },
};

export const PickupStatus: React.FC<PickupStatusProps> = ({
  status,
  size = 'md',
  className,
}) => {
  const normKey = (status || 'PENDING').toUpperCase();
  const config = statusMap[normKey] || { label: status, variant: 'default' };

  return (
    <StatusBadge variant={config.variant} size={size} dot className={className}>
      {config.label}
    </StatusBadge>
  );
};
