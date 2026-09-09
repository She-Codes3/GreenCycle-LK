import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'GreenCycle/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    label: 'I confirm waste items have been rinsed and segregated',
    helperText: 'Complies with Sri Lanka Central Environmental Authority guidelines',
    disabled: false,
    indeterminate: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Select all waste stream categories',
    helperText: '3 of 6 categories selected',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Mandatory municipal fee included',
  },
};
