import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';
import { motion } from 'motion/react';

import { S as ButtonStyles } from '../../Button/Button.styles';
import type { AccordionContextProps } from '../AccordionContext';
import type { AccordionItemProps } from '../Item/AccordionItem.types';
import { getAccordionColorMap } from './AccordionItem.colors';

type ContainerProps = Pick<AccordionContextProps, 'itemSpacing'> & {
  $color: Required<AccordionItemProps>['color'];
};

const Container = styled.div<ContainerProps>(({ theme, itemSpacing, $color }) => {
  const accordionColorMap = getAccordionColorMap(theme);

  return [
    ButtonStyles.generateInteractiveButtonStyles(theme),
    {
      overflow: 'hidden',
      border: `1px solid ${accordionColorMap[$color].border}`,
      color: accordionColorMap[$color].color,
      backgroundColor: theme.sqwTier2Color.surface.raised,
      ':not(:last-of-type)': {
        borderBottom: 'none',
      },
      ':first-of-type': {
        borderTopRightRadius: theme.marko.variables.borderRadius.medium,
        borderTopLeftRadius: theme.marko.variables.borderRadius.medium,
      },
      ':last-of-type': {
        borderBottomRightRadius: theme.marko.variables.borderRadius.medium,
        borderBottomLeftRadius: theme.marko.variables.borderRadius.medium,
      },
      ...(itemSpacing && {
        ':not(:last-of-type)': {
          marginBottom: theme.marko.variables.spacing.distance.large,
        },
        borderRadius: theme.marko.variables.borderRadius.medium,
      }),
      ':focus-visible': {
        zIndex: 1,
        outlineOffset: 0,
      },
    },
  ];
});

const TitleContainer = styled.div<{
  $color: Required<AccordionItemProps>['color'];
}>(({ theme, $color }) => {
  const accordionColorMap = getAccordionColorMap(theme);

  return {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    backgroundColor: withOpacity(accordionColorMap[$color].backgroundColor, '25%'),
    padding: `${theme.marko.variables.spacing.distance.medium}px ${theme.marko.variables.spacing.distance.large}px`,
    gap: '.5em',
    position: 'relative',
    cursor: 'pointer',
  };
});

type IconWrapperProps = Pick<AccordionContextProps, 'expandCollapseIcon'> & {
  expanded: boolean;
};

const IconWrapper = styled.span<IconWrapperProps>(({ theme, expandCollapseIcon, expanded }) => ({
  display: 'flex',
  ...(expandCollapseIcon === 'arrow' && {
    transform: 'rotate(-90deg)',
    [mq.conditionalTransition]: {
      transitionProperty: 'transform',
      transitionDuration: theme.marko.variables.animationDuration.normal,
    },
    ...(expanded && {
      transform: 'rotate(0deg)',
    }),
  }),
}));

const Wrapper = styled(motion.div)<{
  $color: Required<AccordionItemProps>['color'];
}>(({ theme, $color }) => {
  const accordionColorMap = getAccordionColorMap(theme);

  return {
    backgroundColor: accordionColorMap[$color].backgroundColor + 20,
    padding: `${theme.marko.variables.spacing.distance.medium}px ${theme.marko.variables.spacing.distance.large}px`,
    color: theme.sqwTier2Color.text.default,
  };
});

export const S = {
  Container,
  TitleContainer,
  IconWrapper,
  Wrapper,
} as const;
