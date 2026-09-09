import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@/components/ui';

const meta: Meta<typeof StatusBadge> = {
  title: 'GreenCycle/UI/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'default'],
    },
    dot: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    children: 'Collected',
    variant: 'success',
    dot: true,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Collected & Verified',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending Dispatch',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    children: 'Missed Pickup',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Truck En Route (12m away)',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'default',
    children: 'Draft Request',
  },
};

export const AllStatesOverview: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <StatusBadge variant="success" dot>Success: Weighed & Collected</StatusBadge>
      <StatusBadge variant="warning" dot>Warning: Pending Assignment</StatusBadge>
      <StatusBadge variant="error" dot>Error: Dump Report Pending</StatusBadge>
      <StatusBadge variant="info" dot>Info: Route En Route</StatusBadge>
      <StatusBadge variant="default" dot>Neutral: Inactive Facility</StatusBadge>
    </div>
  ),
};
