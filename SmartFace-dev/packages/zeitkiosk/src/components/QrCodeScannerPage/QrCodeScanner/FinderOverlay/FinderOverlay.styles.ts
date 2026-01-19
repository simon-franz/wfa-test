import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

const componentConfig = (theme?: Theme, isScanSuccessful?: boolean) => ({
  dimensions: {
    width: '25%',
    height: '25%',
  },
  ...(theme && {
    borderColor:
      isScanSuccessful === undefined
        ? theme.sqwTier2Color.border.warning
        : isScanSuccessful
          ? theme.sqwTier2Color.border.success
          : theme.sqwTier2Color.border.error,
  }),
  // borderWidth must be string for string literals in corners to work
  borderWidth: '4px',
});

const OverlayBackdrop = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: "''",
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 8,
    width: '80%',
    height: '80%',
    boxShadow: `0px 0px 0px 100vmax ${theme.sqwTier2Color.surface.elevation.shadow}`,
  },
}));

const FocusArea = styled.div<{ isScanSuccessful?: boolean }>(({ theme, isScanSuccessful }) => {
  const { borderColor, borderWidth } = componentConfig(theme, isScanSuccessful);

  return {
    width: '80%',
    aspectRatio: '4/3',
    [mq.isSmallDevice]: {
      aspectRatio: '1/1',
    },
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    '--border-width': borderWidth,
    '--border-color': borderColor,
  };
});

const BaseCorner = styled.div(({ theme }) => {
  const { dimensions } = componentConfig(theme);

  return {
    position: 'absolute',
    width: dimensions.width,
    height: dimensions.height,
  };
});

const TopLeftCorner = styled(BaseCorner)({
  top: 0,
  right: 0,
  borderTop: 'var(--border-width) solid var(--border-color)',
  borderRight: 'var(--border-width) solid var(--border-color)',
  borderTopRightRadius: 8,
});

const TopRightCorner = styled(BaseCorner)({
  top: 0,
  left: 0,
  borderTop: 'var(--border-width) solid var(--border-color)',
  borderLeft: 'var(--border-width) solid var(--border-color)',
  borderTopLeftRadius: 8,
});

const BottomRightCorner = styled(BaseCorner)({
  bottom: 0,
  left: 0,
  borderBottom: 'var(--border-width) solid var(--border-color)',
  borderLeft: 'var(--border-width) solid var(--border-color)',
  borderBottomLeftRadius: 8,
});

const BottomLeftCorner = styled(BaseCorner)({
  bottom: 0,
  right: 0,
  borderBottom: 'var(--border-width) solid var(--border-color)',
  borderRight: 'var(--border-width) solid var(--border-color)',
  borderBottomRightRadius: 8,
});

export const S = {
  OverlayBackdrop,
  FocusArea,
  TopLeftCorner,
  TopRightCorner,
  BottomLeftCorner,
  BottomRightCorner,
} as const;
