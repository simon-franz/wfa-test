import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import _Image from '@hrworks/sui-core/Image';
import _ListItem from '@hrworks/sui-core/List/Item';

const Image = styled(_Image)(({ theme }) => ({
  borderRadius: theme.marko.variables.borderRadius.extraSmall,
  maxWidth: 24,
}));

const DropdownContainer = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
    variant: 'default',
  }),
  {
    backgroundColor: theme.stellenportal?.headerStyle?.color || theme.sqwTier2Color.surface.raised,
    borderRadius: theme.marko.variables.borderRadius.extraSmall,
    padding: theme.marko.variables.spacing.distance.extraSmall,
    width: 'auto',
  },
]);

const ListItem = styled(_ListItem)(({ theme }) => ({
  display: 'flex',
  gap: theme.marko.variables.spacing.distance.extraSmall,
  padding: 0,
  width: 130,
}));

export const S = {
  Image,
  DropdownContainer,
  ListItem,
} as const;
