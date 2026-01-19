import Page from '@hrworks/sui-core/Page';
import type { Meta, StoryObj } from '@storybook/react';

import { HrworksAdminLayout } from './HrworksAdminLayout';
import { NavItem } from './NavItem/NavItem';

const meta = {
  title: 'Components/Layout/HrworksAdminLayout',
  component: HrworksAdminLayout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      // Fix Story leaking out of Container:
      // https://github.com/storybookjs/storybook/issues/8011
      <div css={{ transform: 'scale(1)', height: '100%' }}>
        <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
          <Story />
        </Page>
      </div>
    ),
  ],
  args: {},
} satisfies Meta<typeof HrworksAdminLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: {
      navigationItems: (
        <>
          <NavItem text="First NavItem" />
          <NavItem text="Second NavItem" />
          <NavItem text="Third NavItem" />
        </>
      ),
    },
  },
};
