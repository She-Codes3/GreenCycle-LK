import React from 'react';
import { StatusBadge, StatusBadgeVariant } from '../ui/StatusBadge';

export interface CollectionStatusProps {
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'ARRIVED' | 'COMPLETED' | 'MISSED' | string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusMap: Record<string, { label: string; variant: StatusBadgeVariant }> = {
  SCHEDULED: { label: 'Scheduled', variant: 'info' },
  IN_PROGRESS: { label: 'In Progress', variant: 'warning' },
  ARRIVED: { label: 'Truck Arrived', variant: 'success' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  MISSED: { label: 'Missed', variant: 'error' },
};

export const CollectionStatus: React.FC<CollectionStatusProps> = ({
  status,
  size = 'md',
  className,
}) => {
  const normKey = (status || 'SCHEDULED').toUpperCase();
  const config = statusMap[normKey] || { label: status, variant: 'default' };

  return (
    <StatusBadge variant={config.variant} size={size} dot className={className}>
      {config.label}
    </StatusBadge>
  );
};
