import type { Meta, StoryObj } from '@storybook/react';

import { VisibilityHandler } from './VisibilityHandler';
import type { VisibilityHandlerProps } from './VisibilityHandler.types';

const meta: Meta<typeof VisibilityHandler> = {
  title: 'Components/Utils/VisibilityHandler',
  component: VisibilityHandler,
};

export default meta;
type Story = StoryObj<typeof VisibilityHandler>;

const VISIBILITY_HANDLER_PROPS_API_MOCK: VisibilityHandlerProps = {
  visible: true,
  children: (
    <>
      <button>Button</button>
      <br />
      <span>Fuer korrekte Testergebnisse Storybook-Sidebar ausblenden.</span>
      <br />
      <span>(Keyboard-Shortcut 'S')</span>
    </>
  ),
};

export const Default: Story = {
  args: VISIBILITY_HANDLER_PROPS_API_MOCK,
};

export const None: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: false },
};

export const SingleRange: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: 'sm' },
};

export const MultipleRangesWithGaps: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: ['sm', 'lg'] },
};

export const NeighboringRanges: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: ['sm', 'md'] },
};

export const FringeRanges: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: ['xs', 'xl'] },
};

export const GreaterEqualsRange: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: '>=md' },
};

export const LesserEqualsRange: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: '<=md' },
};

export const MaxXlRange: Story = {
  args: { ...VISIBILITY_HANDLER_PROPS_API_MOCK, visible: '<=xl' },
};
