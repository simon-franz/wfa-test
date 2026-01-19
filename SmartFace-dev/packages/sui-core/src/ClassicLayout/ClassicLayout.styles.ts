import styled from '@emotion/styled';

import { Backdrop as _Backdrop } from '../Backdrop';

const sidebarConfig = {
  sidebar: {
    horizontalPadding: 30,
    width: 255,
  },
};

const componentConfig = {
  sidebarWidth: 255,
  layoutPadding: 20,
  ...sidebarConfig,
  header: {
    height: 70,
    logoWidth: 120,
  },
};

const LayoutContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
});

const Backdrop = styled(_Backdrop)(({ theme }) => ({
  zIndex: theme.marko.variables.zIndex.sidebar - 1,
}));

export const S = {
  componentConfig,
  LayoutContainer,
  Backdrop,
} as const;
