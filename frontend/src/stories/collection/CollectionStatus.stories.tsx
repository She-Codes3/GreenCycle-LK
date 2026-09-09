import type { Meta, StoryObj } from '@storybook/react';
import { CollectionStatus } from '@/components/collection/CollectionStatus';

const meta: Meta<typeof CollectionStatus> = {
  title: 'GreenCycle/Collection/CollectionStatus',
  component: CollectionStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['SCHEDULED', 'IN_PROGRESS', 'ARRIVED', 'COMPLETED', 'MISSED'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CollectionStatus>;

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
        <span className="w-28 text-xs text-content-muted">Scheduled:</span>
        <CollectionStatus status="SCHEDULED" size="sm" />
        <CollectionStatus status="SCHEDULED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">In Progress:</span>
        <CollectionStatus status="IN_PROGRESS" size="sm" />
        <CollectionStatus status="IN_PROGRESS" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Truck Arrived:</span>
        <CollectionStatus status="ARRIVED" size="sm" />
        <CollectionStatus status="ARRIVED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Completed:</span>
        <CollectionStatus status="COMPLETED" size="sm" />
        <CollectionStatus status="COMPLETED" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Missed:</span>
        <CollectionStatus status="MISSED" size="sm" />
        <CollectionStatus status="MISSED" size="md" />
      </div>
    </div>
  ),
};
