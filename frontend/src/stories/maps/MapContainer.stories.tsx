import type { Meta, StoryObj } from '@storybook/react';
import {
  MapContainer,
  MapPopup,
  UserLocationMarker,
  VehicleMarker,
  DisposalCenterMarker,
  RouteLine,
  MapLegend,
} from '@/components/maps';

const meta: Meta<typeof MapContainer> = {
  title: 'GreenCycle/Maps/MapContainer',
  component: MapContainer,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MapContainer>;

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl relative rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={13} height="420px">
        <UserLocationMarker position={[6.9271, 79.8612]} title="Home: 42 Flower Road" />

        <VehicleMarker
          position={[6.9320, 79.8550]}
          plateNumber="CMB-4521"
          status="en_route"
          heading={45}
        >
          <MapPopup
            title="Truck CMB-4521"
            subtitle="Municipal Collection • 12 minutes away"
            description="Collecting sorted dry plastics and paper bundles along Kollupitiya."
          />
        </VehicleMarker>

        <DisposalCenterMarker
          position={[6.9150, 79.8700]}
          type="recycling"
          name="Green Recycling Center"
        >
          <MapPopup
            title="Green Recycling Center"
            subtitle="Aluthmawatha Road, Colombo 15"
            description="Accepts: PET Bottles, Paper, Electronic Waste."
          />
        </DisposalCenterMarker>

        <RouteLine
          positions={[
            [6.9150, 79.8700],
            [6.9220, 79.8650],
            [6.9320, 79.8550],
          ]}
          dashed
        />
      </MapContainer>
      <MapLegend position="bottom-left" />
    </div>
  ),
};
