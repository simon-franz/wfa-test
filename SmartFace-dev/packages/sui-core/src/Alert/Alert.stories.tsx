import Stack from '@hrworks/sui-shared/components/Stack';
import { colors } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import FontAwesomeIcon from '../FontAwesomeIcon';
import { Alert } from './Alert';
import type { AlertProps } from './Alert.types';

const corners: AlertProps['corner'][] = ['rounded', 'square'];

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'UI element for status communication',
      description: {
        component:
          'Alerts provide contextual feedback messages regarding user actions or status updates about the state of a system or page',
      },
    },
  },
  argTypes: {
    corner: { table: { defaultValue: { summary: 'rounded' } } },
    color: { table: { defaultValue: { summary: 'primary' } } },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { text: 'This is an Alert with a text.' },
};

export const Icon: Story = {
  args: {
    icon: <FontAwesomeIcon name="triangle-exclamation" />,
    text: 'Optional visual elements that enhance your alerts and provide context for your message.',
  },
};

export const Colors: Story = {
  render: (args) => (
    <Stack>
      {colors.map((color) => (
        <Alert key={color} color={color} text={color} {...args} />
      ))}
    </Stack>
  ),
};

export const Corners: Story = {
  render: (args) => (
    <Stack>
      {corners.map((corner) => (
        <Alert key={corner} corner={corner} text={corner} {...args} />
      ))}
    </Stack>
  ),
};
