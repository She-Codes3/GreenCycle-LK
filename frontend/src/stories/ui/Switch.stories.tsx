import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '@/components/ui';

const meta: Meta<typeof Switch> = {
  title: 'GreenCycle/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: {
    label: 'Real-time Truck Proximity Alerts',
    description: 'Get notified via SMS or PWA push when collection truck is within 500m',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [s1, setS1] = useState(true);
    const [s2, setS2] = useState(true);
    const [s3, setS3] = useState(true);
    return (
      <div className="flex flex-col gap-4 max-w-md">
        <Switch size="sm" label="Small Toggle" checked={s1} onChange={setS1} />
        <Switch size="md" label="Medium Toggle (Default)" checked={s2} onChange={setS2} />
        <Switch size="lg" label="Large Toggle" checked={s3} onChange={setS3} />
      </div>
    );
  },
};

export const DisabledState: Story = {
  args: {
    label: 'Automated Weighing Scale Integration',
    description: 'Hardware not detected on mobile device',
    disabled: true,
  },
};
