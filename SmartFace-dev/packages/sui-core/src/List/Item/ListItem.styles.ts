import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import Button from '../../Button';

type ListItemProps = {
  selected?: boolean | string;
  hoverable: boolean;
  clickable: boolean;
};

const ListItem = styled.li<ListItemProps>(({ theme, selected, hoverable, clickable }) => {
  const padding = `${theme.marko.variables.spacing.distance.large}px ${theme.marko.variables.spacing.distance.extraLarge}px`;

  return {
    width: '100%',
    ...(!clickable && {
      padding,
    }),
    ...(selected && {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
    }),
    ...(hoverable && {
      [mq.conditionalTransition]: {
        transition: `background-color ${theme.marko.variables.animationDuration.normal}`,
      },
      [mq.supportsHover]: {
        ':hover': {
          backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
        },
      },
    }),
    [`${ButtonWrapper}`]: {
      padding,
    },
  };
});

const ButtonWrapper = styled(Button)<{
  $hoverable: boolean;
}>(({ theme, $hoverable }) => ({
  width: '100%',
  outlineOffset: 0,
  border: 0,
  borderRadius: 0,
  gap: 'inherit',
  ':active': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
  },
  ...($hoverable && {
    ':focus-visible': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
    },
  }),
}));

export const S = {
  ListItem,
  ButtonWrapper,
} as const;
