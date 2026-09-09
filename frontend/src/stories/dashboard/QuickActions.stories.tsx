import type { Meta, StoryObj } from '@storybook/react';
import { QuickActions } from '@/components/dashboard';

const meta: Meta<typeof QuickActions> = {
  title: 'GreenCycle/Dashboard/QuickActions',
  component: QuickActions,
  tags: ['autodocs'],
  args: {
    title: 'Citizen Quick Actions',
    actions: [
      { id: '1', label: 'Schedule Pickup', description: 'Book bulk or dry waste', icon: <span>📅</span>, onClick: () => {} },
      { id: '2', label: 'Report Dumping', description: 'Photo incident report', icon: <span>📸</span>, onClick: () => {}, badge: 'New' },
      { id: '3', label: 'Disposal Centers', description: 'Drop-off depots in Colombo', icon: <span>📍</span>, onClick: () => {} },
      { id: '4', label: 'Redeem Points', description: '480 GreenPoints ready', icon: <span>🎁</span>, onClick: () => {} },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {};
