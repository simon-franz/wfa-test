import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import type { ScrollerProps } from './Scroller.types';

const componentConfig = {
  scrollerSize: 8,
};

const customScrollbarStyles = (theme: Theme) =>
  css({
    '@supports (scrollbar-gutter: stable)': {
      '::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '::-webkit-scrollbar': {
        width: componentConfig.scrollerSize,
        height: componentConfig.scrollerSize,
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: theme.sqwTier2Color.background.neutral.subtle.hovered,
        borderRadius: 6,
        [mq.supportsHover]: {
          ':hover': {
            backgroundColor: theme.sqwTier2Color.background.neutral.subtle.selected,
          },
        },
      },
    },
  });

type WrapperProps = {
  useCustomScrollbars?: boolean;
} & Pick<ScrollerProps, 'scrollbarGutter'>;

const Wrapper = styled.div<WrapperProps>(({ theme, useCustomScrollbars, scrollbarGutter }) => [
  useCustomScrollbars && customScrollbarStyles(theme),
  {
    overflow: 'auto',
    height: '100%',
    overscrollBehavior: 'contain',
    scrollbarGutter,
  },
]);

export const S = {
  customScrollbarStyles,
  Wrapper,
} as const;
