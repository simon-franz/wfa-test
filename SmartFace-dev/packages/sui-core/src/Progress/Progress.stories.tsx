import Stack from '@hrworks/sui-shared/components/Stack';
import getId from '@hrworks/sui-shared/functions/getId';
import { colors, sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import ProgressLinear from './Linear';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  subcomponents: { ProgressLinear },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Display progress of tasks or operations to users',
      description: {
        component:
          'Visual feedback component for ongoing processes. Supports linear and circular presentations with customizable colors, sizes, and animation states.',
      },
    },
  },
  argTypes: {
    presentation: { table: { defaultValue: { summary: 'linear' } } },
    size: { table: { defaultValue: { summary: 'medium' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const LinearColors: Story = {
  parameters: {
    controls: { exclude: 'presentation' },
  },
  render: (args) => (
    <Stack direction="vertical">
      {colors.map((color) => (
        <Progress presentation="linear" progress={60} key={color} color={color} {...args} />
      ))}
    </Stack>
  ),
};

export const LinearSizes: Story = {
  parameters: {
    controls: { exclude: 'presentation' },
  },
  render: (args) => (
    <Stack direction="vertical">
      {sizes.map((size) => (
        <Progress presentation="linear" progress={60} key={size} size={size} {...args} />
      ))}
    </Stack>
  ),
};

export const CircularColors: Story = {
  parameters: {
    controls: { exclude: 'presentation' },
  },
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <span key={getId()} style={{ height: 50 }}>
          <Progress presentation="circular" progress={75} key={color} color={color} {...args} />
        </span>
      ))}
    </Stack>
  ),
};
