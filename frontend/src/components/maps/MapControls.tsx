import React from 'react';
import { useMap } from 'react-leaflet';
import { cn } from '../ui/utils';

export interface MapControlsProps {
  defaultCenter?: [number, number];
  defaultZoom?: number;
  onLocateMe?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

export const MapControls: React.FC<MapControlsProps> = ({
  defaultCenter = [6.9271, 79.8612],
  defaultZoom = 13,
  onLocateMe,
  position = 'top-right',
  className,
}) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleRecenter = () => {
    map.setView(defaultCenter, defaultZoom);
  };

  return (
    <div
      className={cn(
        'leaflet-control absolute z-[1000] flex flex-col gap-1.5 shadow-elevated rounded-xl overflow-hidden border border-border bg-surface p-1',
        positionClasses[position],
        className
      )}
    >
      <button
        type="button"
        onClick={handleZoomIn}
        aria-label="Zoom in"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-content hover:bg-muted transition-colors font-bold text-base"
      >
        +
      </button>
      <button
        type="button"
        onClick={handleZoomOut}
        aria-label="Zoom out"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-content hover:bg-muted transition-colors font-bold text-base border-t border-border"
      >
        −
      </button>
      <button
        type="button"
        onClick={handleRecenter}
        aria-label="Re-center map"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-content-secondary hover:text-primary hover:bg-muted transition-colors border-t border-border"
        title="Re-center"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
      {onLocateMe && (
        <button
          type="button"
          onClick={onLocateMe}
          aria-label="Locate me"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-content-secondary hover:text-secondary hover:bg-muted transition-colors border-t border-border"
          title="Locate Me"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};
