import { css, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, shouldForwardProp, withOpacity } from '@hrworks/design-system';
import IconButton from '@hrworks/sui-core/IconButton';
import type { ColumnPinningPosition } from '@tanstack/react-table';

import { densities } from '../../DataGrid.styles';
import type { ColumnDefinition } from '../../DataGrid.types';
import type { DataGridContext } from '../../DataGridContext';

const componentConfig = {
  buttonSize: 1.25,
};

type CellProps = {
  pinDirection?: ColumnPinningPosition;
  isSorted: boolean;
};

const generateInteractiveStyle = (theme: Theme) => ({
  ':hover:not([disabled])': {
    // Overwrite subtle styling from Button
    [mq.supportsHover]: {
      backgroundColor: withOpacity(theme.sqwTier2Color.background.brand.subtle.pressed, '50%'),
    },
    ':active': {
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
    },
  },
});

const Cell = styled.div<CellProps>(({ theme, pinDirection, isSorted }) => ({
  position: 'relative',
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  ...(pinDirection && {
    position: 'sticky',
    zIndex: 2,
    ...(pinDirection === 'left' && {
      left: 0,
    }),
    ...(pinDirection === 'right' && {
      right: 0,
    }),
  }),

  [mq.supportsHover]: {
    ':hover': {
      [`${Resizer}:not(:active) ~ ${InnerCell} ${SortButton}`]: {
        width: `${componentConfig.buttonSize}em`,
        opacity: isSorted ? 1 : 0.5,
      },
      [`${ContextMenuButton}`]: {
        opacity: 1,
      },
    },
  },
}));

const Resizer = styled.div<{
  canResize?: boolean;
}>(({ canResize }) => ({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translateX(50%)',
  width: `${(componentConfig.buttonSize / 2).toFixed(2)}em`,
  userSelect: 'none',
  touchAction: 'none',
  cursor: canResize ? 'ew-resize' : 'not-allowed',
  pointerEvents: 'painted',
}));

const ResizerThumb = styled.div<{
  canResize?: boolean;
}>(({ theme }) => ({
  // TODO: get color from background once UI/UX provided a proper token for resizer
  backgroundColor: theme.sqwTier2Color.text.subtlest,
  width: 2,
  height: `${componentConfig.buttonSize}em`,
  borderRadius: theme.marko.variables.borderRadius.extraSmall,
}));

type InnerCellProps = {
  sortFnExists?: (event: unknown) => void;
  density: DataGridContext['density'];
};

const InnerCell = styled.div<InnerCellProps>(({ sortFnExists, density }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: `${densities[density].cellPaddingY}px ${densities[density].cellPaddingX}px`,
  ...(sortFnExists && {
    cursor: 'pointer',
  }),
}));

const toggleAndPinStyles = css({
  position: 'absolute',
  height: `${componentConfig.buttonSize}em`,
  width: `${componentConfig.buttonSize}em`,
  padding: 0,
});

const iconButtonStyles = css({
  fontSize: '0.875rem',
  '> *': {
    fontSize: 14,
  },
});

const PinButton = styled(IconButton)(({ theme }) => [
  toggleAndPinStyles,
  iconButtonStyles,
  generateInteractiveStyle(theme),
  {
    left: 0,
  },
]);

const Content = styled.div<{
  justifyContent: ColumnDefinition['justifyContent'];
}>(({ justifyContent }) => ({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  flexGrow: 1,
  justifyContent,
}));

const ContentWrapper = styled.div(({ theme }) => ({
  maxWidth: '100%',
  display: 'inline-block',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  userSelect: 'none',
  color: theme.sqwTier2Color.text.subtle,
}));

type SortButtonProps = {
  $sortDirection?: 'asc' | 'desc' | false;
  $isSorted: boolean;
};

const SortButton = styled(IconButton, {
  shouldForwardProp,
})<SortButtonProps>(({ theme, $sortDirection, $isSorted }) => [
  iconButtonStyles,
  generateInteractiveStyle(theme),
  {
    position: 'relative',
    right: 0,
    borderRadius: '50%',
    padding: 0,
    width: 0,
    height: `${componentConfig.buttonSize}em`,
    flexShrink: 0,
    opacity: 0,
    ...($isSorted && {
      opacity: 1,
      width: `${componentConfig.buttonSize}em`,
    }),
    ...($sortDirection === 'desc' && {
      transform: 'scale(-1, -1)',
    }),
  },
]);

const ContextMenuButton = styled(IconButton)(({ theme }) => [
  toggleAndPinStyles,
  iconButtonStyles,
  generateInteractiveStyle(theme),
  {
    right: 0,
    opacity: 0,
  },
]);

export const S = {
  generateInteractiveStyle,
  Cell,
  Resizer,
  ResizerThumb,
  InnerCell,
  PinButton,
  Content,
  ContentWrapper,
  SortButton,
  ContextMenuButton,
} as const;
