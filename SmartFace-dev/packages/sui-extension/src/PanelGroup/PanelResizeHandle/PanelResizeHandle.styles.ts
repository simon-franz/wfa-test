import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import type { Direction } from '@hrworks/types/shared/UiTypes';
import { PanelResizeHandle } from 'react-resizable-panels';

const StyledPanelResizeHandle = styled(PanelResizeHandle)<{
  direction: Direction;
}>(({ theme, direction }) => ({
  backgroundColor: theme.marko.colors.palette.neutral[1],
  width: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  ...(direction === 'vertical' && {
    width: 'auto',
    height: '15px',
    flexDirection: 'column',
  }),
  [mq.supportsHover]: {
    ':hover': {
      [`${PanelResizeHandleGrip}`]: {
        border: `2px solid ${theme.marko.colors.palette.neutral[4]}`,
      },
      [`${PanelResizeHandleLine}`]: {
        backgroundColor: theme.marko.colors.palette.neutral[4],
      },
    },
  },
}));

const PanelResizeHandleGrip = styled.div<{
  direction: Direction;
}>(({ theme, direction }) => ({
  position: 'absolute',
  height: 9,
  width: 40,
  backgroundColor: theme.marko.colors.palette.neutral[1],
  border: `2px solid ${theme.marko.colors.palette.neutral[3]}`,
  borderRadius: theme.marko.variables.borderRadius.medium,
  zIndex: 1,
  ...(direction === 'horizontal' && {
    height: 40,
    width: 9,
  }),
}));

const PanelResizeHandleLine = styled.div<{
  direction: Direction;
}>(({ theme, direction }) => ({
  height: '90%',
  width: 2,
  backgroundColor: theme.marko.colors.palette.neutral[3],
  ...(direction === 'vertical' && {
    height: 2,
    width: '90%',
  }),
}));

export const S = {
  StyledPanelResizeHandle,
  PanelResizeHandleGrip,
  PanelResizeHandleLine,
} as const;
