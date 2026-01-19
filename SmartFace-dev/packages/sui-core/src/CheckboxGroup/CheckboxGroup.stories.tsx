import type { Meta, StoryObj } from '@storybook/react';

import Form from '../Form';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/Inputs/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  args: {
    label: 'CheckboxGroup',
    name: 'checkboxgroup-0',
    options: [
      { id: 'chk-0', label: 'Option 1' },
      { id: 'chk-1', label: 'Option 2' },
      { id: 'chk-2', label: 'Option 3' },
    ],
  },
  render: (args) => (
    <Form id="form-0">
      <CheckboxGroup {...args} />
    </Form>
  ),
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    value: ['chk-0', 'chk-1', 'chk-2'],
  },
};

export const Danger: Story = {
  args: {
    value: ['chk-0'],
    validationState: 'danger',
    validationMessage: 'validationMessage',
  },
};

export const Mandatory: Story = {
  args: {
    value: ['chk-0'],
    mandatory: true,
  },
};

export const NoOption: Story = {
  args: { options: undefined },
};

export const NoOptionAvailableText: Story = {
  args: { options: [], noOptionsAvailableText: 'Es sind keine Optionen verfügbar.' },
};
