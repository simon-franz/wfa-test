import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { generateResponsiveStyles, mq } from '@hrworks/design-system';
import type { Gap } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import { S as GridItemStyles } from '../GridItem/GridItem.styles';
import type { GridProps } from './Grid.types';

const componentConfig = {
  spacing: {
    // TODO: Remove and reference from theme soon.
    extraSmall: 5,
    small: 10,
    medium: 20,
    large: 30,
    extraLarge: 40,
  },
};

const generateGapStyles = (gapSize: Gap, gapType: 'columnGap' | 'rowGap' | 'gap') => {
  const gap =
    gapSize === 'none' ? 0 : gapSize === 'default' ? componentConfig.spacing.medium : componentConfig.spacing[gapSize];

  return css({
    ...((gapType === 'rowGap' || gapType === 'gap') && {
      rowGap: gap,
    }),
    ...((gapType === 'columnGap' || gapType === 'gap') && {
      marginLeft: `${-gap}px`,
      [`> ${GridItemStyles.Item}`]: {
        paddingLeft: `${gap}px`,
      },
    }),
  });
};

const Grid = styled.div<SetRequired<Partial<GridProps>, 'gap'>>(({ theme, fullHeight, columnGap, rowGap, gap }) => [
  {
    display: 'flex',
    flexWrap: 'wrap',
    ...(fullHeight && {
      height: '100%',
    }),
    [mq.conditionalTransition]: {
      transition: `all ${theme.marko.variables.animationDuration.long}`,
    },
  },
  generateResponsiveStyles({
    value: gap,
    styleFn: ({ value }) => generateGapStyles(value, 'gap'),
  }),
  rowGap &&
    generateResponsiveStyles({
      value: rowGap,
      styleFn: ({ value }) => generateGapStyles(value, 'rowGap'),
    }),
  columnGap &&
    generateResponsiveStyles({
      value: columnGap,
      styleFn: ({ value }) => generateGapStyles(value, 'columnGap'),
    }),
]);

export const S = {
  componentConfig,
  Grid,
} as const;
