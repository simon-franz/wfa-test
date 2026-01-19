import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';

import { DefaultValueContext } from './DefaultValueContext';
import type { DefaultValueProviderProps } from './DefaultValueProviderTypes';

export const DefaultValueProvider = observer(
  ({ defaultSize, defaultFullHeight, ...otherProps }: DefaultValueProviderProps) => {
    const { defaultSize: defaultSizeFromContext, defaultFullHeight: defaultFullHeightFromContext } =
      useContext(DefaultValueContext);

    const contextValue = useMemo<DefaultValueContext>(
      () => ({
        defaultSize: defaultSize || defaultSizeFromContext,
        defaultFullHeight: defaultFullHeight ?? defaultFullHeightFromContext,
      }),
      [defaultFullHeight, defaultFullHeightFromContext, defaultSize, defaultSizeFromContext],
    );

    return <DefaultValueContext.Provider value={contextValue} {...otherProps} />;
  },
);
