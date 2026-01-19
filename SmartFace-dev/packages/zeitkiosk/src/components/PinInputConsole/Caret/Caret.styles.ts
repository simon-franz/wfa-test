import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const CaretContainer = styled.div({
  position: 'absolute',
  pointerEvents: 'none',
});

const caretBlink = keyframes({
  '0%, 70%, 100%': { opacity: 1 },
  '20%, 50%': { opacity: 0 },
});

const Caret = styled.div(({ theme }) => ({
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: theme.sqwTier2Color.background.nav.hovered,
  animation: `${caretBlink} 1.8s ease-out infinite`,
}));

export const S = { CaretContainer, Caret } as const;
