import styled from '@emotion/styled';
import { overflowEllipsis } from '@hrworks/design-system/stylePresets';
import _Button from '@hrworks/sui-core/Button';
import { ListItem as _ListItem } from '@hrworks/sui-core/List/Item/ListItem';

import { SpotlightStyles } from '../../Spotlight';

const ListItem = styled(_ListItem)(({ theme }) => ({
  backgroundColor: theme.marko.colors.palette.neutral[2],
  borderRadius: theme.marko.variables.borderRadius.small,
}));

const ListItemContent = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.marko.variables.spacing.distance.medium,
}));

const TitleDateContainer = styled.div(overflowEllipsis);

const NewsTitle = styled(SpotlightStyles.Title)({
  fontSize: 18,
  marginBottom: 4,
});

const NewsDate = styled(SpotlightStyles.Date)({
  fontSize: 16,
});

const Button = styled(_Button)(({ theme }) => ({
  backgroundColor: theme.marko.colors.palette.primary[2],
  alignSelf: 'start',
  padding: theme.marko.variables.spacing.distance.small,
  borderRadius: theme.marko.variables.spacing.distance.small,
}));

export const S = {
  ListItem,
  ListItemContent,
  TitleDateContainer,
  NewsTitle,
  NewsDate,
  Button,
} as const;
