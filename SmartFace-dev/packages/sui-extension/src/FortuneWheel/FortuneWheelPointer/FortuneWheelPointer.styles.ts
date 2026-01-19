import styled from '@emotion/styled';

export const generatePointerStyles = (currentSize: number, strokeColor: string) => ({
  paddingRight: (currentSize * 0.4) / 2,
  width: Math.max(currentSize * 0.1, 20),
  height: Math.max(currentSize * 0.15, 30),
  color: strokeColor,
  right: currentSize * -0.2,
});

const FortuneWheelPointer = styled.div({
  position: 'absolute',
  top: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translateY(-50%) rotate(180deg)',
});

const IconWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const S = {
  FortuneWheelPointer,
  IconWrapper,
} as const;
