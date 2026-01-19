import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes, validationStates } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import PasswordField from '../PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Components/Inputs/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Secure Input Field for Password Entry',
      description: {
        component: 'Password fields provide a secure way for users to enter sensitive information.',
      },
    },
  },
  argTypes: {
    allowShowPassword: { table: { defaultValue: { summary: 'true' } } },
    size: { table: { defaultValue: { summary: 'medium' } } },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {
  args: {
    label: 'Default Password Field',
  },
};

export const DefaultValue: Story = {
  args: {
    label: 'Password Field with default value',
    defaultValue: 'This is a Password Field with a default value.',
  },
};

export const HideAllowShowPassword: Story = {
  args: {
    label: 'Password field without the option to show password',
    allowShowPassword: false,
  },
};

export const HelpText: Story = {
  args: {
    label: 'Password Field with help text',
    helpText: 'This is a Password Field with a help text.',
  },
};

export const Sizes: Story = {
  args: {
    label: 'Size',
  },
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <PasswordField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Stack>
  ),
};

export const ValidationStateAndMessage: Story = {
  args: {
    label: 'Password Field with Validation state',
  },
  render: (args) => (
    <Stack>
      {validationStates.map((validationState) => (
        <PasswordField
          key={validationState}
          validationState={validationState}
          validationMessage={`Validation message in validation state ${validationState}.`}
          {...args}
        />
      ))}
    </Stack>
  ),
};
