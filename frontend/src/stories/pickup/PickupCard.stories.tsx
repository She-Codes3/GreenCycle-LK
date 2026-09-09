import type { Meta, StoryObj } from '@storybook/react';
import { PickupCard } from '@/components/pickup/PickupCard';

const meta: Meta<typeof PickupCard> = {
  title: 'GreenCycle/Pickup/PickupCard',
  component: PickupCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    id: { control: 'text' },
    address: { control: 'text' },
    scheduledDate: { control: 'text' },
    timeSlot: { control: 'text' },
    status: {
      control: 'select',
      options: ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    },
    estimatedWeightKg: { control: 'number' },
    collectorName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PickupCard>;

export const Default: Story = {
  args: {
    id: 'REQ-LK-4921',
    address: 'No. 42, Flower Road, Colombo 07',
    scheduledDate: 'Tomorrow, Sep 10',
    timeSlot: '09:00 AM - 11:00 AM',
    wasteCategories: ['E_WASTE', 'PLASTIC'],
    status: 'ASSIGNED',
    estimatedWeightKg: 14.5,
    collectorName: 'Sunil Perera (GreenCycle Colombo Hub)',
    onReschedule: () => alert('Rescheduling pickup appointment'),
    onCancel: () => alert('Cancelling pickup request'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const InProgressTracking: Story = {
  args: {
    id: 'REQ-LK-5108',
    address: '88/2, Havelock Road, Colombo 05',
    scheduledDate: 'Today',
    timeSlot: '10:00 AM - 12:00 PM',
    wasteCategories: ['E_WASTE', 'METAL'],
    status: 'IN_PROGRESS',
    estimatedWeightKg: 28,
    collectorName: 'Kamal Bandara (Truck CMB-4521 — 12 mins away)',
    onTrack: () => alert('Opening live tracking map view'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const CompletedPickup: Story = {
  args: {
    id: 'REQ-LK-3811',
    address: '15/A, Galle Road, Mount Lavinia',
    scheduledDate: 'Sep 06, 2026',
    timeSlot: '02:00 PM - 04:00 PM',
    wasteCategories: ['PAPER', 'CARDBOARD', 'PLASTIC'],
    status: 'COMPLETED',
    estimatedWeightKg: 42.0,
    collectorName: 'Chaminda Silva',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const PendingApproval: Story = {
  args: {
    id: 'REQ-LK-6029',
    address: '24, Dharmapala Mawatha, Kandy',
    scheduledDate: 'Friday, Sep 12',
    timeSlot: '08:30 AM - 10:30 AM',
    wasteCategories: ['HAZARDOUS', 'E_WASTE'],
    status: 'PENDING',
    estimatedWeightKg: 8.5,
    onReschedule: () => alert('Rescheduling pickup'),
    onCancel: () => alert('Cancelling pickup'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
