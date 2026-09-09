import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui';

const meta: Meta<typeof Button> = {
  title: 'GreenCycle/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Schedule Collection',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Primary: Story = {
  args: {
    children: 'Book Waste Pickup',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Route Schedule',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Disposal Center Info',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Dismiss Notification',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Cancel Pickup Request',
    variant: 'danger',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small (sm)</Button>
      <Button size="md">Medium (md)</Button>
      <Button size="lg">Large (lg)</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Confirming Pickup...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable Slot',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Track Collection Truck',
    leftIcon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
};

export const AllVariantsOverview: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="primary" loading>Loading State</Button>
        <Button variant="secondary" disabled>Disabled State</Button>
        <Button
          variant="primary"
          leftIcon={<span>🌱</span>}
        >
          GreenPoints Earned
        </Button>
      </div>
    </div>
  ),
};
