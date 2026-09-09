import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, Button } from '@/components/ui';

const meta: Meta<typeof Drawer> = {
  title: 'GreenCycle/UI/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const RightPlacement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="right"
          title="Green Recycling Center Details"
        >
          <div className="space-y-4 text-xs text-content-secondary leading-relaxed">
            <p>
              <strong className="text-content text-sm block mb-1">Colombo Central Recycling Hub</strong>
              Aluthmawatha Road, Colombo 15
            </p>
            <div className="p-3 bg-primary-light text-primary rounded-xl font-medium">
              Open today: 8:00 AM – 5:00 PM • Accepts PET Bottles, Cardboard & E-Waste
            </div>
            <p>
              Drop off your cleaned recyclables directly at Bay 3 for instant GreenPoints weighing.
            </p>
            <div className="pt-4 border-t border-border">
              <Button size="sm" variant="primary" fullWidth onClick={() => setIsOpen(false)}>
                Get Driving Directions
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const BottomPlacement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Action Sheet</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="bottom"
          title="Quick Waste Stream Options"
        >
          <div className="p-4 flex flex-col gap-2">
            <Button variant="secondary" fullWidth onClick={() => setIsOpen(false)}>Organic Kitchen Scraps</Button>
            <Button variant="secondary" fullWidth onClick={() => setIsOpen(false)}>Plastics & Polythene</Button>
            <Button variant="secondary" fullWidth onClick={() => setIsOpen(false)}>Hazardous / Medical</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};
