import Stack from '@hrworks/sui-shared/components/Stack';
import { sizes } from '@hrworks/types/shared/UiTypes';
import type { Meta, StoryObj } from '@storybook/react';

import FormText from '../FormText';
import Icon from '../Icon';

const meta: Meta<typeof FormText> = {
  title: 'Components/Data Display/FormText',
  component: FormText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Textual Information Display Component',
      description: {
        component:
          'Form Text provides contextual information and guidance for form fields, such as help text, descriptions, or input requirements.',
      },
    },
  },
  argTypes: {
    size: { table: { defaultValue: { summary: 'medium' } } },
    alignItems: { table: { defaultValue: { summary: 'start' } } },
  },
};

export default meta;

type Story = StoryObj<typeof FormText>;

export const Default: Story = {
  args: { label: 'This is a Form Text', value: 'This is a Form Text.' },
};

export const Sizes: Story = {
  args: {
    value: 'This is a Form Text.',
  },
  render: (args) => (
    <Stack>
      {sizes.map((size) => (
        <FormText key={size} size={size} label={size} {...args} />
      ))}
    </Stack>
  ),
};

export const HTML: Story = {
  args: {
    label: 'This is a Form Text with HTML',
    value: 'Here is a <strong>strong HTML tag</strong> in use.',
    html: true,
  },
};

export const WithLabelChildren: Story = {
  args: {
    label: 'This is a Form Text with an Icon as LabelChildren',
    value: 'This is a Form Text.',
    labelChildren: <Icon name="time-field-clock" />,
  },
};
