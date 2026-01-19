import type { Meta, StoryObj } from '@storybook/react';

import { HrworksAdminLayoutProfileImage } from './HrworksAdminLayoutProfileImage';

const meta = {
  title: 'Components/Media/HrworksAdminLayoutProfileImage',
  component: HrworksAdminLayoutProfileImage,
  tags: ['autodocs'],
  args: {
    // Write default props here
  },
} satisfies Meta<typeof HrworksAdminLayoutProfileImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SrcRectangle: Story = { args: { src: 'https://placedog.net/500/500' } };

export const SrcWidthBiggerThanHeight: Story = {
  args: { src: 'https://placedog.net/1500/500' },
};

export const SrcHeightBiggerThanWidth: Story = {
  args: { src: 'https://placedog.net/500/1500' },
};
