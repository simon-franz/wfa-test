import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { FortuneWheelContextProps } from '../FortuneWheelContext';
import { generatePointerStyles, S } from './FortuneWheelPointer.styles';
import type { FortuneWheelPointerProps } from './FortuneWheelPointer.types';

const FortuneWheelPointer = observer((props: FortuneWheelPointerProps) => {
  const { currentSize, strokeColor } = useContext(FortuneWheelContextProps);

  const pointerStyles = generatePointerStyles(currentSize, strokeColor);

  return (
    <S.FortuneWheelPointer style={pointerStyles} {...props}>
      <S.IconWrapper>
        <FontAwesomeIcon name="play" variant="sharp-solid" />
      </S.IconWrapper>
    </S.FortuneWheelPointer>
  );
});

export default FortuneWheelPointer;
