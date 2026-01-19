import type { Meta } from '@storybook/react';

import { CmdTable, CmdTableItem, type CmdTableItemProps } from './';

export default {
  title: 'Components/Data Display/CmdTable',
  component: CmdTable,
} as Meta<typeof CmdTable>;

const itemPropsOpen = {
  title: 'Document Title',
  url: 'www.wikipedia.de',
  confirmed: false,
  onClick: () => {
    console.log('Document Accepted');
  },
};

const itemPropsAccepted = {
  title: 'Document Title',
  url: 'www.wikipedia.de',
  confirmed: true,
  onClick: () => {
    console.log('This will never happen...');
  },
};

const items: Array<CmdTableItemProps> = [
  { id: '1', ...itemPropsOpen },
  { id: '2', ...itemPropsAccepted },
  { id: '3', ...itemPropsOpen },
  { id: '4', ...itemPropsAccepted },
  { id: '5', ...itemPropsOpen },
];

export const Default = {
  args: {
    children: items.map((props, i) => <CmdTableItem key={i} {...props} />),
  },
};
