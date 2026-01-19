import { OVERFLOW_STRING } from '@hrworks/sui-shared';
import Stack from '@hrworks/sui-shared/components/Stack';
import { colors, corners } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Small status descriptor for UI elements',
      description: {
        component:
          'Badges are small elements that highlight or display brief information like counts or status indicators.',
      },
    },
  },
  argTypes: {
    variant: { table: { defaultValue: { summary: 'filled' } } },
    corner: { table: { defaultValue: { summary: 'pill' } } },
    size: { table: { defaultValue: { summary: 'medium' } } },
    color: { table: { defaultValue: { summary: 'primary' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };

export const WithButton: Story = {
  args: {
    children: '1',
    anchor: <Button>Button with Badge</Button>,
  },
};

export const WithLongText: Story = {
  args: {
    children: OVERFLOW_STRING,
  },
};

export const Colors: Story = {
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <Badge key={color} color={color} {...args}>
          {color}
        </Badge>
      ))}
    </Stack>
  ),
};

export const Corners: Story = {
  render: (args) => (
    <Stack>
      {corners.map((corner) => (
        <Badge key={corner} corner={corner} {...args}>
          {corner}
        </Badge>
      ))}
    </Stack>
  ),
};
