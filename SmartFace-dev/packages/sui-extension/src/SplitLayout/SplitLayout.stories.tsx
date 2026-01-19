import { css } from '@emotion/react';
import Page from '@hrworks/sui-core/Page';
import type { Meta, StoryObj } from '@storybook/react';

import { SplitLayout } from './SplitLayout';

const childrenStyles = css({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const meta = {
  title: 'Components/Layout/SplitLayout',
  component: SplitLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={{ height: 500 }}>
        <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
          <Story />
        </Page>
      </div>
    ),
  ],
  args: {
    sidebarChildren: (
      <div
        css={[
          childrenStyles,
          {
            color: 'white',
          },
        ]}
      >
        sidebarChildren
      </div>
    ),
    children: <div css={childrenStyles}>contentChildren</div>,
  },
} satisfies Meta<typeof SplitLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
