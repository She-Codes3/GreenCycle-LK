import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '../ui/utils';

export interface MapContainerProps {
  center?: [number, number];
  zoom?: number;
  height?: string | number;
  children?: React.ReactNode;
  className?: string;
  scrollWheelZoom?: boolean;
  tileLayerUrl?: string;
  attribution?: string;
}

// Default center: Colombo, Sri Lanka
const DEFAULT_CENTER: [number, number] = [6.9271, 79.8612];
const DEFAULT_ZOOM = 13;
const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MapContainer: React.FC<MapContainerProps> = ({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = '450px',
  children,
  className,
  scrollWheelZoom = true,
  tileLayerUrl = DEFAULT_TILE_URL,
  attribution = DEFAULT_ATTRIBUTION,
}) => {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn('ui-map-surface z-map', className)}
      style={{ height: heightStyle, width: '100%' }}
    >
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url={tileLayerUrl} attribution={attribution} />
        {children}
      </LeafletMapContainer>
    </div>
  );
};
