import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InteractiveCard } from '@/components/ui';

const meta: Meta<typeof InteractiveCard> = {
  title: 'GreenCycle/UI/InteractiveCard',
  component: InteractiveCard,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
  },
  args: {
    selected: false,
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveCard>;

export const Default: Story = {
  render: (args) => (
    <InteractiveCard {...args} className="max-w-md p-5" onClick={() => alert('Card clicked!')}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">🥤</span>
        <div>
          <h4 className="font-bold text-sm text-content">PET Bottle Recycling Depot</h4>
          <p className="text-xs text-content-secondary mt-0.5">Aluthmawatha Road, Colombo 15</p>
        </div>
      </div>
      <span className="text-xs text-primary font-semibold block mt-4">
        Hover to elevate • Click to inspect details →
      </span>
    </InteractiveCard>
  ),
};

export const SelectedState: Story = {
  render: () => {
    const [selected, setSelected] = useState(true);
    return (
      <InteractiveCard
        selected={selected}
        onClick={() => setSelected(!selected)}
        className="max-w-md p-5"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-content">Organic Compost Drop-off</h4>
          <span className="text-xs font-bold text-secondary">{selected ? '✓ Selected' : 'Tap to select'}</span>
        </div>
        <p className="text-xs text-content-secondary mt-1">
          Accepts kitchen scraps, vegetable trimmings, and coffee grounds.
        </p>
      </InteractiveCard>
    );
  },
};
