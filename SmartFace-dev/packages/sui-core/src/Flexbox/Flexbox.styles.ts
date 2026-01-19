import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { generateResponsiveStyles } from '@hrworks/design-system/functions/generateResponsiveStyles';
import type { Gap } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import { S as GridStyles } from '../Grid/Grid.styles';
import type { FlexboxProps as _FlexboxProps } from './Flexbox.types';

const generateGapStyles = (gapSize: Gap, gapType: 'columnGap' | 'rowGap' | 'gap') => {
  return css({
    [`${gapType}`]:
      gapSize === 'none'
        ? 0
        : gapSize === 'default'
        ? GridStyles.componentConfig.spacing.medium
        : GridStyles.componentConfig.spacing[gapSize],
  });
};

type FlexboxProps = SetRequired<_FlexboxProps, 'gap' | 'flexWrap'>;

const Flexbox = styled.div<FlexboxProps>(
  ({ flexDirection, flexWrap, justifyContent, alignItems, alignContent, gap, columnGap, rowGap, fullHeight }) => [
    {
      display: 'flex',
      ...(fullHeight && {
        height: '100%',
      }),
    },
    flexDirection &&
      generateResponsiveStyles({
        value: flexDirection,
        cssProp: 'flexDirection',
      }),
    generateResponsiveStyles({
      value: flexWrap,
      cssProp: 'flexWrap',
    }),
    justifyContent &&
      generateResponsiveStyles({
        value: justifyContent,
        cssProp: 'justifyContent',
      }),
    alignItems &&
      generateResponsiveStyles({
        value: alignItems,
        cssProp: 'alignItems',
      }),
    alignContent &&
      generateResponsiveStyles({
        value: alignContent,
        cssProp: 'alignContent',
      }),
    generateResponsiveStyles({
      value: gap,
      styleFn: ({ value }) => generateGapStyles(value, 'gap'),
    }),
    columnGap &&
      generateResponsiveStyles({
        value: columnGap,
        styleFn: ({ value }) => generateGapStyles(value, 'columnGap'),
      }),
    rowGap &&
      generateResponsiveStyles({
        value: rowGap,
        styleFn: ({ value }) => generateGapStyles(value, 'rowGap'),
      }),
  ],
);

export const S = {
  Flexbox,
} as const;
