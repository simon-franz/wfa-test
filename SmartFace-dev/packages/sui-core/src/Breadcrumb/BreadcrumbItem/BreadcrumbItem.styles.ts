import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import type { Separator, Size } from '@hrworks/types/shared/UiTypes';

import _Button from '../../Button';

const BreadcrumbItemContainer = styled.li<{
  size: Size;
  separator: Separator;
}>(({ theme, size, separator }) => ({
  color: theme.sqwTier2Color.text.brand.default,
  fontSize: theme.marko.typography.sqwFontSizes[size],
  ...(separator !== 'slash' && {
    display: 'flex',
    alignItems: 'center',
  }),
  '&:last-child': {
    ...theme.sqwTier2Typography.labelMdSemibold,
    color: theme.sqwTier2Color.text.subtle,
  },
  '&:not(:last-child)::after': {
    ...theme.sqwTier2Typography.labelMd,
    content: separator === 'slash' ? '"/"' : '" "',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: theme.sqwTier2Color.text.subtle,
    ...(separator !== 'slash' && {
      width: '0.3em',
      height: '0.3em',
      transform: 'scale(1.4) translate(-20%) rotate(45deg)',
      borderTop: '0.08rem solid',
      borderRight: '0.08rem solid',
    }),
  },
}));

const itemUnderlineStyles = (theme: Theme) =>
  css({
    textUnderlineOffset: theme.marko.variables.spacing.distance.extraSmall,
    textDecoration: 'underline',
    textDecorationThickness: 1,
  });

const BreadcrumbItemClickable = styled(_Button, {
  shouldForwardProp,
})<{
  $underline: boolean;
}>(({ theme, $underline }) => [
  $underline && itemUnderlineStyles(theme),
  {
    padding: 0,
    color: 'inherit',
    textAlign: 'left',
    gap: 0,
    [mq.supportsHover]: {
      'li:not(:last-child) &:hover': {
        ...(!$underline && {
          textDecoration: 'none',
        }),
        color: theme.sqwTier2Color.text.brand.hovered,
      },
    },
    'li:not(:last-child) &:active': {
      color: theme.sqwTier2Color.text.brand.pressed,
    },
  },
]);

const BreadcrumbItem = styled.span<{
  underline: boolean;
}>(({ theme, underline }) => [underline && itemUnderlineStyles(theme)]);

export const S = {
  BreadcrumbItemContainer,
  BreadcrumbItemClickable,
  BreadcrumbItem,
} as const;
