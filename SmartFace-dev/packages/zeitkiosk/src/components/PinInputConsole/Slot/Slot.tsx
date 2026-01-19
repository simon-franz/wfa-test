import { useContext } from 'react';

import { PinPadContext } from '../../PinPad/PinPadContext';
import { Caret } from '../Caret';
import { S } from './Slot.styles';
import type { ExtendedSlotProps } from './Slot.types';

export const Slot = ({ index, char, placeholderChar, isActive: _isActive, ...otherProps }: ExtendedSlotProps) => {
  const { pinValue } = useContext(PinPadContext);

  const activeIndex = Math.min(pinValue.length, 3);

  const isActive = index === activeIndex;

  return (
    <S.Slot isActive={isActive} {...otherProps}>
      {char ? <S.MaskedInput /> : placeholderChar}
      {isActive && pinValue.length < 4 && <Caret />}
    </S.Slot>
  );
};
