import styled from '@emotion/styled';

import { getButtonColorMap } from '@hrworks/sui-core/Button/Button.colors';

const PaginationContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${theme.marko.variables.spacing.distance.small}px 0`,
  gap: theme.marko.variables.spacing.distance.small,
}));

const PaginationButton = styled.button<{
  isSelected: boolean;
}>(({ theme, isSelected }) => {
  const colorMap = getButtonColorMap(theme);

  return {
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    width: 10,
    height: 10,
    padding: 0,
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    position: 'relative',

    '&:after': {
      content: '""',
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: isSelected ? colorMap.filled.primary.default : colorMap.filled.secondary.default,
    },

    '&:hover:after': {
      backgroundColor: isSelected ? colorMap.filled.primary.hovered : colorMap.filled.secondary.hovered,
    },

    '&:active:after': {
      backgroundColor: isSelected ? colorMap.filled.primary.pressed : colorMap.filled.secondary.pressed,
    },

    '&:focus': {
      outline: 'none',
    },

    '&:focus-visible': {
      outline: `2px solid ${theme.sqwTier2Color.border.focus}`,
    },
  };
});

export const S = {
  PaginationContainer,
  PaginationButton,
} as const;
