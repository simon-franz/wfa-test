import type { DefaultValueProviderProps } from '../../../main/components/DefaultValueProvider/DefaultValueProviderTypes';
import type { SuiThemeProviderProps } from '@hrworks/design-system/components/SuiThemeProvider/SuiThemeProvider.types';
import type { ServiceProviderProps } from '@hrworks/sui-shared/components/ServiceProvider/ServiceProvider.types';

export type UiHandlerProps = Partial<SuiThemeProviderProps & DefaultValueProviderProps & ServiceProviderProps>;
