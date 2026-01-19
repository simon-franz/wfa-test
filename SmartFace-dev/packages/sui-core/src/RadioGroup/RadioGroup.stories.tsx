import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes, validationStates } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Radio from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Inputs/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Group of Selectable Radio Options',
      description: {
        component: 'RadioGroup allows users to select a single option from a set of mutually exclusive choices.',
      },
    },
  },
  argTypes: {
    size: { table: { defaultValue: { summary: 'medium' } } },
    optionsDirection: { table: { defaultValue: { summary: 'column' } } },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => {
    return (
      <RadioGroup label="RadioGroup" {...args}>
        <Radio value="radio-0">Option 1</Radio>
        <Radio value="radio-1">Option 2</Radio>
        <Radio value="radio-2">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledRadioGroup(args) {
    const [value, setValue] = useState<string | undefined>(args.value);

    return (
      <RadioGroup label="RadioGroup - Controlled" value={value} onValueChange={setValue} {...args}>
        <Radio value="radio-0">Option 1</Radio>
        <Radio value="radio-1">Option 2</Radio>
        <Radio value="radio-2">Option 3</Radio>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <RadioGroup key={size} size={size} label={size} {...args}>
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="3">Option 3</Radio>
        </RadioGroup>
      ))}
    </Stack>
  ),
};

export const ValidationStatesAndMessages: Story = {
  render: (args) => (
    <Stack>
      {validationStates.map((validationState) => (
        <RadioGroup
          key={validationState}
          validationState={validationState}
          label={validationState}
          validationMessage="Validation Message"
          {...args}
        >
          <Radio value="1">Option 1</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="3">Option 3</Radio>
        </RadioGroup>
      ))}
    </Stack>
  ),
};

export const NoOptionsAvailable: Story = {
  render: (args) => (
    <Stack>
      <RadioGroup label="Default Text" {...args} />
      <br />
      <RadioGroup label="Custom Text" noOptionsAvailableText="Es sind keine Optionen verfügbar." {...args} />
    </Stack>
  ),
};
