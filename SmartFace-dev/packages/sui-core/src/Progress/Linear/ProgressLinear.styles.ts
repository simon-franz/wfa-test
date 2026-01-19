import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';

import type { ProgressLinearProps } from './ProgressLinear.types';

const componentConfig = {
  height: {
    extraSmall: 4,
    small: 6,
    medium: 8,
    large: 10,
    extraLarge: 12,
  },
};

type WrapperProps = Pick<Required<ProgressLinearProps>, 'size'>;

const Wrapper = styled.div<WrapperProps>(({ theme, size }) => ({
  height: componentConfig.height[size],
  display: 'flex',
  overflow: 'hidden',
  backgroundColor: theme.marko.colors.palette.neutral[2],
  borderRadius: componentConfig.height[size],
  position: 'relative',
}));

type LineProps = Pick<Required<ProgressLinearProps>, 'animated'> & {
  $color: Required<ProgressLinearProps>['color'];
};

const Line = styled.div<LineProps>(({ theme, $color, animated }) => {
  const animation = keyframes({
    '0%': {
      left: '-20%',
    },
    '50%': {
      left: '50%',
    },
    '100%': {
      left: '120%',
    },
  });

  return {
    [mq.conditionalTransition]: {
      transition: `all ${theme.marko.variables.animationDuration.long}`,
    },
    backgroundColor: theme.marko.colors.palette[$color][theme.marko.colors.indexes.normal],
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    position: 'absolute',
    overflow: 'hidden',
    ...(animated && {
      '::after': {
        width: '20%',
        height: '100%',
        position: 'absolute',
        background: `linear-gradient(90deg, transparent 0%, ${theme.marko.colors.palette[$color][5]} 50%, transparent 100%);`,
        right: 0,
        top: 0,
        content: "''",
        animation: `${animation} 2s linear infinite`,
      },
    }),
  };
});

export const S = {
  Wrapper,
  Line,
} as const;
