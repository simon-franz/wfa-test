import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Button } from '../Button/Button';
import { DateField } from './DateField';

const meta = {
  title: 'Components/Inputs/DateField',
  component: DateField,
  tags: ['autodocs'],
  args: {
    name: 'dateField',
    label: 'Date',
    placeholder: 'Enter a date',
  },
} satisfies Meta<typeof DateField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: '2023-06-15',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '2023-06-15',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: '2023-06-15',
  },
};

export const WithMinMaxValue: Story = {
  args: {
    minValue: '2023-01-01',
    maxValue: '2023-12-31',
  },
};

export const WithCustomFormat: Story = {
  args: {
    format: 'MMDDYYYY',
  },
};

export const WithValidation: Story = {
  args: {
    mandatory: true,
    validationMessage: 'This field is required',
    validationState: 'danger',
  },
};

export const WithHelpText: Story = {
  args: {
    helpText: 'Please enter a date in the format DD.MM.YYYY',
  },
};

export const WithModalPresentation: Story = {
  args: {
    presentation: 'modal',
  },
};

export const WithoutMonthAndYearPicker: Story = {
  args: {
    showMonthAndYearPicker: false,
  },
};

export const WithRefAndButton = () => {
  const selectedRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <DateField name="DateField" label="Beautiful Dates" ref={selectedRef} />
      <Button onClick={() => console.log(selectedRef?.current?.value)}>
        Click me to log selectedRef.current.value
      </Button>
    </>
  );
};
