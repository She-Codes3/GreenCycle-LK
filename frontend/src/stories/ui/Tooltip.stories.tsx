import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@/components/ui';

const meta: Meta<typeof Tooltip> = {
  title: 'GreenCycle/UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    content: 'Earn 10 GreenPoints per kg of sorted PET plastic',
    placement: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div className="p-20 flex justify-center">
      <Tooltip {...args}>
        <Button variant="secondary">Hover to Inspect Eco Reward</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="p-24 flex items-center justify-center gap-6">
      <Tooltip placement="top" content="Top Tooltip: Verified Center">
        <Button size="sm" variant="outline">Top</Button>
      </Tooltip>
      <Tooltip placement="bottom" content="Bottom Tooltip: GPS Active">
        <Button size="sm" variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip placement="left" content="Left Tooltip: Sri Lanka CEA">
        <Button size="sm" variant="outline">Left</Button>
      </Tooltip>
      <Tooltip placement="right" content="Right Tooltip: Truck CMB-4521">
        <Button size="sm" variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};
