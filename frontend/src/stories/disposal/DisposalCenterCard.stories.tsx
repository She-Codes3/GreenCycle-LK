import type { Meta, StoryObj } from '@storybook/react';
import { DisposalCenterCard } from '@/components/disposal/DisposalCenterCard';

const meta: Meta<typeof DisposalCenterCard> = {
  title: 'GreenCycle/Disposal/DisposalCenterCard',
  component: DisposalCenterCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: { control: 'text' },
    type: { control: 'text' },
    address: { control: 'text' },
    distanceKm: { control: 'number' },
    openingHours: { control: 'text' },
    isOpenNow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DisposalCenterCard>;

export const Default: Story = {
  args: {
    id: 'CTR-CMB-01',
    name: 'Colombo Central Recycling & Segregation Depot',
    type: 'Municipal Recycling',
    address: 'Bloemendhal Road, Kotahena, Colombo 13',
    distanceKm: 2.8,
    openingHours: '07:30 AM - 05:30 PM (Mon - Sat)',
    isOpenNow: true,
    acceptedWaste: ['PLASTIC', 'PAPER', 'GLASS', 'METAL', 'E_WASTE'],
    onDirections: () => alert('Opening navigation route to Kotahena Depot'),
    onViewDetails: () => alert('Viewing detailed facility services'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const CompostFacilityClosed: Story = {
  args: {
    id: 'CTR-KOT-04',
    name: 'Mihisaru Organic Composting Center',
    type: 'Composting & Biogas',
    address: 'Beddagana Road, Pitakotte, Kotte',
    distanceKm: 5.4,
    openingHours: '08:00 AM - 04:00 PM (Closed Sundays)',
    isOpenNow: false,
    acceptedWaste: ['ORGANIC'],
    onDirections: () => alert('Opening navigation route to Beddagana Composting Center'),
    onViewDetails: () => alert('Viewing center schedule & pricing'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const HazardousDropOffHub: Story = {
  args: {
    id: 'CTR-ENG-09',
    name: 'Western Province E-Waste & Chemical Depository',
    type: 'Hazardous Waste',
    address: 'Central Environmental Authority Complex, Battaramulla',
    distanceKm: 8.2,
    openingHours: '08:30 AM - 04:15 PM (Mon - Fri)',
    isOpenNow: true,
    acceptedWaste: ['E_WASTE', 'HAZARDOUS'],
    onDirections: () => alert('Opening navigation route to CEA Battaramulla'),
    onViewDetails: () => alert('Viewing specialized hazardous intake policies'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
