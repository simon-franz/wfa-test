import styled from '@emotion/styled';

const Item = styled.li({
  '*:focus, *:focus-visible': {
    outline: 'none',
  },
});

export const S = {
  Item,
} as const;
