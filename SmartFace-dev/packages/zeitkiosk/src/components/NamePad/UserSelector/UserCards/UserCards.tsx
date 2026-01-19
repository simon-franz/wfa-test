import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useContext } from 'react';

import { AppContext } from '../../../App/AppContext';
import { ClockInMethodSelectorContext } from '../../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { UserCard } from './UserCard';
import type { UserCardsProps } from './UserCards.types';

export const UserCards = ({ ...otherProps }: UserCardsProps) => {
  const { users } = useContext(AppContext);
  const { setSelectedUser, selectedUser, selectedUsers } = useContext(ClockInMethodSelectorContext);

  const onClick = (userId: string) => {
    const newSelectedId = userId === selectedUser?.userId ? '' : userId;
    setSelectedUser(newSelectedId);
  };

  return (
    <Grid {...otherProps}>
      {selectedUsers &&
        selectedUsers.map((user) => (
          <GridItem key={user.userId} size={{ sm: 6, lg: 4, xl: users && users.length < 6 ? 3 : 2 }}>
            <UserCard user={user} selectedUserId={selectedUser?.userId} onClick={onClick} />
          </GridItem>
        ))}
    </Grid>
  );
};
