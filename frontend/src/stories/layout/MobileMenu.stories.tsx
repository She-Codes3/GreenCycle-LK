import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MobileMenu, SidebarItem } from '@/components/layout';
import { Button } from '@/components/ui';

const meta: Meta<typeof MobileMenu> = {
  title: 'GreenCycle/Layout/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileMenu>;

export const Open: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Mobile Menu</Button>
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <SidebarItem label="Home Overview" icon={<span>🏠</span>} active />
          <SidebarItem label="Collection Schedule" icon={<span>📅</span>} />
          <SidebarItem label="Live Waste Trucks" icon={<span>🚛</span>} badge="2 Live" />
          <SidebarItem label="Report Dumping" icon={<span>📸</span>} />
          <SidebarItem label="Redeem Rewards" icon={<span>🎁</span>} badge="480 pts" />
        </MobileMenu>
      </div>
    );
  },
};
