import type { User } from '../components/App/App.types';
import { apiClient } from './api';
import { getSettings } from './getSettings';

type UsersResponse = {
  users: User[];
};

export const getUsers = async (): Promise<User[]> => {
  const { onlyShowUserId } = await getSettings();
  const response = await apiClient.get<UsersResponse>('/time-management/users');
  const onlyUserIds = response.users.map(({ firstName, lastName, ...rest }) => rest);

  return onlyShowUserId ? onlyUserIds : response.users;
};
