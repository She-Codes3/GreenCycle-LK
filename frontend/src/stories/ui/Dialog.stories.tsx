import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, Button } from '@/components/ui';

const meta: Meta<typeof Dialog> = {
  title: 'GreenCycle/UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Confirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Trigger Confirm Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('Collection request confirmed!');
            setIsOpen(false);
          }}
          title="Confirm Recycling Pickup"
          message="Dispatch collection truck CMB-4521 to 42 Flower Road, Colombo 07?"
          confirmText="Confirm Pickup"
          cancelText="Go Back"
        />
      </div>
    );
  },
};

export const DangerConfirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Report</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('Report removed.');
            setIsOpen(false);
          }}
          variant="danger"
          title="Delete Illegal Dumping Report?"
          message="This action permanently removes report #REP-504 from the Colombo Municipal Council verification queue."
          confirmText="Delete Permanently"
          cancelText="Keep Report"
        />
      </div>
    );
  },
};
