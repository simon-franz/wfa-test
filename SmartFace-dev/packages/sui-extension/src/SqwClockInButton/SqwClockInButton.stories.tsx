import DropdownMenu from '@hrworks/sui-core/DropdownMenu';
import { DropdownMenuEntry } from '@hrworks/sui-core/DropdownMenu/DropdownMenuEntry';
import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';

import { SqwClockInButton } from './SqwClockInButton';

const meta = {
  title: 'Components/Inputs/SqwClockInButton',
  component: SqwClockInButton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof SqwClockInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    startDateTime: new Date().toISOString(),
    isActive: true,
    label: `seit ${new Date().getHours().toString().padStart(2, '0')}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0')} Uhr`,
  },
};

export const WithDropdownMenu: Story = {
  args: {
    projectOrActivityDropdown: (
      <DropdownMenu
        items={
          <>
            <DropdownMenuEntry>Projekt A</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt B</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt C</DropdownMenuEntry>
          </>
        }
        trigger={<StreamlineIcon name="arrow-down" />}
      />
    ),
  },
};

export const WithDropdownMenuActive: Story = {
  args: {
    isActive: true,
    projectOrActivityLabel: 'Projekt A',
    label: 'Arztgang',
    startDateTime: new Date().toISOString(),
    projectOrActivityDropdown: (
      <DropdownMenu
        title="Projekt auswählen"
        items={
          <>
            <DropdownMenuEntry>Projekt A</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt B</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt C</DropdownMenuEntry>
          </>
        }
        trigger={<StreamlineIcon name="arrow-down" />}
      />
    ),
  },
};

export const Overflow: Story = {
  args: {
    isActive: true,
    startDateTime: new Date().toISOString(),
    projectOrActivityLabel: generateLoremSentences(1),
    label: generateLoremSentences(1),
    projectOrActivityDropdown: (
      <DropdownMenu
        title="Projekt auswählen"
        items={
          <>
            <DropdownMenuEntry>Projekt A</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt B</DropdownMenuEntry>
            <DropdownMenuEntry>Projekt C</DropdownMenuEntry>
          </>
        }
        trigger={<StreamlineIcon name="arrow-down" />}
      />
    ),
  },
};
