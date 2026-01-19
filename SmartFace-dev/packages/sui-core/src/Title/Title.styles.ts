import styled from '@emotion/styled';
import { overflowEllipsis, overflowHyphens } from '@hrworks/design-system';
import type { SetRequired } from 'type-fest';

import type { TitleProps as _TitleProps } from './Title.types';

type TitleContainerProps = SetRequired<Pick<_TitleProps, 'size' | 'alignTitle' | 'overflowBehaviour'>, 'size'>;

const TitleContainer = styled.div<TitleContainerProps>(({ theme, size, alignTitle, overflowBehaviour }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  flexWrap: 'nowrap',
  justifyContent: alignTitle,
  fontSize: theme.marko.typography.sqwFontSizes[size],
  ...(overflowBehaviour === 'ellipsis' && {
    overflow: 'hidden',
  }),
}));

type TitleProps = Pick<_TitleProps, 'uppercase' | 'overflowBehaviour' | 'alignTitle'>;

const Title = styled.div<TitleProps>(({ uppercase, overflowBehaviour, alignTitle }) => [
  overflowBehaviour === 'ellipsis' && overflowEllipsis,
  overflowHyphens,
  {
    fontWeight: 'inherit',
    fontSize: 'inherit',
    textAlign: alignTitle,
    ...(uppercase && {
      textTransform: 'uppercase',
    }),
    margin: 0,
  },
]);

const PaddedChildren = styled.span(({ theme }) => ({
  paddingRight: theme.marko.variables.spacing.distance.small,
}));

const TitleChildren = styled.div(({ theme }) => ({
  display: 'inline-flex',
  gap: theme.marko.variables.spacing.distance.small,
  pointerEvents: 'auto',
}));

export const S = {
  TitleContainer,
  Title,
  PaddedChildren,
  TitleChildren,
} as const;
