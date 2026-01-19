import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Title from '@hrworks/sui-core/Title';

import type { SidebarSectionProps } from './SidebarSection.types';

export const SidebarSection = ({ title, children, ...otherProps }: SidebarSectionProps) => (
  <GridItem {...otherProps}>
    <Grid rowGap="extraSmall">
      <GridItem>{title && <Title>{title}</Title>}</GridItem>
      <GridItem>{children}</GridItem>
    </Grid>
  </GridItem>
);
