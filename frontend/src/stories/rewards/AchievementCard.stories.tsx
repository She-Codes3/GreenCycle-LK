import type { Meta, StoryObj } from '@storybook/react';
import { AchievementCard } from '@/components/rewards/AchievementCard';

const meta: Meta<typeof AchievementCard> = {
  title: 'GreenCycle/Rewards/AchievementCard',
  component: AchievementCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    unlocked: { control: 'boolean' },
    unlockedDate: { control: 'text' },
    rewardPoints: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof AchievementCard>;

export const Unlocked: Story = {
  args: {
    title: 'Zero Waste Household Pioneer',
    description: 'Segregated 100% of organic and recyclable waste consecutively for 30 collection cycles.',
    icon: '🏆',
    unlocked: true,
    unlockedDate: 'Aug 28, 2026',
    rewardPoints: 200,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const InProgressLocked: Story = {
  args: {
    title: 'Plastic Patrol Champion',
    description: 'Submit 50 kg of clean PET bottles and polythene to municipal collection points.',
    icon: '🍾',
    unlocked: false,
    progress: {
      current: 34,
      total: 50,
      unit: 'kg',
    },
    rewardPoints: 150,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const EWasteHero: Story = {
  args: {
    title: 'Safe E-Waste Handler',
    description: 'Safely recycled obsolete electronics or battery cells at certified CEA drop-off centers.',
    icon: '⚡',
    unlocked: false,
    progress: {
      current: 2,
      total: 5,
      unit: 'devices',
    },
    rewardPoints: 100,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const AchievementsGrid: Story = {
  render: () => {
    const list = [
      {
        title: 'Community Watchdog',
        description: 'Reported 5 validated illegal dumpsites in Colombo district.',
        icon: '🛡️',
        unlocked: true,
        unlockedDate: 'Jul 14, 2026',
        rewardPoints: 120,
      },
      {
        title: 'Master Composter',
        description: 'Successfully processed 25 kg kitchen scraps into garden compost.',
        icon: '🌱',
        unlocked: true,
        unlockedDate: 'Aug 02, 2026',
        rewardPoints: 100,
      },
      {
        title: 'Century Recycler',
        description: 'Complete 100 verified municipal waste collection handovers.',
        icon: '⭐',
        unlocked: false,
        progress: { current: 68, total: 100, unit: 'pickups' },
        rewardPoints: 300,
      },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {list.map((item, idx) => (
          <AchievementCard
            key={idx}
            title={item.title}
            description={item.description}
            icon={item.icon}
            unlocked={item.unlocked}
            unlockedDate={item.unlockedDate}
            progress={item.progress}
            rewardPoints={item.rewardPoints}
          />
        ))}
      </div>
    );
  },
};
