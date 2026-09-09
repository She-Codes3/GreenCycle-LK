import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '@/components/layout';

const meta: Meta<typeof Section> = {
  title: 'GreenCycle/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    background: {
      control: 'select',
      options: ['canvas', 'surface', 'muted'],
    },
  },
  args: {
    spacing: 'md',
    background: 'surface',
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args} className="px-6">
      <h3 className="text-base font-bold text-content">Municipal Section Block</h3>
      <p className="text-xs text-content-secondary mt-1">Configurable vertical spacing and surface background color.</p>
    </Section>
  ),
};
