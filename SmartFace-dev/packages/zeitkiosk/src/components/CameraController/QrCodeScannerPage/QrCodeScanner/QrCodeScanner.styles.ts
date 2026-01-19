import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Button from '@hrworks/sui-core/Button';

const QrCodeScannerWrapper = styled.div({
  minHeight: 220,
  position: 'relative',
  maxWidth: 'fit-content',
  aspectRatio: '4/3',
  [mq.isSmallDevice]: {
    aspectRatio: '1/1',
  },
});

const ToggleButtonWrapper = styled.div({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%) scaleX(-1)',
});

const Button = styled(_Button)({
  padding: '2rem',
});

export const S = {
  QrCodeScannerWrapper,
  ToggleButtonWrapper,
  Button,
} as const;
