import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { generateResponsiveStyles, mq } from '@hrworks/design-system';
import type { SetRequired } from 'type-fest';

import { generateVisibilityStyles } from '../VisibilityHandler/VisibilityHandler.styles';
import type { GridItemProps, GridItemSize } from './GridItem.types';

const generateSizeStyles = (size: GridItemSize) => {
  const calculatedWidth = size === 'default' ? '100%' : `${(size / 12) * 100}%`;

  return css({
    flexBasis: calculatedWidth,
    maxWidth: calculatedWidth,
  });
};

const generateOffsetStyles = (offset: number) =>
  css({
    marginLeft: `${(offset / 12) * 100}%`,
  });

type ItemProps = SetRequired<Partial<GridItemProps>, 'visible'> & {
  $offset: GridItemProps['offset'];
  $size: GridItemProps['size'];
};

const Item = styled.div<ItemProps>(({ theme, $size, visible, $offset }) => [
  {
    display: 'none',
    flexShrink: 0,
    [mq.conditionalTransition]: {
      transition: `all ${theme.marko.variables.animationDuration.long}`,
    },
  },
  generateSizeStyles('default'),
  $size &&
    generateResponsiveStyles({
      value: $size,
      styleFn: ({ value }) => generateSizeStyles(value),
    }),
  generateVisibilityStyles(visible, 'block'),
  $offset !== undefined &&
    generateResponsiveStyles({
      value: $offset,
      styleFn: ({ value }) => generateOffsetStyles(value),
    }),
]);

export const S = {
  Item,
} as const;
