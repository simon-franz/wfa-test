import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Toggle Control Component',
      description: {
        component: 'The Switch component provides a toggle control that allows users to switch between two states.',
      },
    },
  },
  argTypes: {
    justifyContent: { table: { defaultValue: { summary: 'flex-start' } } },
    size: { table: { defaultValue: { summary: 'medium' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'This is a Switch',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <Switch size={size} label={size} key={size} {...args} />
      ))}
    </Stack>
  ),
};
