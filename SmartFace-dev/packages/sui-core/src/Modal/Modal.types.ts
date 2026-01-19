import type { AnimatePresenceProps } from 'motion/react';

import type { ModalRendererProps } from './ModalRenderer/ModalRenderer.types';

export type ModalAnimationDirections = 'top' | 'left' | 'right' | 'bottom' | 'grow' | 'shrink';

export type ModalProps = {
  show?: boolean;
  deactivateAnimatePresence?: boolean;
  onExitComplete?: AnimatePresenceProps['onExitComplete'];
} & ModalRendererProps;
