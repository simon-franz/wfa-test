import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { generateResponsiveStyles } from '@hrworks/design-system/functions/generateResponsiveStyles';

import { generateVisibilityStyles } from '../VisibilityHandler/VisibilityHandler.styles';
import type { FlexboxItemProps } from './FlexboxItem.types';

const FlexboxItem = styled.div<FlexboxItemProps>(({ order, flexGrow, flexShrink, flexBasis, alignSelf, visible }) => [
  {
    display: 'none',
  },
  order !== undefined &&
    generateResponsiveStyles({
      value: order,
      cssProp: 'order',
    }),
  flexGrow !== undefined &&
    generateResponsiveStyles({
      value: flexGrow,
      cssProp: 'flexGrow',
    }),
  flexShrink !== undefined &&
    generateResponsiveStyles({
      value: flexShrink,
      cssProp: 'flexShrink',
    }),
  flexBasis !== undefined &&
    generateResponsiveStyles({
      value: flexBasis,
      styleFn: ({ value }) =>
        css({
          flexBasis: value,
          minWidth: 0,
        }),
    }),
  alignSelf &&
    generateResponsiveStyles({
      value: alignSelf,
      cssProp: 'alignSelf',
    }),
  visible !== undefined && generateVisibilityStyles(visible, 'block'),
]);

export const S = {
  FlexboxItem,
} as const;
