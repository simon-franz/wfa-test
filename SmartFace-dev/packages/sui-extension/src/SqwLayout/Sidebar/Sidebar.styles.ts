import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import { Scroller as _Scroller } from '@hrworks/sui-core/Scroller';

import { SqwLayoutStyles } from '../';
import { S as ControlledCollapsibleMenuStyles } from '@hrworks/sui-core/CollapsibleMenu/ControlledCollapsibleMenu.styles';
import { S as CollapsibleMenuBaseItemStyles } from '@hrworks/sui-core/CollapsibleMenu/Entry/BaseItem/CollapsibleMenuBaseItem.styles';
import { S as InputFieldStyles } from '@hrworks/sui-core/InputField/InputField.styles';

const Container = styled.div(({ theme }) => {
  const interactiveStyles = css({
    backgroundColor: theme.marko.hrworksUser.colors.hover,
  });

  return {
    position: 'fixed',
    left: 0,
    backgroundColor: theme.marko.hrworksUser.colors.brand,
    width: SqwLayoutStyles.componentConfig.sidebar.width,
    height: '100%',
    zIndex: theme.marko.variables.zIndex.sidebar,

    '&&': [
      CollapsibleMenuBaseItemStyles.generatePaddings({
        theme,
        iconFontSize: '1.5rem',
        iconGap: 16,
        horizontalItemPadding: SqwLayoutStyles.componentConfig.sidebar.horizontalPadding,
      }),
    ],

    [`${ControlledCollapsibleMenuStyles.Container}`]: {
      padding: 0,
    },

    [`${CollapsibleMenuBaseItemStyles.ItemContainer}`]: {
      transition: `background-color ${theme.marko.variables.animationDuration.normal}`,
      '&[data-expanded=true]': {
        backgroundColor: theme.marko.hrworksUser.colors.brandActive,
      },

      [`${CollapsibleMenuBaseItemStyles.ItemContainer} ${CollapsibleMenuBaseItemStyles.Item}`]: {
        fontSize: 14,
      },
    },

    [`${CollapsibleMenuBaseItemStyles.IconContainer} svg`]: {
      width: 18,
    },

    [`${CollapsibleMenuBaseItemStyles.Item}`]: [
      {
        borderRadius: 0,
        color: theme.marko.hrworksUser.colors.text,
        fontSize: theme.marko.typography.fontSizes.medium,
        fontFamily: theme.marko.hrworksUser.typography.fontFamily,
        minHeight: 50,
        height: '100%',

        '&[data-active=true]': {
          backgroundColor: theme.marko.hrworksUser.colors.active,
          color: theme.marko.hrworksUser.colors.textHover,
        },

        ':focus-visible': {
          outlineColor: theme.marko.hrworksUser.colors.active,
        },

        [mq.supportsHover]: {
          ':hover': interactiveStyles,
        },

        ':active': interactiveStyles,
      },
    ],

    [`${InputFieldStyles.Container}`]: {
      padding: `30px ${SqwLayoutStyles.componentConfig.sidebar.horizontalPadding}px`,
    },
  };
});

const Scroller = styled(_Scroller)({
  height: `calc(100% - ${SqwLayoutStyles.componentConfig.header.height}px)`,
  overflowX: 'hidden',
});

const UpperSidebarChildrenContainer = styled.div({
  display: 'none',
  [mq.isSmallDevice]: {
    display: 'block',
  },
});

export const S = {
  Container,
  Scroller,
  UpperSidebarChildrenContainer,
} as const;
