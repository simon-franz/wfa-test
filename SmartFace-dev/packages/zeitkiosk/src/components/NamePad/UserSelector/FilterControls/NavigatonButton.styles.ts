import styled from '@emotion/styled';

const Gradient = styled.div<{
  direction: 'prev' | 'next';
}>(({ direction, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  top: 0,
  bottom: 0,
  position: 'absolute',
  zIndex: 10,

  ...(direction === 'prev'
    ? {
        left: 0,
        background: `
            linear-gradient(90deg, ${theme.sqwTier2Color.background.input} 0%, ${theme.sqwTier2Color.background.input} 30%, transparent 100%)
          `,
      }
    : {
        right: 0,
        background: `
            linear-gradient(270deg, ${theme.sqwTier2Color.background.input} 0%, ${theme.sqwTier2Color.background.input} 30%, transparent 100%)
          `,
      }),
}));

export const S = { Gradient } as const;
