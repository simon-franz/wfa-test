import styled from '@emotion/styled';
import { MiniMap as _MiniMap } from '@xyflow/react';

const Container = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight, theme }) => ({
  width: '100%',
  height: fullHeight ? '100%' : 500,
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  position: 'relative',
  cursor: 'move',
  '.react-flow__node': {
    ':active': {
      cursor: 'grabbing',
    },
  },
}));

const MiniMap = styled(_MiniMap)(({ theme }) => ({
  borderRadius: 6,
  border: `solid 1px ${theme.sqwTier2Color.border.subtle}`,
  overflow: 'hidden',
}));

export const S = {
  Container,
  MiniMap,
} as const;
