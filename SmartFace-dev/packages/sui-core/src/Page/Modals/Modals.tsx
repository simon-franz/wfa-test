import { observer } from 'mobx-react';
import { AnimatePresence } from 'motion/react';

import type { ModalsProps } from './Modals.types';

export const Modals = observer(({ modals }: ModalsProps) => {
  const currentModalGroup = modals[0];
  const currentModal = currentModalGroup?.at(-1);

  return <AnimatePresence>{currentModal}</AnimatePresence>;
});
