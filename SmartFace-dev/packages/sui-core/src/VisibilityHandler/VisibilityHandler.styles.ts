import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import type { Visibility } from '@hrworks/types/shared/UiTypes';
import type { CSSProperties } from 'react';

import type { VisibilityHandlerProps } from './VisibilityHandler.types';

export const generateVisibilityStyles = (visible: Visibility, display: CSSProperties['display']) => {
  if (typeof visible === 'boolean')
    return (
      visible &&
      css({
        display,
      })
    );
  if (typeof visible === 'string')
    return css({
      [mq[visible]]: {
        display,
      },
    });
  if (Array.isArray(visible)) {
    return visible.map((screenSizeKey) =>
      css({
        [mq[screenSizeKey]]: {
          display,
        },
      }),
    );
  }
};

const VisibilityWrapper = styled.div<Required<Pick<VisibilityHandlerProps, 'visible'>>>(({ visible }) => {
  return [
    {
      display: 'none',
    },
    generateVisibilityStyles(visible, 'contents'),
  ];
});

export const S = {
  VisibilityWrapper,
} as const;
