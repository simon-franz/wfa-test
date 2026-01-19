import type { Meta, StoryObj } from '@storybook/react';

import { Userlane } from './Userlane';

const meta = {
  title: 'Components/Utils/Userlane',
  component: Userlane,
  parameters: { layout: 'padded' },

  args: {
    application: '3q4kdqy10r',
    userId: 'smartface-tester',
    segmentAttributes: { role: 'admin' },
  },
} satisfies Meta<typeof Userlane>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SetLanguageToDe: Story = { args: { language: 'de' } };

export const SetUserSegmentRoleToUser: Story = { args: { segmentAttributes: { role: 'user' } } };
