import React from 'react';
import { Popup } from 'react-leaflet';
import { Button } from '../ui/Button';

export interface MapPopupProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

export const MapPopup: React.FC<MapPopupProps> = ({
  title,
  subtitle,
  description,
  badge,
  action,
  children,
}) => {
  return (
    <Popup className="greencycle-map-popup">
      <div className="p-1 min-w-[200px] max-w-[260px] text-content font-sans">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-bold text-sm text-content leading-tight">{title}</h4>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {subtitle && (
          <p className="text-xs text-content-secondary font-medium mb-1.5">{subtitle}</p>
        )}

        {description && (
          <p className="text-xs text-content-muted leading-relaxed mb-2.5">{description}</p>
        )}

        {children}

        {action && (
          <div className="mt-2.5 pt-2 border-t border-border">
            <Button
              size="sm"
              variant="primary"
              fullWidth
              onClick={action.onClick}
              className="py-1 text-xs"
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </Popup>
  );
};
