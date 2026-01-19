import styled from '@emotion/styled';

const Wrapper = styled.div<{
  centered?: boolean;
}>(({ centered }) => ({
  padding: 20,
  overflow: 'hidden',
  height: '100%',

  ...(centered && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));

export const S = {
  Wrapper,
};
