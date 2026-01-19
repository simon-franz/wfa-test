import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const componentConfig = {
  size: 40,
};

const ImageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: componentConfig.size,
  width: componentConfig.size,
  borderRadius: '50%',
  overflow: 'hidden',
  outline: '4px solid transparent',
  [mq.supportsHover]: {
    ':hover': {
      outlineColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
    },
  },
  ':active': {
    outlineColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  },
  [mq.conditionalTransition]: {
    transition: `outline-color ${theme.marko.variables.animationDuration.normal}`,
  },
}));

const Image = styled.img({
  objectFit: 'cover',
  width: '100%',
});

export const S = {
  ImageContainer,
  Image,
} as const;
