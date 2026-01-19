import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useContext } from 'react';

import { AppContext } from '../../App/AppContext';
import { FilterControls } from './FilterControls/FilterControls';
import { UserCards } from './UserCards/UserCards';
import type { UserSelectorProps } from './UserSelector.types';

const FILTER_VISIBILITY_THRESHOLD = 10;

export const UserSelector = (props: UserSelectorProps) => {
  const { users } = useContext(AppContext);

  return (
    <Grid {...props}>
      <GridItem>{users && users.length > FILTER_VISIBILITY_THRESHOLD && <FilterControls />}</GridItem>
      <GridItem>
        <UserCards />
      </GridItem>
    </Grid>
  );
};
