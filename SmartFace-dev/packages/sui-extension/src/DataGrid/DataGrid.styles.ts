import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';
import _LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';

import { Body as _Body } from './Body';
import type { DataGridContext } from './DataGridContext';
import { NoColumnsVisibleHeadRow as _NoColumnsVisibleHeadRow } from './Head/NoColumnsVisibleHeadRow/NoColumnsVisibleHeadRow';
import { Table as _Table } from './Table/Table';
import { Toolbar as _Toolbar } from './util/Toolbar';

const generateInteractiveBodyRowStyles = (theme: Theme) =>
  css({
    '&&': {
      outline: '2px solid transparent',
    },
    outlineOffset: 2,
    ':focus-visible': {
      zIndex: 1,
      outlineColor: theme.sqwTier2Color.border.focus,
      outlineOffset: -2,
    },
  });

export const densities = {
  low: {
    tablePaddingX: 20,
    rowMinHeight: 52,
    cellPaddingX: 32,
    cellPaddingY: 8,
  },
  medium: {
    tablePaddingX: 16,
    rowMinHeight: 44,
    cellPaddingX: 24,
    cellPaddingY: 6,
  },
  high: {
    tablePaddingX: 12,
    rowMinHeight: 36,
    cellPaddingX: 16,
    cellPaddingY: 4,
  },
};

const OuterWrapper = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  height: fullHeight ? '100%' : 500,
  position: 'relative',
}));

const Wrapper = styled.div<{
  fullHeight?: boolean;
}>(({ fullHeight }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: fullHeight ? '100%' : '500px',
  ...(fullHeight && {
    position: 'absolute',
    inset: 0,
  }),
}));

const LoadingAnimation = styled(_LoadingAnimation)(({ theme }) => ({
  zIndex: theme.marko.variables.zIndex.modal - 1,
  position: 'absolute',
  inset: 0,
  backdropFilter: 'blur(1px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Toolbar = styled(_Toolbar)(({ theme }) => ({
  border: `1px solid ${theme.sqwTier2Color.border.bold}`,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  borderBottom: 0,
  [`~ ${Scroller}`]: {
    borderTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
}));

const Scroller = styled(_Scroller)(({ theme }) => ({
  backgroundColor: theme.sqwTier2Color.surface.sunken,
  border: `1px solid ${theme.sqwTier2Color.border.bold}`,
  borderRadius: 6,
}));

const Table = styled(_Table)({
  minWidth: '100%',
});

const sharedHeadRowWrapperStyles = (theme: Theme) =>
  css({
    display: 'grid',
    backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  });

type HeadRowWrapper = {
  density: DataGridContext['density'];
  gridTemplateColumns: string;
};

const HeadRowWrapper = styled.div<HeadRowWrapper>(({ theme, density, gridTemplateColumns }) => [
  sharedHeadRowWrapperStyles(theme),
  {
    padding: `0 ${densities[density].tablePaddingX}px`,
    gridTemplateColumns,
    borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,
  },
]);

const NoColumnsVisibleHeadRow = styled(_NoColumnsVisibleHeadRow, {
  shouldForwardProp,
})<{
  $density: DataGridContext['density'];
}>(({ theme, $density }) => [
  sharedHeadRowWrapperStyles(theme),
  {
    padding: `0 ${densities[$density].tablePaddingX}`,
  },
]);

const Body = styled(_Body, {
  shouldForwardProp,
})<{
  $height: number;
}>(({ $height }) => ({
  position: 'relative',
  height: $height,
}));

const NoDataMessage = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

type BodyRowProps = {
  density: DataGridContext['density'];
  gridTemplateColumns: string;
  transform: string;
  hasOnClick: boolean;
};

const BodyRow = styled.div<BodyRowProps>(({ theme, density, gridTemplateColumns, transform, hasOnClick }) => [
  {
    display: 'grid',
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: densities[density].rowMinHeight,
    minWidth: '100%',
    padding: `0 ${densities[density].tablePaddingX}px`,
    backgroundColor: theme.sqwTier2Color.surface.sunken,
    gridTemplateColumns,
    transform,
    borderBottom: `1px solid ${theme.sqwTier2Color.border.bold}`,

    ...(hasOnClick && {
      ':hover': {
        background: theme.sqwTier2Color.background.neutral.subtlest.hovered,
        cursor: 'pointer',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: densities[density].tablePaddingX,
        right: densities[density].tablePaddingX,
        bottom: 0,
        pointerEvents: 'none',
      },
    }),
  },
  hasOnClick && generateInteractiveBodyRowStyles(theme),
]);

export const S = {
  generateInteractiveBodyRowStyles,
  OuterWrapper,
  Wrapper,
  NoDataMessage,
  LoadingAnimation,
  Toolbar,
  Scroller,
  Table,
  HeadRowWrapper,
  NoColumnsVisibleHeadRow,
  Body,
  BodyRow,
} as const;
