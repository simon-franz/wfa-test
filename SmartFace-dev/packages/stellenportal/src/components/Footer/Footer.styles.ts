import styled from '@emotion/styled';

import { getContrastFontColor } from '../../util/getContrastFontColor';
import { Button as _Button } from '../Button';

const Container = styled.footer(({ theme }) => ({
  backgroundColor: theme.stellenportal?.headerStyle?.color || theme.sqwTier2Color.surface.raised,
  borderTop: `solid 1px  ${theme.sqwTier2Color.border.bold}`,
  padding: 48,
  color: theme.stellenportal?.headerStyle?.color
    ? getContrastFontColor(theme.stellenportal?.headerStyle?.color)
    : theme.sqwTier2Color.text.default,
}));

const Inner = styled.div(({ theme }) => ({
  maxWidth: 1100,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.marko.variables.spacing.distance.medium,
}));

const Top = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Links = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.marko.variables.spacing.distance.extraLarge,
}));

const Button = styled(_Button)(({ theme }) => ({
  color: theme.stellenportal?.headerStyle?.color
    ? getContrastFontColor(theme.stellenportal?.headerStyle?.color)
    : theme.sqwTier2Color.text.default,
  backgroundColor: 'unset',
}));

const Hr = styled.hr(({ theme }) => ({
  height: 1,
  border: 'none',
  backgroundColor: theme.sqwTier2Color.border.bold,
  width: '100%',
}));

const Bottom = styled.div({
  textTransform: 'uppercase',
  fontWeight: 500,
  alignSelf: 'flex-end',
});

export const S = {
  Container,
  Inner,
  Top,
  Links,
  Button,
  Hr,
  Bottom,
} as const;
