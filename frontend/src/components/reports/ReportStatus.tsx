import React from 'react';
import { StatusBadge, StatusBadgeVariant } from '../ui/StatusBadge';

export type ReportStatusType = 'SUBMITTED' | 'VERIFIED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED' | string;

export interface ReportStatusProps {
  status: ReportStatusType;
  size?: 'sm' | 'md';
  className?: string;
}

const statusMap: Record<string, { label: string; variant: StatusBadgeVariant }> = {
  SUBMITTED: { label: 'Submitted', variant: 'warning' },
  UNDER_REVIEW: { label: 'Under Review', variant: 'info' },
  ASSIGNED: { label: 'Assigned', variant: 'info' },
  IN_PROGRESS: { label: 'In Progress', variant: 'info' },
  RESOLVED: { label: 'Resolved', variant: 'success' },
  CLOSED: { label: 'Closed', variant: 'default' },
  VERIFIED: { label: 'Verified by Council', variant: 'info' },
  REJECTED: { label: 'Dismissed', variant: 'error' },
};

export const ReportStatus: React.FC<ReportStatusProps> = ({
  status,
  size = 'md',
  className,
}) => {
  const normKey = (status || 'SUBMITTED').toUpperCase();
  const config = statusMap[normKey] || { label: status, variant: 'default' };

  return (
    <StatusBadge variant={config.variant} size={size} dot className={className}>
      {config.label}
    </StatusBadge>
  );
};
