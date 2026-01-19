import styled from '@emotion/styled';
import { mq, withOpacity } from '@hrworks/design-system';

import { S as ControlledCollapsibleMenuStyles } from '../../../CollapsibleMenu/ControlledCollapsibleMenu.styles';
import { S as CollapsibleMenuBaseItemStyles } from '../../../CollapsibleMenu/Entry/BaseItem/CollapsibleMenuBaseItem.styles';
import { Scroller as _Scroller } from '../../../Scroller';
import { S as ClassicLayoutStyles } from '../../ClassicLayout.styles';

const Container = styled.div(({ theme }) => ({
  position: 'fixed',
  width: ClassicLayoutStyles.componentConfig.sidebarWidth,
  height: '100%',
  backgroundColor: theme.sqwTier2Color.background.nav.default,

  '&&': [
    CollapsibleMenuBaseItemStyles.generatePaddings({
      theme,
      horizontalItemPadding: ClassicLayoutStyles.componentConfig.layoutPadding,
    }),
  ],

  [`${ControlledCollapsibleMenuStyles.Container}`]: {
    '--collapsible-menu-depth-indicator-color': theme.sqwTier2Color.icon.subtlest,
    padding: 0,
  },

  [`${CollapsibleMenuBaseItemStyles.ItemContainer} ${CollapsibleMenuBaseItemStyles.Item}`]: {
    fontWeight: 600,
    borderRadius: 0,
    minHeight: 50,
    height: '100%',

    '&[data-active=true]': {
      backgroundColor: theme.sqwTier2Color.background.nav.selected,
      color: theme.sqwTier2Color.text.selected,
    },

    [mq.supportsHover]: {
      ':hover, :active': {
        backgroundColor: withOpacity(theme.sqwTier2Color.background.nav.selected, '50%'),
      },
    },
  },

  [`${CollapsibleMenuBaseItemStyles.ItemContainer} ${CollapsibleMenuBaseItemStyles.ItemContainer} ${CollapsibleMenuBaseItemStyles.Item}`]:
    {
      fontWeight: 400,
    },

  [`${CollapsibleMenuBaseItemStyles.ItemContainer}`]: {
    transition: `background-color ${theme.marko.variables.animationDuration.normal}`,
    '&[data-expanded=true]': {
      backgroundColor: theme.sqwTier2Color.background.nav.hovered,
    },
  },
}));

const Scroller = styled(_Scroller)(({ theme }) => ({
  height: `calc(100% - ${ClassicLayoutStyles.componentConfig.header.height}px)`,
  overflowX: 'hidden',
  backgroundColor: theme.sqwTier2Color.background.nav.default,

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.sqwTier2Color.background.neutral.subtle.selected,
  },

  [mq.supportsHover]: {
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.sqwTier2Color.background.neutral.bold,
    },
  },
}));

export const S = {
  Container,
  Scroller,
} as const;
