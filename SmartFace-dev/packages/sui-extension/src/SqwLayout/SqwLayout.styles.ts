import styled from '@emotion/styled';

const sidebarConfig = {
  sidebar: {
    horizontalPadding: 20,
    width: 255,
  },
};

const componentConfig = {
  ...sidebarConfig,
  header: {
    height: 70,
    logoWidth: 120,
  },
  content: {
    desktopPadding: 40,
    mobilePadding: sidebarConfig.sidebar.horizontalPadding,
  },
};

const LayoutContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

export const S = {
  componentConfig,
  LayoutContainer,
} as const;
