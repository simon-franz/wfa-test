import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, overflowHyphens } from '@hrworks/design-system';
import type { CSSProperties } from 'react';

import { S as IconButtonStyles } from '../IconButton/IconButton.styles';
import type { AlertProps } from './Alert.types';

const getAlertColorMap = (
  theme: Theme,
): Record<NonNullable<AlertProps['color']>, Pick<CSSProperties, 'color' | 'backgroundColor'>> => ({
  primary: {
    color: theme.sqwTier2Color.text.brand.default,
    backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
  },
  secondary: {
    color: theme.sqwTier2Color.text.default,
    backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  },
  info: {
    color: theme.sqwTier2Color.text.info.onSubtle,
    backgroundColor: theme.sqwTier2Color.background.info.subtle,
  },
  success: {
    color: theme.sqwTier2Color.text.success.onSubtle,
    backgroundColor: theme.sqwTier2Color.background.success.subtle,
  },
  warning: {
    color: theme.sqwTier2Color.text.warning.onSubtle,
    backgroundColor: theme.sqwTier2Color.background.warning.subtle,
  },
  danger: {
    color: theme.sqwTier2Color.text.error.onSubtle,
    backgroundColor: theme.sqwTier2Color.background.error.subtle,
  },
});

type ContainerProps = Pick<Required<AlertProps>, 'corner'> & {
  $color: Required<AlertProps>['color'];
};

const Container = styled.div<ContainerProps>(({ theme, corner, $color }) => {
  const alertColorMap = getAlertColorMap(theme);

  return {
    display: 'flex',
    padding: `${theme.marko.variables.spacing.distance.medium}px ${theme.marko.variables.spacing.distance.large}px`,
    color: alertColorMap[$color].color,
    backgroundColor: alertColorMap[$color].backgroundColor,
    borderRadius: corner === 'rounded' ? 6 : 0,
  };
});

const AlertContent = styled.div(({ theme }) => [
  overflowHyphens,
  {
    padding: `${theme.marko.variables.spacing.distance.small}px 0`,
    overflow: 'hidden',
    flexGrow: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    '> :not(:last-child)': {
      marginBottom: theme.marko.variables.spacing.distance.small,
    },
  },
]);

const ButtonWrapper = styled.div<Pick<AlertProps, 'corner'>>(({ theme, corner }) => ({
  marginRight: -theme.marko.variables.spacing.distance.medium,

  [`${IconButtonStyles.Button}`]: {
    borderRadius: corner === 'rounded' ? theme.marko.variables.borderRadius.small : 0,
    color: 'currentColor',
    opacity: theme.marko.variables.opacity.high,
    outlineOffset: -1,
    '> *': {
      fontSize: '1em',
    },
    [mq.supportsHover]: {
      ':hover': {
        opacity: 1,
      },
    },
  },
}));

const LeftIcon = styled.div(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  marginRight: theme.marko.variables.spacing.distance.large,
  fontSize: '1.8rem',
}));

export const S = {
  Container,
  AlertContent,
  ButtonWrapper,
  LeftIcon,
} as const;
