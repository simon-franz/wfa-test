import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import { motion } from 'motion/react';

const componentConfig = {
  overlappingContainerGridArea: '1 / 1 / 2 / 2',
};

const Wrapper = styled.div({
  display: 'grid',
});

const OverlappingContainer = styled(motion.div)({
  gridArea: componentConfig.overlappingContainerGridArea,
});

const AlternativeChildrenWrapper = styled.div({
  cursor: 'pointer',
  display: 'content',
});

type DropzoneWrapperProps = {
  $disabled?: boolean;
  $isDragActive?: boolean;
  $isWindowDropzone?: boolean;
};

const DropzoneWrapper = styled(motion.div)<DropzoneWrapperProps>(({
  theme,
  $disabled,
  $isDragActive,
  $isWindowDropzone,
}) => {
  const interactiveStyles = css({
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
    outline: `1px solid ${theme.sqwTier2Color.border.bold}`,

    outlineOffset: -1,
  });

  return {
    gridArea: componentConfig.overlappingContainerGridArea,
    overflow: 'hidden',
    borderRadius: 6,
    backdropFilter: 'blur(5px)',
    backgroundColor: $isWindowDropzone
      ? theme.sqwTier2Color.surface.raised + ($isDragActive ? '' : theme.marko.variables.opacity.hex[75])
      : theme.sqwTier2Color.background.neutral.subtlest.hovered +
        ($isDragActive ? '' : theme.marko.variables.opacity.hex[100]),
    [mq.conditionalTransition]: {
      transition: `background-color ${theme.marko.variables.animationDuration.long}`,
    },
    ...(!$disabled && {
      [mq.supportsHover]: {
        ':hover': interactiveStyles,
      },
      ':focus-within': interactiveStyles,
    }),
  };
});

type DropzoneProps = {
  isDragActive?: boolean;
  disabled?: boolean;
  isWindowDropzone?: boolean;
};

const Dropzone = styled.div<DropzoneProps>(({ theme, isWindowDropzone, isDragActive, disabled }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  padding: 30,
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  color: `${theme.sqwTier2Color.border.brand.hovered + (isDragActive ? '' : theme.marko.variables.opacity.hex[50])}`,

  [mq.supportsHover]: {
    ':hover:not(:disabled)': {
      color: theme.sqwTier2Color.text.brand.hovered,
    },
  },

  '::before': {
    content: "''",
    position: 'absolute',
    inset: isWindowDropzone ? 40 : 15,
    border: `2px dashed ${theme.sqwTier2Color.border.brand.default + (isDragActive ? '' : theme.marko.variables.opacity.hex[75])}`,
    borderRadius: isWindowDropzone ? 8 : 6,
    pointerEvents: 'none',
    transition: `border-color ${theme.marko.variables.animationDuration.normal} ease`,
  },

  ...(disabled && {
    cursor: 'not-allowed',
    opacity: theme.marko.variables.opacity.disabled,
  }),
}));

export const S = {
  Wrapper,
  OverlappingContainer,
  AlternativeChildrenWrapper,
  DropzoneWrapper,
  Dropzone,
} as const;
