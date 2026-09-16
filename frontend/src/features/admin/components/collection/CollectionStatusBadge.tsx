import React from 'react';
import {
  Clock,
  UserCheck,
  Truck,
  PackageCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { CollectionRequestStatus } from '../../types/collectionRequest';

interface CollectionStatusBadgeProps {
  status: CollectionRequestStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const CollectionStatusBadge: React.FC<CollectionStatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const sizeStyles =
    size === 'sm'
      ? 'px-2 py-0.5 text-[10px] gap-1'
      : 'px-2.5 py-1 text-xs gap-1.5';

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5';

  switch (status) {
    case 'Pending':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeStyles} ${className}`}
        >
          <Clock className={`${iconSize} text-amber-600 shrink-0`} strokeWidth={2.2} />
          <span>Pending</span>
        </span>
      );

    case 'Assigned':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 ${sizeStyles} ${className}`}
        >
          <UserCheck className={`${iconSize} text-blue-600 shrink-0`} strokeWidth={2.2} />
          <span>Assigned</span>
        </span>
      );

    case 'In Progress':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/80 ${sizeStyles} ${className}`}
        >
          <Truck className={`${iconSize} text-indigo-600 shrink-0 animate-pulse`} strokeWidth={2.2} />
          <span>In Progress</span>
        </span>
      );

    case 'Collected':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 ${sizeStyles} ${className}`}
        >
          <PackageCheck className={`${iconSize} text-teal-600 shrink-0`} strokeWidth={2.2} />
          <span>Collected</span>
        </span>
      );

    case 'Completed':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeStyles} ${className}`}
        >
          <CheckCircle2 className={`${iconSize} text-emerald-600 shrink-0`} strokeWidth={2.2} />
          <span>Completed</span>
        </span>
      );

    case 'Cancelled':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 ${sizeStyles} ${className}`}
        >
          <XCircle className={`${iconSize} text-rose-600 shrink-0`} strokeWidth={2.2} />
          <span>Cancelled</span>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-muted text-content-secondary border border-border ${sizeStyles} ${className}`}
        >
          <span>{status}</span>
        </span>
      );
  }
};
