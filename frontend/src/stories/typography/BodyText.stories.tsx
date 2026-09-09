import type { Meta, StoryObj } from '@storybook/react';
import { BodyText } from '@/components/typography';

const meta: Meta<typeof BodyText> = {
  title: 'GreenCycle/Typography/BodyText',
  component: BodyText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'muted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
    },
  },
  args: {
    children: 'GreenCycle LK connects citizens with local municipal councils to streamline waste segregation at source, track collection trucks in real time, and earn redeemable GreenPoints for verified recycling efforts.',
    variant: 'secondary',
    size: 'base',
    weight: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof BodyText>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 max-w-xl">
      <BodyText variant="default">
        Default High-Contrast Content: &quot;Recyclable plastics must be thoroughly rinsed to prevent batch contamination at sorting yards.&quot;
      </BodyText>
      <BodyText variant="secondary">
        Secondary Content: &quot;Municipal collectors reserve the right to decline non-segregated wet bags during recyclables-only collection days.&quot;
      </BodyText>
      <BodyText variant="muted">
        Muted Content: &quot;Reference CEA Sri Lanka guidelines for solid waste management regulations.&quot;
      </BodyText>
    </div>
  ),
};
