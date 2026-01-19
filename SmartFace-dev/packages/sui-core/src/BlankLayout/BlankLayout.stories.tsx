import { ServerStatus } from '@hrworks/error-handling';
import type { Meta, StoryObj } from '@storybook/react';

import Page from '../Page';
import Text from '../Text';
import { BlankLayout } from './BlankLayout';

const meta = {
  title: 'Components/Layout/BlankLayout',
  component: BlankLayout,
  tags: ['autodocs'],
  render: (args) => (
    <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
      <BlankLayout {...args} />
    </Page>
  ),
} satisfies Meta<typeof BlankLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <Text>Very blank here</Text> },
};

export const ServerStatusTest: Story = {
  args: {
    logo: { src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png' },
    children: (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ServerStatus
          statusCode="404"
          title="UPS DA STIMMT WAS NICHT!"
          subtitle="DIESE SEITE KONNTE NICHT GEFUNDEN WERDEN"
        />
      </div>
    ),
  },
};
