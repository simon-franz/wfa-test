import { createContext } from 'react';

type HrworksAdminLayoutContextProps = {
  activeNavigationItemId?: string;
};

export const HrworksAdminLayoutContext = createContext<HrworksAdminLayoutContextProps>(
  {} as HrworksAdminLayoutContextProps,
);
