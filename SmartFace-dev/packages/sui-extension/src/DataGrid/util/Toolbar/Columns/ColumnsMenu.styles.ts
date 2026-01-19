import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import _Checkbox from '@hrworks/sui-core/Checkbox';

import { S as FormGroupStyles } from '@hrworks/sui-core/FormGroup/FormGroup.styles';

const Menu = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Checkbox = styled(_Checkbox)(({ theme }) => ({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 6,
  ':not([disabled])': {
    [mq.supportsHover]: {
      ':hover': {
        backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.hovered,
      },
    },
    ':active': {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,
    },
  },
  [`${FormGroupStyles.ClickArea}`]: {
    padding: theme.marko.variables.spacing.distance.extraSmall,
  },
}));

export const S = {
  Menu,
  Checkbox,
} as const;
