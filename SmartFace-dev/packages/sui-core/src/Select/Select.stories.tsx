import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import Button from '../Button';
import { Select } from './Select';

const meta = {
  title: 'Components/Inputs/Select',
  component: Select,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    name: 'select-0',
    label: 'Favorite Icecream?',
    mandatory: true,
    size: 'extraSmall',
    validationState: 'success',
    'aria-label': 'text',
    noneOption: { value: 'none', label: 'Please choose' },
    helpText: 'Helptext',
    options: [
      { label: 'Please choose', value: 'none' },
      { label: 'Apple', value: 'option-0' },
      { label: 'Banana', value: 'option-1' },
      { label: 'Cherry', value: 'option-2' },
      { label: 'Grape', value: 'option-3' },
      { label: 'Mango', value: 'option-4' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: 'option-3',
  },
};

export const GroupedSelection: Story = {
  args: {
    options: [
      {
        label: 'Ice-Cream',
        value: 'label-1',
        options: [
          { label: 'Chocolate', value: 'grouped-option-1' },
          { label: 'Pistachio', value: 'grouped-option-2' },
        ],
      },
      {
        label: 'Fast-Food',
        value: 'label-2',
        options: [
          { label: 'Döner', value: 'grouped-option-3' },
          { label: 'Pizza', value: 'grouped-option-4' },
          { label: 'Pommes', value: 'grouped-option-5' },
        ],
      },
    ],
  },
};

export const WithRefAndButton = () => {
  const selectRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Select name="select-0" aria-label="select-0" ref={selectRef} options={meta.args.options} />
      <Button onClick={() => console.log(selectRef.current?.value)}>Log Option via ref</Button>
    </>
  );
};
