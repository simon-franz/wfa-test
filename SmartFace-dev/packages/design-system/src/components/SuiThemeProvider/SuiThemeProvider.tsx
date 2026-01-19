import { Global, ThemeProvider } from '@emotion/react';
import { observer } from 'mobx-react';
import { MotionConfig } from 'motion/react';
import { useContext, useMemo } from 'react';

import { defaultTheme } from '../../theme';
import { SuiThemeContext } from './SuiThemeContext';
import { S } from './SuiThemeProvider.styles';
import type { SuiThemeProviderProps } from './SuiThemeProvider.types';
import { useThemeResolution } from './useThemeResolution';

export const SuiThemeProvider = observer(
  ({ iconSet, useCustomScrollbars, theme: themeFromProps, children, customTheme }: SuiThemeProviderProps) => {
    const {
      iconSet: iconSetFromContext,
      useCustomScrollbars: useCustomScrollbarsFromContext,
      theme: themeFromContext,
    } = useContext(SuiThemeContext);
    const {
      setTheme,
      theme: activeTheme,
      colorScheme,
    } = useThemeResolution(themeFromProps || themeFromContext || 'system');
    const emotionTheme = useMemo(() => ({ ...defaultTheme, ...customTheme }), [customTheme]);

    const contextValue = useMemo<SuiThemeContext>(
      () => ({
        iconSet: iconSet || iconSetFromContext || 'streamline',
        useCustomScrollbars: useCustomScrollbars ?? useCustomScrollbarsFromContext ?? true,
        setTheme,
        theme: activeTheme,
        colorScheme,
      }),
      [
        activeTheme,
        colorScheme,
        iconSet,
        iconSetFromContext,
        setTheme,
        useCustomScrollbars,
        useCustomScrollbarsFromContext,
      ],
    );

    return (
      <SuiThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={emotionTheme}>
          <MotionConfig reducedMotion="user">
            <Global styles={S.globalStyles} />
            {children}
          </MotionConfig>
        </ThemeProvider>
      </SuiThemeContext.Provider>
    );
  },
);
