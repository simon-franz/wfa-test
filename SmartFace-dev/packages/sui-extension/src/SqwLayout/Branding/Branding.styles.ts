import styled from '@emotion/styled';
import { Logo as _Logo, LogoStyles } from '@hrworks/sui-core/Logo';

import { S as SqwLayoutStyles } from '../SqwLayout.styles';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  height: SqwLayoutStyles.componentConfig.header.height,
  padding: `${theme.marko.variables.spacing.distance.medium}px 0`,
  paddingLeft: SqwLayoutStyles.componentConfig.content.mobilePadding,
  alignItems: 'center',
  width: SqwLayoutStyles.componentConfig.sidebar.width,
  backgroundColor: theme.marko.hrworksUser.colors.brand,
  gap: theme.marko.variables.spacing.distance.medium,
  flexShrink: 0,
}));

const Logo = styled(_Logo)({
  [`${LogoStyles.Logo}`]: {
    maxWidth: SqwLayoutStyles.componentConfig.header.logoWidth,
  },
});

export const S = {
  Container,
  Logo,
};
