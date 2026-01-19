import type { Meta, StoryObj } from '@storybook/react';

import { FontAwesomeIcon } from './FontAwesomeIcon';

const meta = {
  title: 'Components/Data Display/FontAwesomeIcon',
  component: FontAwesomeIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Icon component',
      description: {
        component: 'Icon set based on SVGs provided by the [FontAwesome library](https://fontawesome.com/)',
      },
    },
  },
  args: {
    variant: 'brands',
    name: 'react',
  },
} satisfies Meta<typeof FontAwesomeIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
