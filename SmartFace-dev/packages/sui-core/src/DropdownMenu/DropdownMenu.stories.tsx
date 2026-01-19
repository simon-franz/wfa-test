import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuProps } from './DropdownMenu.types';
import { DropdownMenuEntry } from './DropdownMenuEntry';
import { DropdownMenuSection } from './DropdownMenuSection';

const meta = {
  title: 'Components/Inputs/DropdownMenu',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const DropdownMenuItems = (
  <>
    <DropdownMenuSection key={0} title="First Group">
      <DropdownMenuEntry
        key={1}
        href="/"
        onClick={(event) => {
          event.preventDefault();
          alert('Hello');
        }}
      >
        Item 1
      </DropdownMenuEntry>
      <DropdownMenuEntry
        key={2}
        href="/"
        submenu={
          <>
            <DropdownMenuEntry key={0} href="/">
              Item 1
            </DropdownMenuEntry>
            <DropdownMenuEntry key={1} href="/">
              Item 2
            </DropdownMenuEntry>
          </>
        }
      >
        Item 2
      </DropdownMenuEntry>
    </DropdownMenuSection>
    <DropdownMenuSection key={3} title="Second group">
      <DropdownMenuEntry key={4}>Item 3</DropdownMenuEntry>
    </DropdownMenuSection>
  </>
);

export const Default: Story = {
  args: {
    title: "What's your favorite DropdownMenu item?",
    trigger: ({ open }) => <Button>{open ? 'Close' : 'Open'} DropdownMenu</Button>,
    items: DropdownMenuItems,
  } as DropdownMenuProps,
  render: (args) => (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '#root { height: 100vh; max-height: 100vh; display: flex; align-items: center; justify-content: center }',
        }}
      />
      <button>Tab here for close on outside focus test</button>
      <DropdownMenu {...args} />
    </>
  ),
};
