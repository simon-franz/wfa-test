import styled from '@emotion/styled';

import { Logo as _Logo, LogoStyles } from '../Logo';
import type { BlankLayoutProps } from './BlankLayout.types';

const componentConfig = {
  padding: 30,
  logoPadding: 220,
};

type BlankLayoutContainer = {
  hasLogo: boolean;
} & Pick<BlankLayoutProps, 'borderless'>;

const BlankLayoutContainer = styled.div<BlankLayoutContainer>(({ hasLogo, borderless }) => ({
  height: '100%',
  ...(!borderless && {
    padding: componentConfig.padding,
  }),
  ...(hasLogo && {
    paddingTop: componentConfig.logoPadding,
  }),
}));

const Logo = styled(_Logo)({
  position: 'fixed',
  top: componentConfig.padding,
  right: componentConfig.padding,
  width: 'clamp(170px, 20%, 250px)',
  height: 0.5 * componentConfig.logoPadding - 0.5 * componentConfig.padding,
  textAlign: 'right',
  flexDirection: 'column',

  [`${LogoStyles.LogoLink}`]: {
    height: 'auto',
  },
});

const Content = styled.div<{
  hasLogo: boolean;
}>(({ hasLogo }) => ({
  height: '100%',
  ...(hasLogo && {
    marginTop: -0.5 * (componentConfig.logoPadding - componentConfig.padding),
  }),
}));

export const S = {
  BlankLayoutContainer,
  Logo,
  Content,
} as const;
