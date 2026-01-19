'use client';

import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { User } from '../App/App.types';

type ClockInMethodSelectorContextProps = {
  setSelectedUser: (userId: string) => void;
  setInvalidQrCode: Dispatch<SetStateAction<boolean>>;
  setPendingAuthUser: Dispatch<SetStateAction<User | undefined>>;
  selectedUser?: User;
  invalidQrCode: boolean;
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
  selectedUsers?: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  setIsCameraActive: Dispatch<SetStateAction<boolean>>;
  isCameraActive: boolean;
  isQrCodeTabActive: boolean;
};

export const ClockInMethodSelectorContext = createContext<ClockInMethodSelectorContextProps>(
  {} as ClockInMethodSelectorContextProps,
);
