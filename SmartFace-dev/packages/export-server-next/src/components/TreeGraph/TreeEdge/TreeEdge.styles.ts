import styled from '@emotion/styled';

const Path = styled.path({
  '&&&': {
    strokeWidth: '4',
    cursor: 'default',
    stroke: '#999',
  },
});

export const S = {
  Path,
} as const;
