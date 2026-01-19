import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import type { Meta, StoryObj } from '@storybook/react';

import { CommentList, CommentListItem } from './';

const meta: Meta<typeof CommentList> = {
  title: 'Components/Data Display/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: 'Display Collection of User Comments',
      description: {
        component: 'The CommentList component displays a collection of user comments as its children.',
      },
    },
  },
  argTypes: {
    textUrlMaxLength: { table: { defaultValue: { summary: '25' } } },
  },
};

export default meta;

type Story = StoryObj<typeof CommentList>;

export const Default: Story = {
  render: (args) => {
    return (
      <CommentList {...args}>
        <CommentListItem timestamp="12.05.2025 12:34 Uhr" signature="max.mustermann@hrworks.de" text="This is a text" />
        <CommentListItem
          timestamp="12.05.2025 12:34 Uhr"
          signature="max.mustermann@hrworks.de"
          text="This is a text with a Url: https://github.com"
        />
        <CommentListItem
          timestamp="12.05.2025 12:34 Uhr"
          signature="max.mustermann@hrworks.de"
          text="This is a text with a long Url: https://www.bundesgesundheitsministerium.de/themen/gesundheitswesen/selbstverwaltung/kassenaerztliche-vereinigungen.html"
        />
      </CommentList>
    );
  },
};

const toolbarChildren = (
  <div style={{ display: 'flex', gap: 10 }}>
    <FontAwesomeIcon name="pen-to-square" />
    <FontAwesomeIcon name="trash" />
    <FontAwesomeIcon name="ellipsis-vertical" />
  </div>
);

export const WithToolbarChildren: Story = {
  render: (args) => {
    return (
      <CommentList {...args}>
        <CommentListItem
          timestamp="12.05.2025 12:34 Uhr"
          signature="max.mustermann@hrworks.de"
          text="This is a text"
          toolbarChildren={toolbarChildren}
        />
        <CommentListItem
          timestamp="12.05.2025 12:34 Uhr"
          signature="max.mustermann@hrworks.de"
          text="This is a text with a Url: https://github.com"
          toolbarChildren={toolbarChildren}
        />
        <CommentListItem
          timestamp="12.05.2025 12:34 Uhr"
          signature="max.mustermann@hrworks.de"
          text="This is a text with a long Url: https://www.bundesgesundheitsministerium.de/themen/gesundheitswesen/selbstverwaltung/kassenaerztliche-vereinigungen.html"
          toolbarChildren={toolbarChildren}
        />
      </CommentList>
    );
  },
};
