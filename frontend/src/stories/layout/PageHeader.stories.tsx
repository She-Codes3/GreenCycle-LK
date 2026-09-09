import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui';

const meta: Meta<typeof PageHeader> = {
  title: 'GreenCycle/Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Municipal Routine Collection',
    subtitle: 'Track live trucks, view route timetables, and manage bin schedules for Colombo Municipal Council.',
    breadcrumbs: [
      { label: 'Services', href: '#' },
      { label: 'Schedules', href: '#' },
      { label: 'Colombo 03' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: (
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">Export Timetable</Button>
        <Button variant="primary" size="sm">Request Special Pickup</Button>
      </div>
    ),
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Disposal Center #DC-01 Details',
    subtitle: 'Aluthmawatha Road, Colombo 15 Facility Profile',
    backButton: {
      label: 'Back to Centers',
      onClick: () => alert('Navigating back'),
    },
  },
};
