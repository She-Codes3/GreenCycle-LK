import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from '@/components/layout';

const meta: Meta<typeof UserMenu> = {
  title: 'GreenCycle/Layout/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  args: {
    user: {
      name: 'Nimali Jayawardena',
      email: 'nimali@greencycle.lk',
      role: 'RESIDENT',
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
  render: (args) => (
    <div className="p-12 flex justify-start">
      <UserMenu
        {...args}
        onProfile={() => alert('View Profile')}
        onSettings={() => alert('View Settings')}
        onLogout={() => alert('Log out')}
      />
    </div>
  ),
};
