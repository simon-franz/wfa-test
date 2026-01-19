import type { Meta, StoryObj } from '@storybook/react';

import { LoadingAnimation } from './LoadingAnimation';

const meta = {
  title: 'Components/Feedback/LoadingAnimation',
  component: LoadingAnimation,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shimmer: Story = {
  args: {
    type: 'shimmer',
  },
};

export const Spinner: Story = {
  args: {
    type: 'spinner',
  },
};
