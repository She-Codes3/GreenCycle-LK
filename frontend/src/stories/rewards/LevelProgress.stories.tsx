import type { Meta, StoryObj } from '@storybook/react';
import { LevelProgress } from '@/components/rewards/LevelProgress';

const meta: Meta<typeof LevelProgress> = {
  title: 'GreenCycle/Rewards/LevelProgress',
  component: LevelProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    currentLevel: { control: 'number' },
    levelTitle: { control: 'text' },
    currentXp: { control: 'number' },
    nextLevelXp: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof LevelProgress>;

export const Default: Story = {
  args: {
    currentLevel: 4,
    levelTitle: 'Senior Eco Steward',
    currentXp: 1850,
    nextLevelXp: 2500,
    perks: [
      'Priority bulky waste on-demand pickup bookings',
      '15% extra GreenPoints bonus on e-waste drop-offs',
      'Free quarterly kitchen compost activator delivery',
      'Exclusive invite to Western Province Clean Green summits',
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export const StarterLevel: Story = {
  args: {
    currentLevel: 1,
    levelTitle: 'Green Citizen',
    currentXp: 120,
    nextLevelXp: 500,
    perks: [
      'Digital waste segregation guide & calendar',
      'Real-time municipal compactor truck tracking',
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export const MaxLevel: Story = {
  args: {
    currentLevel: 10,
    levelTitle: 'Ceylon Eco Vanguard',
    currentXp: 10000,
    nextLevelXp: 10000,
    perks: [
      'Free annual home hazardous disposal inspection',
      'CMC Community Eco Leader badge & council direct line',
      'Unlimited priority bulk pickups across Sri Lanka',
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};
