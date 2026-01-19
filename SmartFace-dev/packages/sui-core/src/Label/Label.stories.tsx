import Stack from '@hrworks/sui-shared/components/Stack';
import { validationStates } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../Icon';
import Label from '../Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Data Display/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Form Label Component',
      description: {
        component:
          'The Label component displays form labels with optional mandatory indicators and validation states. It supports both text labels and custom children content.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    label: 'Default Label',
  },
};

export const ValidationStates: Story = {
  render: (args) => (
    <Stack>
      {validationStates.map((validationState) => (
        <Label
          key={validationState}
          label={`Label with validationState: ${validationState}`}
          validationState={validationState}
          {...args}
        />
      ))}
    </Stack>
  ),
};

export const WithChildren: Story = {
  args: {
    label: 'Label with Icon as Children',
    children: <Icon name="time-field-clock" />,
  },
};
