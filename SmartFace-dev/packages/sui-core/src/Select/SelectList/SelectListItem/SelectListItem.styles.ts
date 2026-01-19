import styled from '@emotion/styled';

import _Checkbox from '../../../Checkbox';
import { S as InputFieldStyles } from '../../../InputField/InputField.styles';
import type { SelectProps } from '../../Select.types';

const GroupLabel = styled.li(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
  paddingLeft: theme.marko.variables.spacing.distance.small,
  '&:first-of-type': {
    paddingTop: theme.marko.variables.spacing.distance.extraSmall,
  },
}));

const Item = styled.li<Pick<Required<SelectProps>, 'size'>>(({ theme, size }) => {
  const itemBorderSize = theme.marko.variables.spacing.distance.extraSmall;

  return {
    cursor: 'pointer',
    fontSize: '1em',
    display: 'flex',
    borderLeft: `${itemBorderSize}px solid transparent`,
    borderRight: `${itemBorderSize}px solid transparent`,
    [`${ItemContainer}`]: {
      padding: `.5em ${(InputFieldStyles.componentConfig.offsetX[size] - itemBorderSize) / 2}px `,
    },
  };
});

const ItemContainer = styled.div<{
  active: boolean;
}>(({ theme, active }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.default,
  borderRadius: 6,
  ...(active && {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
  }),
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  },
}));

const Description = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.marko.variables.spacing.distance.small,
  alignItems: 'center',
}));

const MediaWrapper = styled.div({
  width: '1em',
  flexShrink: 0,
  display: 'flex',
});

const Checkbox = styled(_Checkbox)({
  pointerEvents: 'none',
});

export const S = {
  GroupLabel,
  Item,
  ItemContainer,
  Description,
  MediaWrapper,
  Checkbox,
} as const;
