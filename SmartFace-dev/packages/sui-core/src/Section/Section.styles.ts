import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { motion } from 'motion/react';

import Button from '../Button';
import { Title as _Title } from '../Title/Title';
import { S as TitleStyles } from '../Title/Title.styles';
import { Divider as _Divider } from './Divider';
import type { SectionProps } from './Section.types';

const componentConfig = {
  offset: 10,
};

const Section = styled.section({
  display: 'grid',
  alignItems: 'center',
});

const SectionToggle = styled(Button, {
  shouldForwardProp,
})<{
  $size: Size;
}>(({ theme, $size }) => ({
  zIndex: 3,
  padding: 0,
  justifyContent: 'flex-end',
  borderRadius: `calc(${theme.marko.typography.sqwFontSizes[$size]} / 2)`,
  width: `calc(100% + 2 * ${componentConfig.offset}px)`,
  marginLeft: -componentConfig.offset,
  paddingRight: componentConfig.offset,
  height: '100%',
  gridArea: '1 / 1 / 2 / 2',
}));

const IconWrapper = styled.span<Pick<SectionProps, 'expanded'>>(({ theme, expanded }) => ({
  display: 'flex',
  ...(expanded && {
    transform: 'rotateX(180deg)',
  }),
  [mq.conditionalTransition]: {
    transition: `transform ${theme.marko.variables.animationDuration.normal}`,
  },
}));

const Title = styled(_Title)(({ alignTitle }) => ({
  pointerEvents: 'none',
  marginRight: '2rem',
  zIndex: 3,
  gridArea: '1 / 1 / 2 / 2',
  height: '2em',
  ...(alignTitle === 'center' && {
    [`${TitleStyles.Title}`]: {
      marginLeft: '2rem',
    },
  }),
}));

const MotionDiv = styled(motion.div)({
  overflowY: 'clip',
  overflowX: 'visible',
  '&:has([data-section-hide-overflow])': {
    overflowX: 'hidden',
  },
});

const ChildrenContainer = styled.div(({ theme }) => ({
  marginTop: theme.marko.variables.spacing.distance.large,
  marginBottom: theme.marko.variables.spacing.distance.extraSmall, // Prevent clipping of outline (e.g. hover/focus) from elements inside
}));

const Divider = styled(_Divider)(({ theme }) => ({
  border: 0,
  margin: 0,
  marginTop: theme.marko.variables.spacing.distance.extraSmall,
  zIndex: 3,
}));

export const S = {
  Section,
  SectionToggle,
  IconWrapper,
  Title,
  MotionDiv,
  ChildrenContainer,
  Divider,
} as const;
