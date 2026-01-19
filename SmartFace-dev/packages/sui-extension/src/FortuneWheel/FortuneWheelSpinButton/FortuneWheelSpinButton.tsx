import { observer } from 'mobx-react';
import { useContext } from 'react';

import { FortuneWheelContextProps } from '../FortuneWheelContext';
import { generateSpinButtonStyles, S } from './FortuneWheelSpinButton.styles';
import type { FortuneWheelSpinButtonProps } from './FortuneWheelSpinButton.types';

const FortuneWheelSpinButton = observer((props: FortuneWheelSpinButtonProps) => {
  const { currentSize, fillColors, strokeColor } = useContext(FortuneWheelContextProps);

  const spinButtonStyles = generateSpinButtonStyles(currentSize, fillColors[0], strokeColor);

  return (
    <S.FortuneWheelSpinButton variant="unstyled" style={spinButtonStyles} {...props}>
      SPIN
    </S.FortuneWheelSpinButton>
  );
});

export default FortuneWheelSpinButton;
