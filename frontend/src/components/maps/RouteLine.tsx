import React from 'react';
import { Polyline } from 'react-leaflet';

export interface RouteLineProps {
  positions: [number, number][];
  color?: string;
  weight?: number;
  dashed?: boolean;
  opacity?: number;
}

export const RouteLine: React.FC<RouteLineProps> = ({
  positions,
  color = '#134e39',
  weight = 4,
  dashed = false,
  opacity = 0.85,
}) => {
  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color,
        weight,
        opacity,
        dashArray: dashed ? '8, 8' : undefined,
        lineCap: 'round',
        lineJoin: 'round',
      }}
    />
  );
};
