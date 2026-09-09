import type { Meta, StoryObj } from '@storybook/react';
import { PointsCard } from '@/components/rewards/PointsCard';

const meta: Meta<typeof PointsCard> = {
  title: 'GreenCycle/Rewards/PointsCard',
  component: PointsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    points: { control: 'number' },
    tierName: { control: 'text' },
    tierBadge: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PointsCard>;

export const Default: Story = {
  args: {
    points: 1240,
    tierName: 'Eco Guardian',
    tierBadge: '🌿',
    expiringPoints: {
      amount: 150,
      date: 'Oct 31, 2026',
    },
    onRedeem: () => alert('Opening Eco Reward redemption catalog'),
    onHistory: () => alert('Viewing points audit log'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const HighTierChampion: Story = {
  args: {
    points: 4850,
    tierName: 'Ceylon Sustainability Champion',
    tierBadge: '👑',
    onRedeem: () => alert('Opening VIP rewards portal'),
    onHistory: () => alert('Opening transaction history'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const BeginnerCitizen: Story = {
  args: {
    points: 80,
    tierName: 'Green Starter',
    tierBadge: '🌱',
    onRedeem: () => alert('Redeem starter rewards'),
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};
