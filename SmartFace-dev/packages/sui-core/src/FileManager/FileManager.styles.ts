import styled from '@emotion/styled';

const Wrapper = styled.div<{
  disabled?: boolean;
}>(({ theme, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.distance.small,
  position: 'relative',
  ...(disabled && {
    opacity: theme.marko.variables.opacity.disabled,
  }),
}));

export const S = {
  Wrapper,
} as const;
