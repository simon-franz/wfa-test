import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Selectable Input Element for User Choices',
      description: {
        component: 'Checkboxes allow users to select one option from a set of choices.',
      },
    },
  },
  argTypes: {
    size: { table: { defaultValue: { summary: 'medium' } } },
    justifyContent: { table: { defaultValue: { summary: 'flex-start' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'This is a checkbox',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <Checkbox size={size} label={size} key={size} {...args} />
      ))}
    </Stack>
  ),
};
