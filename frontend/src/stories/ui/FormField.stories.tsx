import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Input } from '@/components/ui';

const meta: Meta<typeof FormField> = {
  title: 'GreenCycle/UI/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
  },
  args: {
    label: 'NIC / National Identity Card Number',
    htmlFor: 'nic-input',
    required: true,
    helperText: 'Required for verified municipal citizen rewards account',
    children: <Input id="nic-input" placeholder="e.g. 199012345678 or 901234567V" />,
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {};

export const OptionalField: Story = {
  args: {
    label: 'Alternative Contact Number',
    required: false,
    optional: true,
    helperText: 'Used if main phone is unreachable during pickup',
    children: <Input placeholder="+94 11 234 5678" />,
  },
};

export const ErrorValidation: Story = {
  args: {
    label: 'Postal Code',
    error: 'Please enter a valid 5-digit Sri Lankan postal code (e.g., 00300).',
    children: <Input defaultValue="99" error />,
  },
};

export const SuccessValidation: Story = {
  args: {
    label: 'Disposal Center Account',
    success: 'Facility verified by Central Environmental Authority (CEA).',
    children: <Input defaultValue="CEA-COL-2026-99" success />,
  },
};
