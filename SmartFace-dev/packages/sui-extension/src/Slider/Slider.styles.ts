import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';

import type { SliderProps } from './Slider.types';
import { S as TooltipStyles } from '@hrworks/sui-core/Tooltip/Tooltip.styles';

const componentConfig = {
  sliderHandleBoxShadowPreSize: '0 0 0',
  sliderHandleSize: 15,
  sliderRailHeight: 5,
};

const getSliderColorMap = (theme: Theme) => ({
  primary: theme.sqwTier2Color.background.brand.bold.default,
  secondary: theme.sqwTier2Color.background.neutral.bold,
  info: theme.sqwTier2Color.background.info.bold.default,
  success: theme.sqwTier2Color.background.success.bold.default,
  warning: theme.sqwTier2Color.background.warning.bold.default,
  danger: theme.sqwTier2Color.background.error.bold.default,
});

const SliderHandle = styled.div<{
  $color: Required<SliderProps>['color'];
}>(({ theme, $color }) => {
  const colorMap = getSliderColorMap(theme);
  const shadowColor = withOpacity(colorMap[$color], '50%');
  const interactiveStyles = css({
    boxShadow: `${componentConfig.sliderHandleBoxShadowPreSize} 4px ${shadowColor}`,
  });

  return {
    '&& [class*=rc-slider-handle]': {
      backgroundColor: colorMap[$color],
      border: 'none',
      width: componentConfig.sliderHandleSize,
      height: componentConfig.sliderHandleSize,
      opacity: 1,
      boxShadow: 'none',
      cursor: 'pointer',
      [mq.supportsHover]: {
        ':hover': interactiveStyles,
      },
      ':focus-visible': interactiveStyles,
      ':not(:active)': {
        [mq.conditionalTransition]: {
          transition: `box-shadow ${theme.marko.variables.animationDuration.normal}`,
        },
      },
    },
  };
});

const SliderContainer = styled.div<{
  $color: Required<SliderProps>['color'];
}>(({ theme, $color }) => {
  const colorMap = getSliderColorMap(theme);
  const shadowColor = withOpacity(colorMap[$color], '50%');

  return {
    '*': {
      cursor: 'pointer',
    },
    ':active': {
      [`&& ${SliderHandle} [class*=rc-slider-handle]`]: {
        boxShadow: `${componentConfig.sliderHandleBoxShadowPreSize} 6px ${shadowColor}`,
      },
    },
  };
});

const sliderRailStyles = (theme: Theme) => ({
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.hovered,
  height: componentConfig.sliderRailHeight,
  borderRadius: theme.marko.variables.borderRadius.small,
});

const sliderTrackStyles = (theme: Theme, color: Required<SliderProps>['color']) => {
  const colorMap = getSliderColorMap(theme);

  return {
    backgroundColor: withOpacity(`${colorMap[color]}`, '60%'),
    height: componentConfig.sliderRailHeight,
  };
};

const Tooltip = styled(TooltipStyles.TooltipContainer)({
  opacity: 0,
  position: 'absolute',
  transform: 'translateX(-50%) translateY(-55px)',
});

export const S = {
  SliderHandle,
  SliderContainer,
  sliderRailStyles,
  sliderTrackStyles,
  Tooltip,
} as const;
