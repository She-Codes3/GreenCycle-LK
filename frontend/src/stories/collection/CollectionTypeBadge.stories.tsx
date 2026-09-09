import type { Meta, StoryObj } from '@storybook/react';
import { CollectionTypeBadge } from '@/components/collection/CollectionTypeBadge';

const meta: Meta<typeof CollectionTypeBadge> = {
  title: 'GreenCycle/Collection/CollectionTypeBadge',
  component: CollectionTypeBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['MUNICIPAL', 'RECYCLING', 'BULKY', 'HAZARDOUS'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CollectionTypeBadge>;

export const Default: Story = {
  args: {
    type: 'MUNICIPAL',
    size: 'md',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Municipal:</span>
        <CollectionTypeBadge type="MUNICIPAL" size="sm" />
        <CollectionTypeBadge type="MUNICIPAL" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Recycling:</span>
        <CollectionTypeBadge type="RECYCLING" size="sm" />
        <CollectionTypeBadge type="RECYCLING" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Bulky Waste:</span>
        <CollectionTypeBadge type="BULKY" size="sm" />
        <CollectionTypeBadge type="BULKY" size="md" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-28 text-xs text-content-muted">Hazardous:</span>
        <CollectionTypeBadge type="HAZARDOUS" size="sm" />
        <CollectionTypeBadge type="HAZARDOUS" size="md" />
      </div>
    </div>
  ),
};
