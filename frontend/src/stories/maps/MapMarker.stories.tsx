import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, MapMarker, MapPopup } from '@/components/maps';

const meta: Meta<typeof MapMarker> = {
  title: 'GreenCycle/Maps/MapMarker',
  component: MapMarker,
};

export default meta;
type Story = StoryObj<typeof MapMarker>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={14} height="350px">
        <MapMarker position={[6.9271, 79.8612]}>
          <MapPopup
            title="Public Recyclables Bin"
            subtitle="Kollupitiya Junction, Colombo 03"
            description="Paper, Plastics, and Beverage Cans accepted here 24/7."
          />
        </MapMarker>
      </MapContainer>
    </div>
  ),
};
