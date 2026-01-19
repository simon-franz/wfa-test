import styled from '@emotion/styled';

import _Checkbox from '../../../Checkbox';

const Item = styled.div(({ theme }) => {
  const itemBorderSize = theme.marko.variables.spacing.distance.extraSmall;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.default,
    border: `${itemBorderSize}px solid transparent`,
    // TODO: Find out if this line is necessary. Disabling this line leads to smooth scrolling on iOS
    // '&:not(:first-of-type)': { borderTopWidth: 0 },
  };
});

type ItemContentType = {
  active: boolean;
  selected: boolean;
};

const ItemContent = styled.div<ItemContentType>(({ theme, active, selected }) => {
  const activeBackgroundColor = {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  };

  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0.5em 0.6875em',
    borderRadius: theme.marko.variables.borderRadius.small,
    ...(selected && activeBackgroundColor),
    ...(active && {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
    }),
    ':active': activeBackgroundColor,
  };
});

const Description = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75em',
});

const Checkbox = styled(_Checkbox)({
  pointerEvents: 'none',
});

export const S = {
  Item,
  ItemContent,
  Description,
  Checkbox,
} as const;
