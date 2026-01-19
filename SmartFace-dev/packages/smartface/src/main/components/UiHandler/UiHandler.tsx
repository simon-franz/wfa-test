import { SuiThemeProvider } from '@hrworks/design-system';
import { ServiceProvider } from '@hrworks/sui-shared/components/ServiceProvider/ServiceProvider';
import { observer } from 'mobx-react';

import { DefaultValueProvider } from '../../../main/components/DefaultValueProvider/DefaultValueProvider';
import type { UiHandlerProps } from './UiHandler.types';

export const UiHandler = observer(
  ({
    iconSet,
    serviceToken,
    treeGraphExportServiceUrl,
    defaultSize,
    defaultFullHeight,
    useCustomScrollbars,
    theme,
    children,
  }: UiHandlerProps) => (
    <DefaultValueProvider defaultSize={defaultSize} defaultFullHeight={defaultFullHeight}>
      <ServiceProvider serviceToken={serviceToken} treeGraphExportServiceUrl={treeGraphExportServiceUrl}>
        <SuiThemeProvider useCustomScrollbars={useCustomScrollbars} iconSet={iconSet} theme={theme}>
          {children}
        </SuiThemeProvider>
      </ServiceProvider>
    </DefaultValueProvider>
  ),
);
