/* eslint-disable react/jsx-key */
import type { Meta, StoryObj } from '@storybook/react';

import { OverlayEffect } from './OverlayEffect';

const meta = {
  title: 'Components/Feedback/OverlayEffect',
  component: OverlayEffect,
  args: { show: true },
} satisfies Meta<typeof OverlayEffect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
