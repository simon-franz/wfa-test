import type { Placement } from '@floating-ui/react-dom';

export const fallbackPlacements: Record<Placement, Array<Placement>> = {
  top: ['bottom', 'left', 'right'],
  'top-start': ['bottom-start', 'right', 'left'],
  'top-end': ['bottom-end', 'left', 'right'],
  left: ['right', 'bottom', 'top'],
  'left-start': ['right-start', 'bottom', 'top'],
  'left-end': ['right-end', 'top', 'bottom'],
  bottom: ['top', 'left', 'right'],
  'bottom-start': ['top-start', 'right', 'left'],
  'bottom-end': ['top-end', 'left', 'right'],
  right: ['left', 'bottom', 'top'],
  'right-start': ['left-start', 'bottom', 'top'],
  'right-end': ['left-end', 'top', 'bottom'],
};
