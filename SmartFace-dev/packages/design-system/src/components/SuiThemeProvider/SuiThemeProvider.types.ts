import type { ReactNode } from 'react';

import type { SuiThemeContext } from './SuiThemeContext';

export type SuiThemeProviderProps = Partial<Omit<SuiThemeContext, 'setTheme'>> & {
  children: ReactNode;
  customTheme?: Record<string, any>;
};
