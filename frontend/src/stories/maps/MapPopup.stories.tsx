import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, MapMarker, MapPopup } from '@/components/maps';

const meta: Meta<typeof MapPopup> = {
  title: 'GreenCycle/Maps/MapPopup',
  component: MapPopup,
};

export default meta;
type Story = StoryObj<typeof MapPopup>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={14} height="350px">
        <MapMarker position={[6.9271, 79.8612]}>
          <MapPopup
            title="Collection Truck CMB-4521"
            subtitle="Colombo Municipal Council Service"
            description="Collecting segregated dry plastics and paper. Driver 12 minutes away."
            action={{
              label: 'View Full Route Details',
              onClick: () => alert('Viewing route details'),
            }}
          />
        </MapMarker>
      </MapContainer>
    </div>
  ),
};
