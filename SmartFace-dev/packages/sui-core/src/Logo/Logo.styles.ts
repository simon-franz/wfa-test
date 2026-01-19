import styled from '@emotion/styled';

import _Title from '../Title';

const LogoContainer = styled.div({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1,
  overflow: 'hidden',
});

const LogoLink = styled.a(({ theme, onClick }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  textDecoration: 'none',
  gap: theme.marko.variables.spacing.distance.medium,
  borderRadius: 6,
  outlineOffset: -2,

  ':focus-visible': { outline: `2px solid ${theme.sqwTier2Color.border.focus}` },

  ...(onClick && {
    cursor: 'pointer',
    ':active': {
      [`${Title}`]: {
        color: theme.sqwTier2Color.text.brand.pressed,
      },
    },
  }),
}));

const Logo = styled.img({
  maxHeight: '100%',
  maxWidth: '100%',
  display: 'block',
  alignSelf: 'center',
});

const Title = styled(_Title)(({ theme }) => ({
  color: theme.sqwTier2Color.text.brand.default,
}));

export const S = {
  LogoContainer,
  LogoLink,
  Logo,
  Title,
};
