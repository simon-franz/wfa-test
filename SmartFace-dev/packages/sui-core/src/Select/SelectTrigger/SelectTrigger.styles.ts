import styled from '@emotion/styled';

const InputFieldValue = styled.div<{
  disabled?: boolean;
}>(({ disabled, theme }) => ({
  '&&': {
    cursor: 'default',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
    gap: theme.marko.variables.spacing.distance.small,
  },
  ...(disabled && {
    cursor: 'not-allowed',
  }),
}));

export const S = {
  InputFieldValue,
} as const;
