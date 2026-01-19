import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { AnimatePresence } from 'motion/react';

import Portal from '../../Portal';
import { S } from './FloatingValidation.styles';
import type { FloatingValidationProps } from './FloatingValidation.types';

export const FloatingValidation = ({
  children,
  isVisible,
  failedFloatingValidationText,
  ref,
  style,
  ...otherProps
}: FloatingValidationProps) => {
  const theme = useTheme();

  return (
    <Portal>
      <AnimatePresence>
        {isVisible && failedFloatingValidationText && (
          <S.FloatingValidation
            style={{
              ...style,
              zIndex: theme.marko.variables.zIndex.popover,
            }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: Number(extractNumbersFromString(theme.marko.variables.animationDuration.normal)) }}
            ref={ref}
            {...otherProps}
          >
            <S.ValidationMessage>{failedFloatingValidationText}</S.ValidationMessage>
          </S.FloatingValidation>
        )}
      </AnimatePresence>
    </Portal>
  );
};
