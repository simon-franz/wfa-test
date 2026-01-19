import styled from '@emotion/styled';

const Wrapper = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  ...(fullHeight && {
    height: '100%',
  }),
  overflow: 'hidden',
}));

export const S = {
  Wrapper,
} as const;
