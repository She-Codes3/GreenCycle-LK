import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@/components/ui';

const meta: Meta<typeof FileUpload> = {
  title: 'GreenCycle/UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    maxSizeMB: { control: 'number' },
  },
  args: {
    helperText: 'Upload waste audit report (PDF, PNG, JPG up to 10MB)',
    maxSizeMB: 10,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: 'File exceeds the maximum limit of 10MB for municipal upload.',
  },
};
