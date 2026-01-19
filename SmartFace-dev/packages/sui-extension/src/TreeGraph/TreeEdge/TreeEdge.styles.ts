import styled from '@emotion/styled';

const Path = styled.path(({ theme }) => ({
  '&&': {
    strokeWidth: '1',
    pointerEvents: 'none',
    stroke: theme.sqwTier2Color.border.bold,
  },
}));

export const S = {
  Path,
} as const;
