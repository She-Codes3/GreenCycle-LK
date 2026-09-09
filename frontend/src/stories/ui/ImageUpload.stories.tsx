import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from '@/components/ui';

const meta: Meta<typeof ImageUpload> = {
  title: 'GreenCycle/UI/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'banner'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Upload Photo of Dumped Waste',
    helperText: 'Clear photo showing landmark or street sign in Sri Lanka',
    aspectRatio: 'video',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {};

export const SquareAspect: Story = {
  args: {
    label: 'Item Verification Thumbnail',
    aspectRatio: 'square',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};
