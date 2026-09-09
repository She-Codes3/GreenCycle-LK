import type { Meta, StoryObj } from '@storybook/react';
import { Navbar, UserMenu } from '@/components/layout';
import { Button } from '@/components/ui';

const meta: Meta<typeof Navbar> = {
  title: 'GreenCycle/Layout/Navbar',
  component: Navbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar
      navigation={
        <div className="flex items-center gap-1">
          <a href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium text-primary bg-primary-light">
            Overview
          </a>
          <a href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium text-content-secondary hover:text-primary">
            Routes & Maps
          </a>
          <a href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium text-content-secondary hover:text-primary">
            Pickups
          </a>
          <a href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium text-content-secondary hover:text-primary">
            Eco Rewards
          </a>
        </div>
      }
      actions={
        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary">
            <span>🔔</span>
          </Button>
          <UserMenu
            user={{
              name: 'Kavindu Perera',
              email: 'kavindu@greencycle.lk',
              role: 'RESIDENT',
            }}
          />
        </div>
      }
    />
  ),
};
