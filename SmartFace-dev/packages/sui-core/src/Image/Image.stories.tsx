import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './Image';

const meta = {
  title: 'Components/Media/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'ui-assets/pictures/logo_default_light.png',
    alt: 'smartface logo',
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SquareLandscape: Story = {
  args: { src: 'https://placedog.net/800/400', alt: 'landscape test image', corner: 'square' },
};

export const SquarePortrait: Story = {
  args: { src: 'https://placedog.net/400/800', alt: 'portrait test image', corner: 'square' },
};

export const Rounded: Story = {
  args: { src: 'https://placedog.net/400/400', alt: 'rounded test image', corner: 'rounded' },
};

export const Circular: Story = {
  args: { src: 'https://placedog.net/400/400', alt: 'circular test image', corner: 'circular' },
};

export const CircularWithOnClick: Story = {
  args: {
    src: 'https://placedog.net/400/400',
    alt: 'circular test image',
    corner: 'circular',
    onClick: () => {},
  },
};
