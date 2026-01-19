import ServerStatus from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ServerStatus> = {
  title: 'Components/Data Display/ServerStatus',
  component: ServerStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Customizable Server Message Display',
      description: {
        component:
          'The ServerStatus component is a flexible element for presenting server-related messages or statuses. It supports displaying a status code, title, subtitle, and optional media content, adaptable for various informational or error scenarios.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    statusCode: '404',
    title: 'UPS DA STIMMT WAS NICHT!',
    subtitle: 'DIESE SEITE KONNTE NICHT GEFUNDEN WERDEN',
    media: <img src="http://placedog.net/400/400" />,
  },
};
