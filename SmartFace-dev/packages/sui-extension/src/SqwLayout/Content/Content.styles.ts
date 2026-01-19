import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system/mediaQueries';
import { Scroller } from '@hrworks/sui-core/Scroller';

import { SqwLayoutStyles } from '../';

const ContentContainer = styled(Scroller)(({ theme }) => ({
  marginLeft: SqwLayoutStyles.componentConfig.sidebar.width,
  marginTop: SqwLayoutStyles.componentConfig.header.height,

  [mq.isSmallDevice]: {
    marginLeft: 0,
  },

  [mq.conditionalTransition]: {
    transition: `margin-left ${theme.marko.variables.animationDuration.long}`,
  },
}));

const Content = styled.div<{
  borderless?: boolean;
}>(({ theme, borderless }) => ({
  height: '100%',

  ...(!borderless && {
    padding: SqwLayoutStyles.componentConfig.content.desktopPadding,
    [mq.isSmallDevice]: {
      padding: SqwLayoutStyles.componentConfig.content.mobilePadding,
    },
  }),

  [mq.conditionalTransition]: {
    transition: `padding ${theme.marko.variables.animationDuration.long}`,
  },
}));

export const S = {
  ContentContainer,
  Content,
} as const;
