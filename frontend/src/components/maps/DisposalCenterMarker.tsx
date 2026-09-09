import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export interface DisposalCenterMarkerProps {
  position: [number, number];
  type?: 'recycling' | 'compost' | 'landfill' | 'ewaste';
  name?: string;
  children?: React.ReactNode;
}

const typeConfigs = {
  recycling: { color: '#10b981', symbol: '♻️' },
  compost: { color: '#15803d', symbol: '🌿' },
  landfill: { color: '#475569', symbol: '🏗️' },
  ewaste: { color: '#0284c7', symbol: '🔋' },
};

export const DisposalCenterMarker: React.FC<DisposalCenterMarkerProps> = ({
  position,
  type = 'recycling',
  name,
  children,
}) => {
  const config = typeConfigs[type];

  const centerIcon = L.divIcon({
    className: 'disposal-center-pin',
    html: `
      <div style="
        background-color: ${config.color};
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        border: 2px solid #ffffff;
      ">
        <span style="font-size: 15px;">${config.symbol}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  return (
    <Marker position={position} icon={centerIcon} title={name}>
      {children}
    </Marker>
  );
};
