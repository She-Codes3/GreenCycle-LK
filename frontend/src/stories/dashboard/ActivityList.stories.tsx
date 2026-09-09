import type { Meta, StoryObj } from '@storybook/react';
import { ActivityList } from '@/components/dashboard';

const meta: Meta<typeof ActivityList> = {
  title: 'GreenCycle/Dashboard/ActivityList',
  component: ActivityList,
  tags: ['autodocs'],
  args: {
    title: 'Recent Municipal Activity',
    items: [
      {
        id: '1',
        title: 'Plastic & Polythene Pickup Completed',
        description: 'Colombo 03 Ward • Collector Jagath weighed 14.2 kg',
        timestamp: '15m ago',
        status: { label: '+142 pts', variant: 'success' },
      },
      {
        id: '2',
        title: 'Truck CMB-4521 En Route',
        description: 'Driver approaching Kollupitiya Station • 12 minutes away',
        timestamp: '42m ago',
        status: { label: 'Live GPS', variant: 'info' },
      },
      {
        id: '3',
        title: 'Dumping Report #REP-504 Verified',
        description: 'Wellawatte Canal Bank cleanup scheduled by CMC team',
        timestamp: '2h ago',
        status: { label: 'Scheduled', variant: 'warning' },
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ActivityList>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No municipal events recorded today in your district.',
  },
};
