import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, MapControls } from '@/components/maps';

const meta: Meta<typeof MapControls> = {
  title: 'GreenCycle/Maps/MapControls',
  component: MapControls,
};

export default meta;
type Story = StoryObj<typeof MapControls>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl relative rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={13} height="350px">
        <MapControls
          position="top-right"
          onLocateMe={() => alert('Locating user position...')}
        />
      </MapContainer>
    </div>
  ),
};
