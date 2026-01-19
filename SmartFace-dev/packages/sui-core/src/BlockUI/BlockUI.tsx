import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

import Portal from '../Portal';
import { S } from './BlockUI.styles';
import type { BlockUIProps } from './BlockUI.types';

export const BlockUI = ({ isOpen, ...otherProps }: BlockUIProps) => {
  useEffect(() => {
    const preventKeyEvent = (e: KeyboardEvent) => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', preventKeyEvent, { capture: true });
    document.addEventListener('keypress', preventKeyEvent, { capture: true });
    document.addEventListener('keyup', preventKeyEvent, { capture: true });

    return () => {
      document.removeEventListener('keydown', preventKeyEvent, { capture: true });
      document.removeEventListener('keypress', preventKeyEvent, { capture: true });
      document.removeEventListener('keyup', preventKeyEvent, { capture: true });
    };
  }, [isOpen]);

  const animationDuration = useTheme().marko.variables.animationDuration;
  const variants = {
    visible: {
      opacity: 1,
      transition: {
        duration: Number(extractNumbersFromString(animationDuration.long)),
        delay: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: Number(extractNumbersFromString(animationDuration.normal)),
      },
    },
  };

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <S.MotionDiv initial="hidden" animate="visible" exit="hidden" variants={variants} {...otherProps}>
            <S.StyledSpinner tabIndex={0} />
          </S.MotionDiv>
        )}
      </AnimatePresence>
    </Portal>
  );
};
