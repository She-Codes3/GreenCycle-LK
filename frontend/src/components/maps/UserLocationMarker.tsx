import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export interface UserLocationMarkerProps {
  position: [number, number];
  accuracyRadiusMeters?: number;
  title?: string;
  children?: React.ReactNode;
}

const userLocationIcon = L.divIcon({
  className: 'user-location-pin',
  html: `
    <div style="position: relative; width: 24px; height: 24px;">
      <div style="
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background-color: #10b981;
        opacity: 0.4;
        animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      <div style="
        position: absolute;
        top: 4px;
        left: 4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #10b981;
        border: 3px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  position,
  title = 'Your Location',
  children,
}) => {
  return (
    <Marker position={position} icon={userLocationIcon} title={title}>
      {children}
    </Marker>
  );
};
