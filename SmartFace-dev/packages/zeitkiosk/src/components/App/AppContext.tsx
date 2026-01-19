'use client';

import { createContext } from 'react';

import type { User } from './App.types';

export type AppContextProps = {
  users: User[];
  isCameraContinuous: boolean;
  isTimeTypeSelectionEnabled: boolean;
  isProjectBookingEnabled: boolean;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
