import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import type { HTMLMotionProps } from 'motion/react';
import type { MouseEvent } from 'react';

import Portal from '../Portal';
import { S } from './Backdrop.styles';

export const Backdrop = ({ onClick, ...otherProps }: HTMLMotionProps<'div'>) => {
  const _onClick =
    onClick &&
    ((event: MouseEvent<HTMLDivElement>) => {
      onClick(event);
    });

  return (
    <Portal>
      <S.Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.normal)),
        }}
        onClick={_onClick}
        {...otherProps}
      />
    </Portal>
  );
};
