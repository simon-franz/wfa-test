import styled from '@emotion/styled';

const Trigger = styled.div(({ theme }) => ({
  cursor: 'pointer',
  outline: '2px solid transparent',
  outlineOffset: 2,
  // TODO: Extract focus-visible styling into separate styles file and reference it here
  ':focus-visible': {
    outlineColor: theme.sqwTier2Color.border.focus,
    position: 'relative',
  },
}));

export const S = {
  Trigger,
} as const;
