import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import type { ProgressCircularProps } from './ProgressCircular.types';

const Container = styled.svg({
  transform: 'rotate(-90deg)',
  height: '100%',
  width: '100%',
  strokeLinecap: 'round',
});

const Track = styled.circle(({ theme }) => ({
  fill: 'transparent',
  stroke: theme.marko.colors.palette.neutral[2],
}));

const Fill = styled.circle<{
  $color: Required<ProgressCircularProps>['color'];
}>(({ theme, $color }) => [
  {
    fill: 'transparent',
    stroke: theme.marko.colors.palette[$color][theme.marko.colors.indexes.normal],
    [mq.conditionalTransition]: {
      transitionProperty: 'all',
      transitionDuration: theme.marko.variables.animationDuration.extraLong,
    },
  },
]);

export const S = {
  Container,
  Track,
  Fill,
} as const;
