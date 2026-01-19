import type { Meta, StoryObj } from '@storybook/react';

import { AfterEffectsMedia } from './AfterEffectsMedia';

const meta = {
  title: 'Components/Data Display/AfterEffectsMedia',
  component: AfterEffectsMedia,
  tags: ['autodocs'],
  args: {
    url: 'https://d9yw7530xbzu.cloudfront.net/assets/lock+animation.json',
    loopStartFrame: 30,
    loopEndFrame: 70,
  },
} satisfies Meta<typeof AfterEffectsMedia>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
