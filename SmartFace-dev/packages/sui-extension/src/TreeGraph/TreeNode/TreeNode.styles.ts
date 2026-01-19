import { keyframes, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { generateShadowStyles, overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';
import _Text from '@hrworks/sui-core/Text';
import type { TreeNodeVariant } from '@hrworks/types/shared/UiTypes';
import { Handle as ReactFlowHandle } from '@xyflow/react';

const componentConfig = (theme?: Theme) => ({
  ...(theme && {
    highlightColor: theme.sqwTier2Color.border.selected,
  }),
});

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: `${theme.marko.variables.spacing.distance.medium}px 0`,
}));

type CardProps = {
  variant?: TreeNodeVariant;
  lastInteracted?: boolean;
  clickable?: boolean;
  lastInteractedAnimationDuration?: number;
};

const Card = styled.div<CardProps>(({ theme, variant, lastInteracted, lastInteractedAnimationDuration = 3000 }) => {
  const interactionAnimation = keyframes({
    '0%': {
      backgroundColor: theme.sqwTier1.color.indigo[50],
    },
    '70%': {
      backgroundColor: theme.sqwTier1.color.indigo[50],
    },
    '100%': {
      backgroundColor: 'none',
    },
  });

  return [
    {
      background: theme.sqwTier2Color.surface.raised,
      borderRadius: 6,
      padding: theme.marko.variables.spacing.distance.extraSmall,
      ...(variant === 'highlighted' && {
        outline: `2px solid ${componentConfig(theme).highlightColor}`,
      }),
      ...(variant === 'greyedOut' && {
        opacity: theme.marko.variables.opacity.medium,
      }),
      ...(lastInteracted && {
        animation: `${interactionAnimation} ${lastInteractedAnimationDuration}ms`,
      }),
    },
    generateShadowStyles({
      theme,
      variant: 'light',
    }),
  ];
});

const TreeNodeCard = styled(Card)({
  width: 230,
});

const Handle = styled(ReactFlowHandle)({
  visibility: 'hidden',
});

const Content = styled.div(({ onClick }) => ({
  height: 70,
  paddingBlock: 4,
  paddingInline: 8,
  columnGap: 9,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  ...(onClick && {
    cursor: 'pointer',
  }),
}));

const Image = styled.img({
  width: 50,
  height: 50,
  borderRadius: '50%',
});

const TextContainer = styled.div({
  overflow: 'hidden',
  flex: 1,
});

const Text = styled(_Text, {
  shouldForwardProp,
})<{ $isTitle?: boolean }>(({ theme, $isTitle }) => [
  overflowEllipsis,
  {
    ...($isTitle && { ...theme.sqwTier2Typography.labelMdSemibold }),
    display: 'block',
  },
]);

export const S = {
  componentConfig,
  Container,
  TreeNodeCard,
  Card,
  Handle,
  Content,
  Image,
  TextContainer,
  Text,
} as const;
