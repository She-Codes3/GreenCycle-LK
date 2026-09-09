import type { Meta, StoryObj } from '@storybook/react';
import { MapContainer, DisposalCenterMarker, MapPopup } from '@/components/maps';

const meta: Meta<typeof DisposalCenterMarker> = {
  title: 'GreenCycle/Maps/DisposalCenterMarker',
  component: DisposalCenterMarker,
};

export default meta;
type Story = StoryObj<typeof DisposalCenterMarker>;

export const RecyclingCenter: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9150, 79.8700]} zoom={14} height="350px">
        <DisposalCenterMarker
          position={[6.9150, 79.8700]}
          type="recycling"
          name="Green Recycling Center"
        >
          <MapPopup
            title="Green Recycling Center"
            subtitle="Aluthmawatha Rd, Colombo 15"
            description="Open 8:00 AM - 5:00 PM • Accepts E-Waste & Plastic"
          />
        </DisposalCenterMarker>
      </MapContainer>
    </div>
  ),
};

export const CompostFacility: Story = {
  render: () => (
    <div className="max-w-2xl rounded-2xl overflow-hidden shadow-card border border-border">
      <MapContainer center={[6.9150, 79.8700]} zoom={14} height="350px">
        <DisposalCenterMarker
          position={[6.9150, 79.8700]}
          type="compost"
          name="Municipal Organic Compost Site"
        >
          <MapPopup
            title="Kerawalapitiya Compost Yard"
            subtitle="Wet Kitchen Waste Processing"
          />
        </DisposalCenterMarker>
      </MapContainer>
    </div>
  ),
};
