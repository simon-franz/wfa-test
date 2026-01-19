import type { Meta, StoryObj } from '@storybook/react';

import { NestedChecklist } from './NestedChecklist';
import { NestedChecklistEntry } from './NestedChecklistEntry';

// TODO: Enhance Example before test-framework integration
const meta = {
  title: 'Components/Inputs/NestedChecklist',
  component: NestedChecklist,
  tags: ['autodocs'],
  args: {
    children: [
      <NestedChecklistEntry
        id="single"
        key="single"
        label="Single Parent Entry"
        checked
        expanded
        size="extraLarge"
        checkDescendantsOnFetchEntries={false}
        data-guide-id="parent-entry-1"
      >
        <NestedChecklistEntry
          id="single-child-1"
          key="single-child-1"
          label="Single Child-1 Entry"
          checked={false}
          expanded
          size="extraLarge"
          checkDescendantsOnFetchEntries
        />
        <NestedChecklistEntry
          id="single-child-2"
          key="single-child-2"
          label="Single Child-2 Entry"
          checked={false}
          expanded
          size="extraLarge"
          checkDescendantsOnFetchEntries
        />
        <NestedChecklistEntry
          id="single"
          key="single"
          label="Single Parent Entry"
          checked
          expanded
          size="extraLarge"
          checkDescendantsOnFetchEntries={false}
          data-guide-id="parent-entry-1"
        >
          <NestedChecklistEntry
            id="single-child-1"
            key="single-child-1"
            label="Single Child-1 Entry"
            checked={false}
            expanded
            size="extraLarge"
            checkDescendantsOnFetchEntries
          />
          <NestedChecklistEntry
            id="single-child-2"
            key="single-child-2"
            label="Single Child-2 Entry"
            checked={false}
            expanded
            size="extraLarge"
            checkDescendantsOnFetchEntries
          />
        </NestedChecklistEntry>
      </NestedChecklistEntry>,
    ],
  },
} satisfies Meta<typeof NestedChecklist>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
