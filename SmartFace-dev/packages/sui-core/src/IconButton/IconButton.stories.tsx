import Stack from '@hrworks/sui-shared/components/Stack';
import { colors, corners, sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import type { ButtonProps } from '../Button/Button.types';
import FontAwesomeIcon from '../FontAwesomeIcon';
import { IconButton } from './IconButton';

const variants: ButtonProps['variant'][] = ['text', 'link', 'filled', 'subtle', 'ghost', 'unstyled'];

const meta: Meta<typeof IconButton> = {
  title: 'Components/Inputs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Icon-only Button for Compact Actions',
      description: {
        component:
          'IconButtons provide a way to trigger actions using only an icon, saving space in the UI while maintaining functionality.',
      },
    },
  },
  argTypes: {
    corner: { table: { defaultValue: { summary: 'pill' } } },
    variant: { table: { defaultValue: { summary: 'filled' } } },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <FontAwesomeIcon name="bug" />,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <IconButton key={size} size={size} {...args}>
          <FontAwesomeIcon name="bug" />
        </IconButton>
      ))}
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <IconButton key={color} color={color} {...args}>
          <FontAwesomeIcon name="bug" />
        </IconButton>
      ))}
    </Stack>
  ),
};

export const Corners: Story = {
  render: (args) => (
    <Stack>
      {corners.map((corner) => (
        <IconButton key={corner} corner={corner} {...args}>
          <FontAwesomeIcon name="bug" />
        </IconButton>
      ))}
    </Stack>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack>
      {variants.map((variant) => (
        <IconButton key={variant} variant={variant} {...args}>
          <FontAwesomeIcon name="bug" />
        </IconButton>
      ))}
    </Stack>
  ),
};
