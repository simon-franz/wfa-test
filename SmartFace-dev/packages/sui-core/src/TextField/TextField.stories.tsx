import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes, validationStates } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Text Input Component for User Data Entry',
      description: {
        component:
          'Text fields allow users to enter and edit text, making it an essential form component for collecting user input in applications.',
      },
    },
  },
  argTypes: {
    size: { table: { defaultValue: { summary: 'medium' } } },
    spellCheck: { table: { defaultValue: { summary: 'false' } } },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'This is a textfield',
    name: 'default-textfield',
  },
};

export const Controlled: Story = {
  render: function ControlledTextField(args) {
    const [value, setValue] = useState('');

    return <TextField label="TextField - Controlled" value={value} onValueChange={setValue} {...args} />;
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <TextField key={size} size={size} label={size} {...args} />
      ))}
    </Stack>
  ),
};

export const ValidationStatesAndMessages: Story = {
  render: (args) => (
    <Stack>
      {validationStates.map((validationState) => (
        <TextField
          key={validationState}
          validationState={validationState}
          label={validationState}
          validationMessage="Validation Message"
          {...args}
        />
      ))}
    </Stack>
  ),
};
