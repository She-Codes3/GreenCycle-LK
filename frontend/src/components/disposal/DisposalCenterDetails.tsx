import React from 'react';
import { cn } from '../ui/utils';
import { Button } from '../ui/Button';
import { WasteCategoryBadge } from '../waste/WasteCategoryBadge';
import { WasteCategory } from '@/shared/types/common';

export interface CenterSchedule {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface DisposalCenterDetailsData {
  id: string;
  name: string;
  type: string;
  address: string;
  phone?: string;
  email?: string;
  openingHours: string;
  schedule?: CenterSchedule[];
  acceptedWaste: (WasteCategory | string)[];
  rejectedWaste?: string[];
  capacityStatus?: 'LOW' | 'NORMAL' | 'NEAR_CAPACITY' | 'FULL';
}

export interface DisposalCenterDetailsProps {
  center: DisposalCenterDetailsData;
  onDirections?: () => void;
  onClose?: () => void;
  className?: string;
}

const capacityMap = {
  LOW: { label: 'Low Occupancy (Fast drop-off)', color: 'text-emerald-700 bg-emerald-50' },
  NORMAL: { label: 'Normal Capacity', color: 'text-sky-700 bg-sky-50' },
  NEAR_CAPACITY: { label: 'Near Capacity (Expect queues)', color: 'text-amber-700 bg-amber-50' },
  FULL: { label: 'Full / Temporary Hold', color: 'text-red-700 bg-red-50' },
};

export const DisposalCenterDetails: React.FC<DisposalCenterDetailsProps> = ({
  center,
  onDirections,
  onClose,
  className,
}) => {
  const capInfo = center.capacityStatus ? capacityMap[center.capacityStatus] : null;

  return (
    <div className={cn('flex flex-col gap-6 text-content font-sans', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {center.type} Center
          </span>
          <h2 className="text-xl font-bold text-content mt-1">{center.name}</h2>
          <p className="text-xs text-content-secondary mt-1">{center.address}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="p-1 rounded-lg text-content-muted hover:text-content hover:bg-muted"
          >
            ✕
          </button>
        )}
      </div>

      {/* Capacity Indicator */}
      {capInfo && (
        <div className={cn('p-3 rounded-xl border border-border text-xs font-semibold flex items-center justify-between', capInfo.color)}>
          <span>Current Facility Status:</span>
          <span>{capInfo.label}</span>
        </div>
      )}

      {/* Contact info */}
      {(center.phone || center.email) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/50 p-3.5 rounded-xl border border-border">
          {center.phone && (
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">📞 Phone:</span>
              <a href={`tel:${center.phone}`} className="text-content-secondary hover:underline">
                {center.phone}
              </a>
            </div>
          )}
          {center.email && (
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">✉️ Email:</span>
              <a href={`mailto:${center.email}`} className="text-content-secondary hover:underline">
                {center.email}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Operating Hours Table */}
      {center.schedule && center.schedule.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-content uppercase tracking-wider mb-2">
            Weekly Operating Schedule
          </h4>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-border">
                {center.schedule.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="py-2 px-3 font-medium text-content">{item.day}</td>
                    <td className="py-2 px-3 text-right text-content-secondary">
                      {item.isOpen ? item.hours : <span className="text-red-600 font-semibold">Closed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Accepted Materials */}
      <div>
        <h4 className="text-xs font-bold text-content uppercase tracking-wider mb-2">
          Accepted Waste Streams
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {center.acceptedWaste.map((cat, idx) => (
            <WasteCategoryBadge key={idx} category={cat} size="sm" />
          ))}
        </div>
      </div>

      {/* Prohibited items */}
      {center.rejectedWaste && center.rejectedWaste.length > 0 && (
        <div>
          <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
            Prohibited / Not Accepted
          </h4>
          <ul className="space-y-1 text-xs text-content-secondary">
            {center.rejectedWaste.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-red-500 font-bold">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Directions Button */}
      {onDirections && (
        <div className="pt-2">
          <Button variant="primary" fullWidth onClick={onDirections}>
            Get Directions to Center
          </Button>
        </div>
      )}
    </div>
  );
};
