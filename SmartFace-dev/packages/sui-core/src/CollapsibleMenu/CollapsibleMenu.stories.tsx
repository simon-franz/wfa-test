import type { Meta, StoryFn } from '@storybook/react';

import { CollapsibleMenu } from './CollapsibleMenu';
import { CollapsibleMenuEntry } from './Entry/CollapsibleMenuEntry';
import { CollapsibleMenuSection } from './Section/CollapsibleMenuSection';

export default {
  title: 'Components/Navigation/CollapsibleMenu',
  component: CollapsibleMenu,
} as Meta<typeof CollapsibleMenu>;

const Template: StoryFn<typeof CollapsibleMenu> = (args) => (
  <CollapsibleMenu {...args}>
    <CollapsibleMenuSection title="With submenu">
      <CollapsibleMenuEntry text="Submenu 1">
        <CollapsibleMenuEntry text="Submenu 2.1" />
        <CollapsibleMenuEntry text="Submenu 2.2" />
        <CollapsibleMenuEntry text="Submenu 2.3" />
        <CollapsibleMenuEntry text="Submenu 2.4" />
      </CollapsibleMenuEntry>
    </CollapsibleMenuSection>
  </CollapsibleMenu>
);

export const Default = {
  render: Template,

  args: {
    activeEntryId: undefined,
  },
};
