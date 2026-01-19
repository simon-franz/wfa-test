import styled from '@emotion/styled';
import { ListItem as _ListItem } from '@hrworks/sui-core/List/Item/ListItem';

import { S as ImageStyles } from '@hrworks/sui-core/Image/Image.styles';

const ListItem = styled(_ListItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.extraLarge,
}));

const Media = styled.div({
  width: '1em',
  flexShrink: 0,
  fontSize: '3.5rem',
  [`${ImageStyles.Image}, svg`]: {
    display: 'flex',
  },
});

const TitleContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  alignItems: 'flex-start',
  textAlign: 'start',
  gap: theme.marko.variables.spacing.distance.extraSmall,
}));

const Title = styled.span(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
  color: theme.sqwTier2Color.text.brand.default,
}));

const SubTitle = styled.span(({ theme }) => ({
  color: theme.sqwTier2Color.text.subtlest,
}));

const Wrapper = styled.div({
  display: 'flex',
  alignSelf: 'flex-start',
  flexShrink: 0,
});

export const S = {
  ListItem,
  Media,
  TitleContainer,
  Title,
  SubTitle,
  Wrapper,
} as const;
