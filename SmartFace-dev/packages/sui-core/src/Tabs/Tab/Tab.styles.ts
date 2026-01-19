import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { Color } from '@hrworks/types/shared/UiTypes';
import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

import Button from '../../Button';

const getIndicatorLineColorMap = (
  theme: Theme,
): Record<NonNullable<TabButtonProps['color']>, Pick<CSSProperties, 'backgroundColor'>> => ({
  primary: {
    backgroundColor: theme.sqwTier2Color.border.brand.default,
  },
  secondary: {
    backgroundColor: theme.sqwTier2Color.border.input,
  },
  info: {
    backgroundColor: theme.sqwTier2Color.border.info,
  },
  success: {
    backgroundColor: theme.sqwTier2Color.border.success,
  },
  warning: {
    backgroundColor: theme.sqwTier2Color.border.warning,
  },
  danger: {
    backgroundColor: theme.sqwTier2Color.border.error,
  },
});

const Tab = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

type TabButtonProps = {
  $selected: boolean;
  color: Color;
};

const TabButton = styled(Button)<TabButtonProps>(({ theme, color, $selected }) => {
  const colorMap = getIndicatorLineColorMap(theme);

  return {
    padding: `${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.medium}px`,
    outlineOffset: -2,
    ...(!$selected && {
      ':not(:hover)': {
        color: theme.sqwTier2Color.text.subtlest,
      },
    }),
    [`~ ${IndicatorLine}`]: {
      backgroundColor: colorMap[color].backgroundColor,
    },
  };
});

const IndicatorLine = styled(motion.div)({
  marginTop: 3,
  height: 2,
});

export const S = {
  Tab,
  TabButton,
  IndicatorLine,
} as const;
