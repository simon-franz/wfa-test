import styled from '@emotion/styled';
import { generateShadowStyles, mq, shouldForwardProp } from '@hrworks/design-system';
import Button from '@hrworks/sui-core/Button';

export const generateSpinButtonStyles = (currentSize: number, fillColor: string, strokeColor: string) => ({
  fontSize: Math.max(currentSize * 0.02, 10),
  backgroundColor: fillColor,
  border: `2px solid ${strokeColor}`,
  width: Math.max(currentSize * 0.15, 30),
  height: Math.max(currentSize * 0.15, 30),
});

const FortuneWheelSpinButton = styled(Button, {
  shouldForwardProp,
})(({ theme }) => [
  generateShadowStyles({
    theme,
  }),
  {
    borderRadius: '50%',
    '&&&': {
      position: 'absolute',
    },
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',

    '&&': {
      transition: `filter ${theme.marko.variables.animationDuration.normal}`,
    },
    [mq.supportsHover]: {
      ':hover': {
        filter: 'brightness(90%)',
      },
    },
    ':active': {
      filter: 'brightness(110%)',
    },
  },
]);

export const S = {
  FortuneWheelSpinButton,
} as const;
