import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import Button from '../Button';
import { IntegerField } from './IntegerField';

const meta = {
  title: 'Components/Inputs/IntegerField',
  component: IntegerField,
  tags: ['autodocs'],
  args: {
    name: 'IntegerField',
    label: 'Label',
  },
  argTypes: {
    value: { control: 'text' },
  },
} satisfies Meta<typeof IntegerField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: '1234',
  },
  parameters: {
    controls: { include: ['defaultValue'] },
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  parameters: {
    controls: { include: ['readOnly'] },
  },
};

export const Mandatory: Story = {
  args: {
    mandatory: true,
  },
  parameters: {
    controls: { include: ['mandatory'] },
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Please type an integer',
  },
  parameters: {
    controls: { include: ['placeholder'] },
  },
};

export const SpellCheck: Story = {
  args: {
    spellCheck: true,
  },
  parameters: {
    controls: { include: ['spellCheck'] },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    controls: { include: ['disabled'] },
  },
};

export const HelpText: Story = {
  args: {
    helpText: 'This will help you',
  },
  parameters: {
    controls: { include: ['helpText'] },
  },
};

export const Sizes: Story = {
  argTypes: {
    size: { options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'] },
  },
  parameters: {
    controls: { include: ['size'] },
  },
};

export const ValidationStateAndMessage: Story = {
  argTypes: {
    validationState: { options: ['success', 'warning', 'danger'] },
  },
  args: {
    validationMessage: 'Input validated!',
  },
  parameters: {
    controls: { include: ['validationState'] },
  },
};

export const WithRefAndButton = () => {
  const selectRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <IntegerField name="IntegerField" label="Beautiful Integers" ref={selectRef} />
      <Button onClick={() => console.log(selectRef?.current?.value)}>Click me to log selectRef.current.value</Button>
    </>
  );
};
