import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const MenuButton = styled.button(({ theme }) => ({
  color: theme.marko.hrworksUser.colors.text,
  fontFamily: theme.marko.hrworksUser.typography.fontFamily,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  border: 0,
  backgroundColor: 'unset',
  outline: '2px solid transparent',
  borderRadius: theme.marko.variables.borderRadius.small,
  outlineOffset: 2,
  padding: `${theme.marko.variables.spacing.distance.medium}px 0`,

  [mq.supportsHover]: {
    ':hover:not([disabled])': {
      cursor: 'pointer',
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
  },

  ':focus-visible': {
    outlineColor: theme.marko.hrworksUser.colors.brandActive,
    position: 'relative',
  },
}));

const IconWrapper = styled.div({
  display: 'flex',
  fontSize: 19,
});

export const S = {
  MenuButton,
  IconWrapper,
} as const;
