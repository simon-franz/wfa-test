import { SuiThemeProvider } from '@hrworks/design-system';
import { LocalizationProvider } from '@hrworks/localization';

import type { SuiProviderProps } from './SuiProvider.types';

export const SuiProvider = ({ children, dictionary, ...otherProps }: SuiProviderProps) => (
  <SuiThemeProvider {...otherProps}>
    <LocalizationProvider dictionary={dictionary}>{children}</LocalizationProvider>
  </SuiThemeProvider>
);
