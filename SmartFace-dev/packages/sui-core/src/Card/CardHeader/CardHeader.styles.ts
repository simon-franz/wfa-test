import styled from '@emotion/styled';

import { S as CardStyles } from '../Card.styles';
import type { CardHeaderProps } from './CardHeader.types';

const Header = styled.div<Pick<CardHeaderProps, 'wrapChildren'>>(({ theme, wrapChildren }) => ({
  display: 'flex',
  rowGap: theme.marko.variables.spacing.distance.large,
  padding: CardStyles.componentConfig.padding,
  alignItems: 'flex-start',

  ...(wrapChildren && {
    flexWrap: 'wrap',
  }),
}));

export const S = {
  Header,
} as const;
