import type { Meta, StoryObj } from '@storybook/react';

import Page from '../Page';
import { ClassicLayout } from './ClassicLayout';

const meta = {
  title: 'Components/Layout/ClassicLayout',
  component: ClassicLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
          <Story />
        </Page>
      </div>
    ),
  ],
  args: {
    header: {
      children: <div>Header</div>,
    },
    content: {
      headerChildren: <div>ContentHeader</div>,
      children: <div>Content</div>,
    },
    sidebar: {
      children: <div>Sidebar</div>,
    },
    footer: {
      children: <div>Footer</div>,
    },
  },
} satisfies Meta<typeof ClassicLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
