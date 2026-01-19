import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '../Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Interactive UI Element for User Actions',
      description: {
        component:
          'Modals are overlay components that display important information to users or prompt them to input data.',
      },
    },
  },
  argTypes: {
    closeOnBackdropClick: {
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'This is a Modal',
    closeable: true,
    children: 'This is a Modal with a text.',
  },
  render: function ModalStory(args) {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => setIsOpen(!isOpen);

    return (
      <div>
        <Button onClick={onClick}>Open Modal</Button>
        <Modal onClose={onClick} show={isOpen} footer={<Button onClick={onClick}>Close</Button>} {...args} />
      </div>
    );
  },
};
