import type { Theme } from '@hrworks/design-system/types';
import type { IconSet } from '@hrworks/types/shared/UiTypes';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type SuiThemeContext = {
  iconSet: IconSet;
  useCustomScrollbars?: boolean; //TODO: Remove prop when Chrome has a floating scrollbar like every other browser
  theme?: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  colorScheme: Exclude<Theme, 'system'>;
};

export const SuiThemeContext = createContext<SuiThemeContext>({} as SuiThemeContext);
