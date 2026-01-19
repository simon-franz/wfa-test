import { css } from '@emotion/react';

import type { AfterEffectsMediaProps } from './AfterEffectsMedia.types';

const svgConfig: AfterEffectsMediaProps['paint'] = {
  ellipse: {
    fill: true,
    stroke: true,
  },
  path: {
    fill: true,
    stroke: true,
  },
  line: {
    fill: true,
    stroke: true,
  },
  polyline: {
    fill: true,
    stroke: true,
  },
};

const generateSvgPaintStyles = (config: Required<AfterEffectsMediaProps>['paint']) =>
  Object.entries(config).map(([part, { fill, stroke }]) =>
    css({
      [part]: {
        ...(fill && {
          fill: 'currentcolor',
        }),
        ...(stroke && {
          stroke: 'currentcolor',
        }),
      },
    }),
  );

export const S = {
  svgConfig,
  generateSvgPaintStyles,
} as const;
