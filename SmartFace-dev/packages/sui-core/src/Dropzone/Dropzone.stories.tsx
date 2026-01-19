import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../Alert';
import Dropzone from '../Dropzone';
import { DropzoneManager } from './DropzoneManager';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Inputs/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'File Upload Interface for Drag and Drop Functionality',
      description: {
        component: 'Dropzones provide an intuitive drag-and-drop interface for file uploads.',
      },
    },
  },
  argTypes: {
    mode: {
      control: false,
    },
    accept: {
      control: false,
    },
    maxFileAmount: {
      control: false,
    },
    alternativeChildren: {
      control: false,
    },
    isWindowDropzone: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  args: {
    children: 'Drop files here',
  },
};

export const WithAlternativeChildren: Story = {
  args: {
    alternativeChildren: <Alert text="Dropzone with Alternative Children" />,
    children: 'Drop files here',
  },
  render: (args) => (
    <DropzoneManager>
      <Dropzone {...args} />
    </DropzoneManager>
  ),
};
