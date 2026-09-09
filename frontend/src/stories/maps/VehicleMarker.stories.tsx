import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, VehicleMarker, MapPopup } from '@/components/maps';

const meta: Meta<typeof VehicleMarker> = {
  title: 'GreenCycle/Maps/VehicleMarker',
  component: VehicleMarker,
};

export default meta;
type Story = StoryObj<typeof VehicleMarker>;

export const EnRouteTruck: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={14} height="350px">
        <VehicleMarker
          position={[6.9271, 79.8612]}
          plateNumber="CMB-4521"
          status="en_route"
          heading={30}
        >
          <MapPopup
            title="Truck CMB-4521"
            subtitle="Driver: Sunil Perera • 12 minutes away"
            description="Heading towards Ward 03 curbside collection point."
          />
        </VehicleMarker>
      </MapContainer>
    </div>
  ),
};

export const ActiveTruck: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={14} height="350px">
        <VehicleMarker
          position={[6.9271, 79.8612]}
          plateNumber="WP-CAD-8812"
          status="active"
        />
      </MapContainer>
    </div>
  ),
};
