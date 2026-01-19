import type { Meta, StoryObj } from '@storybook/react';

import { ImageCropper } from './ImageCropper';

const meta = {
  title: 'Components/Media/ImageCropper',
  component: ImageCropper,
  tags: ['autodocs'],
  args: {
    url: 'https://placedog.net/1800/1400',
    name: 'img-url',
  },
} satisfies Meta<typeof ImageCropper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
