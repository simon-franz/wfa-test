import styled from '@emotion/styled';

const Wrapper = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight, theme }) => ({
  height: fullHeight ? '100%' : 500,
  backgroundColor: theme.sqwTier2Color.surface.sunken,
}));

export const S = {
  Wrapper,
} as const;
