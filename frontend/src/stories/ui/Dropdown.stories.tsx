import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel, Button } from '@/components/ui';

const meta: Meta<typeof Dropdown> = {
  title: 'GreenCycle/UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <Dropdown
        trigger={
          <Button variant="secondary" rightIcon={<span>▼</span>}>
            Collection Actions
          </Button>
        }
      >
        <DropdownLabel>Select Action</DropdownLabel>
        <DropdownDivider />
        <DropdownItem icon={<span>📅</span>}>Reschedule Pickup</DropdownItem>
        <DropdownItem icon={<span>📍</span>}>Track Truck CMB-4521</DropdownItem>
        <DropdownItem icon={<span>📄</span>}>Download Waste Manifest</DropdownItem>
        <DropdownDivider />
        <DropdownItem danger icon={<span>✕</span>}>Cancel Booking</DropdownItem>
      </Dropdown>
    </div>
  ),
};
