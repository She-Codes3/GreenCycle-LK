import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, RouteLine, VehicleMarker } from '@/components/maps';

const meta: Meta<typeof RouteLine> = {
  title: 'GreenCycle/Maps/RouteLine',
  component: RouteLine,
};

export default meta;
type Story = StoryObj<typeof RouteLine>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9250, 79.8600]} zoom={14} height="350px">
        <RouteLine
          positions={[
            [6.9150, 79.8700],
            [6.9200, 79.8650],
            [6.9250, 79.8600],
            [6.9320, 79.8550],
          ]}
          color="#134e39"
          weight={4}
          dashed
        />
        <VehicleMarker position={[6.9320, 79.8550]} plateNumber="CMB-4521" />
      </MapContainer>
    </div>
  ),
};
