import React from 'react';
import { Eye, MapPin, UserX, Truck } from 'lucide-react';
import { CollectionRequest } from '../../types/collectionRequest';
import { CollectionStatusBadge } from './CollectionStatusBadge';
import { Button } from '@/components/ui/Button';

interface CollectionRequestTableProps {
  requests: CollectionRequest[];
  onSelectRequest: (request: CollectionRequest) => void;
}

export const CollectionRequestTable: React.FC<CollectionRequestTableProps> = ({
  requests,
  onSelectRequest,
}) => {
  if (requests.length === 0) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-12 text-center shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3 text-content-muted">
          <Truck className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <h3 className="font-bold text-sm text-content">No collection requests match your filters</h3>
        <p className="text-xs text-content-secondary mt-1 max-w-sm mx-auto">
          Try clearing your search terms, changing the municipality, or selecting &quot;All Statuses&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-muted/40 border-b border-border text-[11px] font-bold text-content-muted uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold">Request ID</th>
              <th className="py-3.5 px-4 font-bold">Citizen</th>
              <th className="py-3.5 px-4 font-bold">Municipality</th>
              <th className="py-3.5 px-4 font-bold">Location</th>
              <th className="py-3.5 px-4 font-bold">Collector</th>
              <th className="py-3.5 px-4 font-bold">Requested Date</th>
              <th className="py-3.5 px-4 font-bold text-center">Status</th>
              <th className="py-3.5 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {requests.map((req) => (
              <tr
                key={req.id}
                onClick={() => onSelectRequest(req)}
                className="hover:bg-muted/30 cursor-pointer transition-colors group"
              >
                {/* 1. Request ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-primary whitespace-nowrap">
                  {req.id}
                </td>

                {/* 2. Citizen */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                      {req.citizenName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-content block group-hover:text-primary transition-colors">
                        {req.citizenName}
                      </span>
                      <span className="text-[10px] text-content-muted block">{req.citizenPhone}</span>
                    </div>
                  </div>
                </td>

                {/* 3. Municipality */}
                <td className="py-3.5 px-4 text-content-secondary font-medium whitespace-nowrap">
                  {req.municipality}
                </td>

                {/* 4. Location */}
                <td className="py-3.5 px-4 text-content-secondary max-w-xs">
                  <div className="flex items-start gap-1 text-content truncate">
                    <MapPin className="w-3.5 h-3.5 text-content-muted shrink-0 mt-0.5" />
                    <span className="truncate">{req.location}, {req.area}</span>
                  </div>
                </td>

                {/* 5. Collector */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {req.collector ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {req.collector.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-content block text-[11px]">
                          {req.collector.name}
                        </span>
                        <span className="text-[10px] font-mono text-content-muted block">
                          {req.collector.collectorId}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50/70 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium">
                      <UserX className="w-3 h-3 text-amber-500" />
                      <span>Not Assigned</span>
                    </span>
                  )}
                </td>

                {/* 6. Requested Date */}
                <td className="py-3.5 px-4 whitespace-nowrap text-content-secondary">
                  <span className="block font-medium">{req.requestedDate}</span>
                  <span className="block text-[10px] text-content-muted">{req.requestedTime}</span>
                </td>

                {/* 7. Status */}
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <CollectionStatusBadge status={req.status} size="sm" />
                </td>

                {/* 8. Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRequest(req);
                    }}
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
