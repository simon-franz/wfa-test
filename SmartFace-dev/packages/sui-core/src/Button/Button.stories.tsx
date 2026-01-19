import Stack from '@hrworks/sui-shared/components/Stack';
import { colors, corners, sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import FontAwesomeIcon from '../FontAwesomeIcon';
import Icon from '../Icon';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

const variants: ButtonProps['variant'][] = ['filled', 'subtle', 'ghost', 'text', 'link', 'unstyled'];

const meta: Meta<typeof Button> = {
  title: 'Components/Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Interactive UI Element for User Actions',
      description: {
        component:
          'Buttons allow users to initiate an action or command when clicked or tapped, which makes them a fundamental building block of our library.',
      },
    },
  },
  argTypes: {
    corner: {
      table: { defaultValue: { summary: 'rounded' } },
    },
    htmlTag: {
      table: { defaultValue: { summary: 'button' } },
    },
    size: {
      table: { defaultValue: { summary: 'medium' } },
    },
    type: {
      table: { defaultValue: { summary: 'button' } },
    },
    variant: {
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      table: { defaultValue: { summary: 'primary', detail: "'secondary' if variant === 'text'" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <Button key={size} size={size} {...args}>
          {size}
        </Button>
      ))}
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <Button key={color} color={color} {...args}>
          {color}
        </Button>
      ))}
    </Stack>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack>
      {variants.map((variant) => (
        <Button key={variant} variant={variant} {...args}>
          {variant}
        </Button>
      ))}
    </Stack>
  ),
};

export const Corners: Story = {
  render: (args) => (
    <Stack>
      {corners.map((corner) => (
        <Button key={corner} corner={corner} {...args}>
          {corner}
        </Button>
      ))}
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Stack>
      <Button leftIcon={<FontAwesomeIcon name="up-right-from-square" />} {...args}>
        Open
      </Button>
      <Button rightIcon={<Icon name="combo-box-clear" />} {...args}>
        Clear
      </Button>
    </Stack>
  ),
};
