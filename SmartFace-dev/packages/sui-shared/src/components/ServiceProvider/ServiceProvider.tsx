import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { ServiceContext } from './ServiceContext';
import type { ServiceProviderProps } from './ServiceProvider.types';

export const ServiceProvider = observer(
  ({ serviceToken, treeGraphExportServiceUrl, ...otherProps }: ServiceProviderProps) => {
    const { serviceToken: serviceTokenFromContext, treeGraphExportServiceUrl: treeGraphExportServiceUrlFromContext } =
      useContext(ServiceContext);

    const contextValue = useMemo(
      () => ({
        serviceToken: serviceToken || serviceTokenFromContext,
        treeGraphExportServiceUrl: treeGraphExportServiceUrl || treeGraphExportServiceUrlFromContext,
      }),
      [serviceToken, serviceTokenFromContext, treeGraphExportServiceUrl, treeGraphExportServiceUrlFromContext],
    );

    return <ServiceContext.Provider value={contextValue} {...otherProps} />;
  },
);
