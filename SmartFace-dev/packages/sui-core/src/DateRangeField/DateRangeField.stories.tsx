import type { IsoDateRange } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import Button from '../Button';
import { DateRangeField } from './DateRangeField';

const meta = {
  title: 'Components/Inputs/DateRangeField',
  component: DateRangeField,
  tags: ['autodocs'],
  args: {
    name: 'DateRangeField',
    label: 'DateRangeField',
    placeholder: 'Please enter a date range',
  },
} satisfies Meta<typeof DateRangeField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: { from: '1999-03-30', to: '2069-08-30' },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { from: '1999-03-30', to: '2069-08-30' },
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: { from: '1999-03-30', to: '2069-08-30' },
  },
};

export const WithMinMaxValue: Story = {
  args: {
    minValue: '2025-04-23',
    maxValue: '2025-12-31',
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

export const Controlled = () => {
  const [date, setDate] = useState<IsoDateRange | undefined>({ from: '2025-10-10', to: '2025-10-11' });
  console.log(date);

  return (
    <>
      <DateRangeField name="DateField" label="Beautiful Dates" value={date} onValueChange={(value) => setDate(value)} />
    </>
  );
};

export const WithRefAndButton = () => {
  const selectedRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <DateRangeField name="DateField" label="Beautiful Dates" ref={selectedRef} />
      <Button onClick={() => console.log(selectedRef?.current?.value)}>
        Click me to log selectedRef.current.value
      </Button>
    </>
  );
};
