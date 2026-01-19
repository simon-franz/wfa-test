import type { ReactNode } from 'react';

import type { ServiceContext } from './ServiceContext';

export type ServiceProviderProps = ServiceContext & {
  children?: ReactNode;
};
