import type { Meta, StoryObj } from '@storybook/react';
import { PickupTimeline } from '@/components/pickup/PickupTimeline';

const meta: Meta<typeof PickupTimeline> = {
  title: 'GreenCycle/Pickup/PickupTimeline',
  component: PickupTimeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PickupTimeline>;

const activePickupSteps = [
  {
    id: 'step-1',
    label: 'Request Submitted & Verified',
    timestamp: '08:15 AM',
    completed: true,
    note: 'Citizen submitted 14 kg recyclables on GreenCycle mobile web.',
  },
  {
    id: 'step-2',
    label: 'Collector Assigned',
    timestamp: '08:45 AM',
    completed: true,
    note: 'Assigned to driver Kamal Bandara (Truck CMB-4521).',
  },
  {
    id: 'step-3',
    label: 'Collector En Route',
    timestamp: '09:20 AM',
    completed: false,
    current: true,
    note: 'Vehicle is approx. 12 minutes away near Thimbirigasyaya Junction.',
  },
  {
    id: 'step-4',
    label: 'Arrival & Weighing at Doorstep',
    completed: false,
    note: 'Collector scans QR code, validates segregation, and logs weight.',
  },
  {
    id: 'step-5',
    label: 'Points Credited & Completed',
    completed: false,
    note: 'Citizen receives +75 GreenPoints and digital receipt.',
  },
];

export const InProgress: Story = {
  args: {
    steps: activePickupSteps,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md bg-surface p-6 rounded-2xl border border-border">
        <h3 className="text-sm font-bold text-content mb-4">Pickup Status Tracking</h3>
        <Story />
      </div>
    ),
  ],
};

export const FullyCompleted: Story = {
  args: {
    steps: [
      {
        id: 's-1',
        label: 'Pickup Booked',
        timestamp: 'Sep 06, 09:00 AM',
        completed: true,
        note: 'Requested by resident via GreenCycle portal.',
      },
      {
        id: 's-2',
        label: 'Dispatched from Colombo Hub',
        timestamp: 'Sep 06, 10:15 AM',
        completed: true,
        note: 'Driver assigned: Sunil Perera.',
      },
      {
        id: 's-3',
        label: 'Collected & Weighed (22.4 kg)',
        timestamp: 'Sep 06, 11:30 AM',
        completed: true,
        note: 'Verified clean segregation: 14 kg cardboard, 8.4 kg PET plastics.',
      },
      {
        id: 's-4',
        label: 'Delivered to Orugodawatta Recycling Depot',
        timestamp: 'Sep 06, 01:00 PM',
        completed: true,
        note: '+110 GreenPoints credited to resident account.',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md bg-surface p-6 rounded-2xl border border-border">
        <h3 className="text-sm font-bold text-content mb-4">Completed Order Timeline</h3>
        <Story />
      </div>
    ),
  ],
};
