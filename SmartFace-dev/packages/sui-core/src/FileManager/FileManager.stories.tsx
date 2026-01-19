import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '../Button';
import { DropzoneManager } from '../Dropzone';
import Title from '../Title';
import { FileManager } from './FileManager';
import type { FileManagerProps, FileManagerValue } from './FileManager.types';

const Container = styled.div({
  display: 'flex',
  gap: '2rem',
});

const ControlledFileManager = (props: Omit<FileManagerProps, 'value' | 'onValueChange'>) => {
  const [fileValue, setFileValue] = useState<FileManagerValue[]>([]);

  const handleValueChange = (newValue: FileManagerValue[]) => {
    console.log('Value changed:', newValue);
    setFileValue(newValue);
  };

  return <FileManager {...props} value={fileValue} onValueChange={handleValueChange} />;
};

const meta = {
  title: 'Components/Utils/FileManager',
  component: ControlledFileManager,
  decorators: [
    (Story) => (
      <DropzoneManager>
        <Story />
      </DropzoneManager>
    ),
  ],
  parameters: {
    ControlledFileManagerdocs: {
      description: {
        component:
          'The FileManager is a component for managing files. It enables uploading, displaying and removing files via file selection dialog. The component supports different modes such as "single", "multi" or "growing". It can be also disabled and offers customizable help texts as well as configurable window dropzone behavior.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    value: [],
    name: 'file-manager',
    mode: 'single',
    trigger: <Button>Upload</Button>,
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multi', 'growing'],
    },
    disabled: {
      control: 'boolean',
    },
    showList: {
      control: 'boolean',
      description: 'Controls if the list of uploaded files is visible',
    },
  },
} satisfies Meta<typeof FileManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helpText: 'This is the default File Manager.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WindowDropzone: Story = {
  render: (args) => (
    <ControlledFileManager
      {...args}
      helpText="Drag a File into the Window to see the Window Dropzone"
      windowDropzone={{ show: true, text: 'Drag and Drop' }}
    />
  ),
};

export const Modes: Story = {
  render: (args) => (
    <Container>
      <div>
        <Title>Single mode</Title>
        <ControlledFileManager {...args} helpText="Upload a single file" />
      </div>
      <div>
        <Title>Multiple mode</Title>
        <ControlledFileManager {...args} mode="multi" helpText="Upload multiple files at once" />
      </div>
      <div>
        <Title>Growing mode</Title>
        <ControlledFileManager {...args} mode="growing" helpText="Upload multiple files" />
      </div>
    </Container>
  ),
};

export const Validations: Story = {
  render: (args) => (
    <Container>
      <div>
        <Title>File Type Validation</Title>
        <ControlledFileManager
          {...args}
          mode="multi"
          helpText="Only PDF and images are allowed"
          validations={{
            allowedFileTypes: {
              value: ['application/pdf', 'image/jpeg', 'image/png'],
              errorMessage: 'Only PDF and image files are allowed',
              extensions: ['.pdf', '.jpg', '.png'],
            },
          }}
        />
      </div>
      <div>
        <Title>File Size Validation</Title>
        <ControlledFileManager
          {...args}
          mode="growing"
          helpText="Max 2MB per file, 5MB total"
          validations={{
            sizeOfSingleFile: {
              value: 2 * 1024 * 1024,
              errorMessage: 'Each file must be smaller than 2MB',
            },
            sizeOfAllFiles: {
              value: 5 * 1024 * 1024,
              errorMessage: 'Total size must be less than 5MB',
            },
          }}
        />
      </div>
      <div>
        <Title>File Amount Validation</Title>
        <ControlledFileManager
          {...args}
          mode="multi"
          helpText="Maximum 3 files allowed"
          validations={{
            maxFileAmount: {
              value: 3,
              errorMessage: 'You can upload a maximum of 3 files',
            },
          }}
        />
      </div>
      <div>
        <Title>Empty File Validation</Title>
        <ControlledFileManager
          {...args}
          mode="multi"
          helpText="Empty files are not allowed"
          validations={{
            emptyFile: {
              value: false, // TODO: Value hat hier keinerlei Wirkung und wird in einer kommenden Issue entfernt werden können - ohne TS Error!
              errorMessage: 'Empty files are not allowed',
            },
          }}
        />
      </div>
    </Container>
  ),
};
