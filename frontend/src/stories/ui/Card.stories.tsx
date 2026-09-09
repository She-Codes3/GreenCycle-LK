import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter, Button } from '@/components/ui';

const meta: Meta<typeof Card> = {
  title: 'GreenCycle/UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    bordered: { control: 'boolean' },
  },
  args: {
    padding: 'md',
    bordered: true,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <h4 className="font-bold text-base text-content">Municipal Waste Guidelines</h4>
      <p className="text-xs text-content-secondary mt-1.5 leading-relaxed">
        Segregate biodegradable kitchen waste from dry recyclable plastics and paper before placing bins on curbside.
      </p>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader
        title="Weekly Collection Summary"
        subtitle="Colombo 03 Ward • September 2026"
        action={<span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full">Active</span>}
      />
      <CardContent>
        <p className="text-sm">Organic collections occur every Tuesday and Friday morning.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <CardHeader
        title="Bulk Waste Special Pickup"
        subtitle="Request ID #REQ-8821"
      />
      <CardContent>
        <p className="text-sm">Driver assigned: Sunil Shantha (Truck WP-CAD-4921).</p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-content-muted">Scheduled for tomorrow</span>
        <Button size="sm" variant="primary">Track Vehicle</Button>
      </CardFooter>
    </Card>
  ),
};
