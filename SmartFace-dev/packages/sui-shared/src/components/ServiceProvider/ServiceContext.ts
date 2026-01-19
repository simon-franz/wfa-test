import { createContext } from 'react';

export type ServiceContext = {
  serviceToken?: string;
  treeGraphExportServiceUrl?: string;
};

export const ServiceContext = createContext<ServiceContext>({} as ServiceContext);
