import styled from '@emotion/styled';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.marko.variables.spacing.distance.large,
}));

const FortuneWheelContainer = styled.div({
  position: 'relative',
  width: '100%',
  maxHeight: '100%',
});

const FortuneWheelSvg = styled.svg({
  cursor: 'grab',
  touchAction: 'none',
});

export const S = {
  Container,
  FortuneWheelContainer,
  FortuneWheelSvg,
} as const;
