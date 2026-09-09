import type { Meta, StoryObj } from '@storybook/react';
import { DashboardHeader } from '@/components/dashboard';
import { Button } from '@/components/ui';

const meta: Meta<typeof DashboardHeader> = {
  title: 'GreenCycle/Dashboard/DashboardHeader',
  component: DashboardHeader,
  tags: ['autodocs'],
  args: {
    userName: 'Kavindu Perera',
    role: 'RESIDENT',
    dateString: 'Wednesday, September 09, 2026 • Colombo Municipal Ward 03',
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: (
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">Download Report</Button>
        <Button variant="primary" size="sm">Quick Pickup</Button>
      </div>
    ),
  },
};
