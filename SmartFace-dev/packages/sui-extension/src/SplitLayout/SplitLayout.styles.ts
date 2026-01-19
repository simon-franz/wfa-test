import styled from '@emotion/styled';
import { mq, overflowHyphens } from '@hrworks/design-system';
import { Notifications as _Notifications } from '@hrworks/sui-core/ClassicLayout/Notifications';
import { motion } from 'motion/react';

type ExpandSidebarProps = {
  expandSidebar?: boolean;
};

const LayoutContainer = styled.div<ExpandSidebarProps>(({ expandSidebar }) => ({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  [mq.isTouchOrSmallDevice]: {
    display: 'block',
    ...(expandSidebar && {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'flex-end',
      height: '100%',
    }),
  },
}));

type SidebarProps = {
  sidebarChildren: boolean;
} & ExpandSidebarProps;

const Sidebar = styled.div<SidebarProps>(({ theme, sidebarChildren, expandSidebar }) => [
  overflowHyphens,
  {
    width: sidebarChildren ? 'calc(100% / 3)' : '10%',
    maxWidth: 450,
    backgroundColor: theme.sqwTier2Color.background.nav.default,
    [mq.conditionalTransition]: {
      transitionProperty: 'all',
      transitionDuration: theme.marko.variables.animationDuration.extraLong,
    },
    [mq.isTouchOrSmallDevice]: {
      display: 'none',
    },
    ...(expandSidebar && {
      width: '80%',
      maxWidth: '80%',
      [mq.isTouchOrSmallDevice]: {
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        transition: 'none',
        flex: 1,
        overflow: 'hidden',
      },
    }),
  },
]);

const Content = styled.div<ExpandSidebarProps>(({ expandSidebar }) => ({
  flex: 1,
  position: 'relative',
  [mq.isTouchOrSmallDevice]: {
    height: '100%',
  },
  ...(expandSidebar && {
    position: 'static',
    [mq.isTouchOrSmallDevice]: {
      flex: 0,
    },
  }),
}));

const LogoWrapper = styled.div({
  position: 'absolute',
  right: 0,
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1,
  [mq.isTouchOrSmallDevice]: {
    display: 'none',
    position: 'static',
  },
});

const LogoContainer = styled.div<ExpandSidebarProps>(({ expandSidebar }) => ({
  width: '20%',
  padding: '45px 45px 0 0',
  display: 'flex',
  justifyContent: 'flex-end',
  [mq.isTouchOrSmallDevice]: {
    ...(expandSidebar && {
      flex: 0,
    }),
  },

  ...(expandSidebar && {
    padding: 30,
  }),
}));

const MotionDiv = styled(motion.div)({
  width: '100%',
  height: '100%',
  textAlign: 'right',
  maxHeight: 100,
  maxWidth: 200,
});

const LogoImage = styled.img({
  maxWidth: '100%',
  maxHeight: '100%',
});

const Notifications = styled(_Notifications)({
  [mq.isTouchOrSmallDevice]: {
    bottom: 65,
  },
});

export const S = {
  LayoutContainer,
  Sidebar,
  Content,
  LogoWrapper,
  LogoContainer,
  MotionDiv,
  LogoImage,
  Notifications,
} as const;
