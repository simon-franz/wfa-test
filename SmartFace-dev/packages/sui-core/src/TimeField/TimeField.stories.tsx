import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes, validationStates } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TimeField } from './TimeField';

const meta: Meta<typeof TimeField> = {
  title: 'Components/Inputs/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Time Input Component for Precise Time Selection',
      description: {
        component:
          'Time Fields allow users to input and select time values with precision. They provide a consistent interface for time-based data entry.',
      },
    },
  },
  argTypes: {
    size: { table: { defaultValue: { summary: 'medium' } } },
    timePickerMinutesStepSize: { table: { defaultValue: { summary: '15' } } },
  },
};

export default meta;

type Story = StoryObj<typeof TimeField>;

export const Default: Story = {
  args: {
    label: 'This is a timefield',
  },
};

export const Controlled: Story = {
  render: function ControlledTimeField(args) {
    const [value, setValue] = useState('');

    return <TimeField label="TimeField - Controlled" value={value} onValueChange={setValue} {...args} />;
  },
};

export const Sizes: Story = {
  args: {
    label: 'Size',
  },
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <TimeField key={size} size={size} label={size} placeholder={size} {...args} />
      ))}
    </Stack>
  ),
};

export const ValidationStatesAndMessages: Story = {
  args: {
    label: 'Validation State and Message',
  },
  render: (args) => (
    <Stack>
      {validationStates.map((validationState) => (
        <TimeField
          key={validationState}
          validationState={validationState}
          validationMessage="Validation Message"
          {...args}
        />
      ))}
    </Stack>
  ),
};
