import React, { useState, useEffect } from 'react';
import { useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapContainer } from '@/components/maps/MapContainer';
import { MapPopup } from '@/components/maps/MapPopup';
import { UserLocationMarker } from '@/components/maps/UserLocationMarker';
import { DisposalCenter } from '../types/disposal';

export interface DisposalMapViewProps {
  centers: DisposalCenter[];
  selectedCenterId: string | null;
  onSelectCenter: (id: string) => void;
  onViewDetails: (center: DisposalCenter) => void;
  className?: string;
}

const HAVELOCK_TOWN_COORDS: [number, number] = [6.8885, 79.8625];
const COLOMBO_DEFAULT_CENTER: [number, number] = [6.905, 79.875];

const STREET_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const SATELLITE_TILE =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

// Custom Map Controller to handle panTo and zoom actions from floating buttons
const MapController: React.FC<{
  selectedCenter: DisposalCenter | null;
  recenterTrigger: number;
  zoomTrigger: number;
}> = ({ selectedCenter, recenterTrigger, zoomTrigger }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCenter) {
      map.flyTo([selectedCenter.latitude, selectedCenter.longitude], 15, {
        duration: 1,
      });
    }
  }, [selectedCenter, map]);

  useEffect(() => {
    if (recenterTrigger > 0) {
      map.flyTo(HAVELOCK_TOWN_COORDS, 14, { duration: 1 });
    }
  }, [recenterTrigger, map]);

  useEffect(() => {
    if (zoomTrigger > 0) {
      map.zoomIn();
    } else if (zoomTrigger < 0) {
      map.zoomOut();
    }
  }, [zoomTrigger, map]);

  return null;
};

// Create custom leaflet marker icon for centers
const createCenterIcon = (isSelected: boolean, isOpen: boolean) => {
  const bgColor = isSelected ? '#134e39' : isOpen ? '#10b981' : '#64748b';
  const size = isSelected ? 38 : 32;
  const ring = isSelected ? 'box-shadow: 0 0 0 4px #10b981, 0 6px 14px rgba(0,0,0,0.3);' : 'box-shadow: 0 3px 8px rgba(0,0,0,0.25);';

  return L.divIcon({
    className: 'disposal-marker-custom',
    html: `
      <div style="
        background-color: ${bgColor};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #ffffff;
        color: #ffffff;
        cursor: pointer;
        transition: transform 0.2s;
        ${ring}
      ">
        <span style="font-size: ${isSelected ? '16px' : '14px'};">♻️</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

export const DisposalMapView: React.FC<DisposalMapViewProps> = ({
  centers,
  selectedCenterId,
  onSelectCenter,
  onViewDetails,
  className,
}) => {
  const [mapMode, setMapMode] = useState<'street' | 'satellite'>('street');
  const [recenterCount, setRecenterCount] = useState(0);
  const [zoomTrigger, setZoomTrigger] = useState(0);

  const selectedCenter = centers.find((c) => c.id === selectedCenterId) || null;

  return (
    <div
      className={`relative h-[680px] w-full rounded-2xl overflow-hidden border border-border shadow-card bg-surface ${
        className || ''
      }`}
    >
      {/* Floating Map Controls (Top Right Overlay) */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* 1. Street / Satellite Segmented Toggle */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-1 shadow-md border border-border flex items-center gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMapMode('street')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mapMode === 'street'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-content-secondary hover:text-content'
            }`}
          >
            Street
          </button>
          <button
            type="button"
            onClick={() => setMapMode('satellite')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              mapMode === 'satellite'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-content-secondary hover:text-content'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* 2. Zoom Controls */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-border flex flex-col overflow-hidden">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoomTrigger((z) => (z >= 0 ? z + 1 : 1))}
            className="w-9 h-9 flex items-center justify-center text-content hover:bg-muted font-bold text-lg border-b border-border/80 transition-colors"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoomTrigger((z) => (z <= 0 ? z - 1 : -1))}
            className="w-9 h-9 flex items-center justify-center text-content hover:bg-muted font-bold text-lg transition-colors"
          >
            −
          </button>
        </div>

        {/* 3. Recenter / My Location Crosshairs Button */}
        <button
          type="button"
          aria-label="Recenter on current location"
          onClick={() => setRecenterCount((c) => c + 1)}
          className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-border flex items-center justify-center text-content-secondary hover:text-primary hover:bg-muted transition-colors"
          title="Recenter to Havelock Town"
        >
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>

      {/* Map Surface */}
      <MapContainer
        center={COLOMBO_DEFAULT_CENTER}
        zoom={13}
        zoomControl={false}
        height="100%"
        tileLayerUrl={mapMode === 'street' ? STREET_TILE : SATELLITE_TILE}
        className="h-full w-full"
      >
        <MapController
          selectedCenter={selectedCenter}
          recenterTrigger={recenterCount}
          zoomTrigger={zoomTrigger}
        />

        {/* Demo User Location Pin (Havelock Town) */}
        <UserLocationMarker
          position={HAVELOCK_TOWN_COORDS}
          title="Current Demo Location: Havelock Town (CMC Ward 47)"
        />

        {/* Centers Markers */}
        {centers.map((center) => {
          const isSelected = center.id === selectedCenterId;
          const markerIcon = createCenterIcon(isSelected, center.isOpen);

          return (
            <Marker
              key={center.id}
              position={[center.latitude, center.longitude]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSelectCenter(center.id),
              }}
            >
              <MapPopup
                title={center.name}
                subtitle={`📍 ${center.distanceKm.toFixed(1)} km · ${center.address}`}
                description={`${center.isOpen ? '🟢 Open Now' : '⚪ Closed'} • Hours: ${
                  center.openingHours
                }`}
                badge={
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      center.isOpen
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-muted text-content-muted border border-border'
                    }`}
                  >
                    {center.isOpen ? 'Open' : 'Closed'}
                  </span>
                }
                action={{
                  label: 'View Center Details',
                  onClick: () => onViewDetails(center),
                }}
              >
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {center.acceptedWasteTypes.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-content-secondary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </MapPopup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
