import type { Meta, StoryObj } from '@storybook/react';
import { PickupStatus } from '@/components/pickup/PickupStatus';

const meta: Meta<typeof PickupStatus> = {
  title: 'GreenCycle/Pickup/PickupStatus',
  component: PickupStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PickupStatus>;

export const Default: Story = {
  args: {
    status: 'IN_PROGRESS',
    size: 'md',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Pending Assignment:</span>
        <PickupStatus status="PENDING" size="sm" />
        <PickupStatus status="PENDING" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Collector Assigned:</span>
        <PickupStatus status="ASSIGNED" size="sm" />
        <PickupStatus status="ASSIGNED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Driver En Route:</span>
        <PickupStatus status="IN_PROGRESS" size="sm" />
        <PickupStatus status="IN_PROGRESS" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Completed:</span>
        <PickupStatus status="COMPLETED" size="sm" />
        <PickupStatus status="COMPLETED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-xs text-content-muted">Cancelled:</span>
        <PickupStatus status="CANCELLED" size="sm" />
        <PickupStatus status="CANCELLED" size="md" />
      </div>
    </div>
  ),
};
