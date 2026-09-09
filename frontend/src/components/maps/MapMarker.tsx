import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { createPinIcon } from './utils';

export interface MapMarkerProps {
  position: [number, number];
  icon?: L.Icon | L.DivIcon;
  title?: string;
  children?: React.ReactNode;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  position,
  icon,
  title,
  children,
}) => {
  const markerIcon = icon || createPinIcon({});

  return (
    <Marker position={position} icon={markerIcon} title={title}>
      {children}
    </Marker>
  );
};
