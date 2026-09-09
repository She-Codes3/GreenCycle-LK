import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export interface VehicleMarkerProps {
  position: [number, number];
  plateNumber?: string;
  status?: 'active' | 'en_route' | 'idle' | 'maintenance';
  heading?: number;
  children?: React.ReactNode;
}

const statusColors = {
  active: '#10b981',
  en_route: '#134e39',
  idle: '#f59e0b',
  maintenance: '#dc2626',
};

export const VehicleMarker: React.FC<VehicleMarkerProps> = ({
  position,
  plateNumber,
  status = 'active',
  heading = 0,
  children,
}) => {
  const color = statusColors[status];

  const vehicleIcon = L.divIcon({
    className: 'vehicle-truck-pin',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));
      ">
        <div style="
          background-color: ${color};
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          transform: rotate(${heading}deg);
          transition: transform 0.3s ease;
        ">
          <span style="font-size: 16px;">🚛</span>
        </div>
        ${
          plateNumber
            ? `<div style="
                margin-top: 2px;
                background-color: #0f172a;
                color: #ffffff;
                font-size: 9px;
                font-weight: 700;
                padding: 1px 4px;
                border-radius: 4px;
                white-space: nowrap;
                letter-spacing: 0.5px;
              ">${plateNumber}</div>`
            : ''
        }
      </div>
    `,
    iconSize: [36, plateNumber ? 50 : 36],
    iconAnchor: [18, plateNumber ? 25 : 18],
    popupAnchor: [0, -20],
  });

  return (
    <Marker position={position} icon={vehicleIcon}>
      {children}
    </Marker>
  );
};
