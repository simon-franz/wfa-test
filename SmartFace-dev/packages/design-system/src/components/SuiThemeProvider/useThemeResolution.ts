import { useEffect, useState } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { Theme } from '../../types';
import type { SuiThemeContext } from './SuiThemeContext';

/**
 * Custom hook that manages theme mode state and resolves the actual theme to be applied.
 * Handles system mode by checking the user's color scheme preference.
 *
 * @param theme - The initial theme
 * @returns Object containing the theme, resulting colorScheme, and theme setter function
 */
export const useThemeResolution = (preferredTheme: Theme) => {
  const prefersColorSchemeDark = useMediaQuery('prefersColorSchemeDark');
  const [theme, setTheme] = useState(preferredTheme);

  // Set theme via data-attributes for CSS consumption and to fix emotion cache issues in NextJS
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    setTheme(preferredTheme);
  }, [preferredTheme]);

  const colorScheme: SuiThemeContext['colorScheme'] =
    theme === 'system' ? (prefersColorSchemeDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    document.documentElement.dataset.themeTransition = '';
    const timeoutId = setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [colorScheme]);

  return {
    theme,
    colorScheme,
    setTheme,
  };
};
