import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, UserLocationMarker } from '@/components/maps';

const meta: Meta<typeof UserLocationMarker> = {
  title: 'GreenCycle/Maps/UserLocationMarker',
  component: UserLocationMarker,
};

export default meta;
type Story = StoryObj<typeof UserLocationMarker>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9271, 79.8612]} zoom={15} height="350px">
        <UserLocationMarker position={[6.9271, 79.8612]} title="My Home Location" />
      </MapContainer>
    </div>
  ),
};
