import styled from '@emotion/styled';

const Form = styled.form<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  ...(fullHeight && {
    height: '100%',
  }),
}));

export const S = {
  Form,
} as const;
