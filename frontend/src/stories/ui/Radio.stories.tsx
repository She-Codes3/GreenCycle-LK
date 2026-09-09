import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui';

const meta: Meta<typeof Radio> = {
  title: 'GreenCycle/UI/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Standard Municipal Curbside Collection',
    helperText: 'Collected weekly per your district timetable',
    defaultChecked: true,
  },
};

export const GroupOrientation: Story = {
  render: () => {
    const [selected, setSelected] = useState('routine');
    return (
      <div className="max-w-md">
        <RadioGroup label="Select Collection Speed" orientation="vertical">
          <Radio
            name="speed"
            label="Routine Collection"
            helperText="Free municipal service every Tuesday"
            checked={selected === 'routine'}
            onChange={() => setSelected('routine')}
          />
          <Radio
            name="speed"
            label="Priority On-Demand Pickup"
            helperText="Direct dispatch within 2 hours • 50 GreenPoints fee"
            checked={selected === 'priority'}
            onChange={() => setSelected('priority')}
          />
          <Radio
            name="speed"
            label="Bulk Waste Special Dispatch"
            helperText="Dedicated truck with hydraulic lift"
            checked={selected === 'bulk'}
            onChange={() => setSelected('bulk')}
          />
        </RadioGroup>
      </div>
    );
  },
};
