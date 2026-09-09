import type { Meta, StoryObj } from '@storybook/react';
import { CollectionCard } from '@/components/collection/CollectionCard';

const meta: Meta<typeof CollectionCard> = {
  title: 'GreenCycle/Collection/CollectionCard',
  component: CollectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    id: { control: 'text' },
    date: { control: 'text' },
    timeWindow: { control: 'text' },
    area: { control: 'text' },
    type: {
      control: 'select',
      options: ['MUNICIPAL', 'RECYCLING', 'BULKY', 'HAZARDOUS'],
    },
    status: {
      control: 'select',
      options: ['SCHEDULED', 'IN_PROGRESS', 'ARRIVED', 'COMPLETED', 'MISSED'],
    },
    truckNumber: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CollectionCard>;

export const Default: Story = {
  args: {
    id: 'COL-CMB-8832',
    date: 'Wednesday, Sep 10',
    timeWindow: '07:00 AM - 09:30 AM',
    area: 'Ward Place & Cinnamon Gardens, Colombo 07',
    type: 'MUNICIPAL',
    status: 'IN_PROGRESS',
    wasteCategories: ['ORGANIC', 'PLASTIC'],
    truckNumber: 'CMB-4521',
    onTrack: () => alert('Tracking live compactor truck CMB-4521'),
    onDetails: () => alert('Viewing route & collection details'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const RecyclingCollection: Story = {
  args: {
    id: 'COL-KDT-2091',
    date: 'Thursday, Sep 11',
    timeWindow: '08:00 AM - 11:00 AM',
    area: 'Rajagiriya & Nawala Road, Sri Jayawardenepura Kotte',
    type: 'RECYCLING',
    status: 'SCHEDULED',
    wasteCategories: ['PAPER', 'PLASTIC', 'GLASS', 'METAL'],
    truckNumber: 'WP-LH-8820',
    onDetails: () => alert('Viewing schedule details'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const TruckArrivedState: Story = {
  args: {
    id: 'COL-KND-1044',
    date: 'Today',
    timeWindow: 'Currently at Stop 14',
    area: 'Peradeniya Road, Kandy Municipal Council',
    type: 'MUNICIPAL',
    status: 'ARRIVED',
    wasteCategories: ['ORGANIC'],
    truckNumber: 'CP-ND-6019',
    onTrack: () => alert('Showing exact live GPS location'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const CompletedCollection: Story = {
  args: {
    id: 'COL-GAL-4910',
    date: 'Yesterday, Sep 08',
    timeWindow: '06:30 AM - 08:45 AM',
    area: 'Galle Fort & Rampart Street, Galle',
    type: 'RECYCLING',
    status: 'COMPLETED',
    wasteCategories: ['GLASS', 'METAL'],
    truckNumber: 'SP-GA-3112',
    onDetails: () => alert('Viewing past collection summary'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
