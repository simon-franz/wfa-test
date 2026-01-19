import { SuiThemeProvider, type Theme } from '@hrworks/design-system';
import { LocalizationProvider } from '@hrworks/localization';
import { ServiceProvider } from '@hrworks/sui-shared';
import { useDeepCompareMemoize } from '@hrworks/sui-shared/hooks/useDeepCompareMemoize';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import { DefaultValueProvider } from './main/components/DefaultValueProvider';
import { SmartFaceContainer } from './main/components/SmartFaceContainer';
import { ErrorBoundary } from './main/lib/ErrorHandling/ErrorBoundary';
import { getSmartFaceBackendConfigProperty } from './main/lib/getSmartFaceBackendConfigProperty';

// Make window.smartFaceBackendConfig observable
if (typeof window !== 'undefined' && !window.isSmartFaceBackendConfigObservable) {
  makeObservable(window, { smartFaceBackendConfig: observable });
  window.isSmartFaceBackendConfigObservable = true;
}

export const App = observer(() => {
  // We need to deep memoize the entire sfTranslations object here.
  // Without deep memoization, the underlying component doesn't re-render.
  // Interestingly, it works without deep memoization in development,
  // but not in production, which is strange behavior.
  const memoizedSfTranslations = useDeepCompareMemoize(getSmartFaceBackendConfigProperty('sfTranslations'));
  const sfLocale = getSmartFaceBackendConfigProperty('sfLocale');
  const sfUseCustomScrollbars = getSmartFaceBackendConfigProperty('sfUseCustomScrollbars') ?? undefined;
  const sfIconSet = getSmartFaceBackendConfigProperty('sfIconSet') || undefined;
  const sfTheme = getSmartFaceBackendConfigProperty('sfTheme') || undefined;
  const _theme: Theme | undefined =
    sfTheme === 'hrwLightMode'
      ? 'light'
      : sfTheme === 'hrwDarkMode'
        ? 'dark'
        : sfTheme === 'hrwSystemMode'
          ? 'system'
          : undefined;
  const sfServiceToken = getSmartFaceBackendConfigProperty('sfServiceToken') || undefined;
  const sfTreeGraphExportServiceUrl = getSmartFaceBackendConfigProperty('sfTreeGraphExportServiceUrl') || undefined;
  const sfDefaultFullHeight = getSmartFaceBackendConfigProperty('sfDefaultFullHeight') || undefined;
  const sfDefaultSize = getSmartFaceBackendConfigProperty('sfDefaultSize') || undefined;

  return (
    <LocalizationProvider dictionary={memoizedSfTranslations} locale={sfLocale}>
      <SuiThemeProvider theme={_theme} useCustomScrollbars={sfUseCustomScrollbars} iconSet={sfIconSet}>
        <ErrorBoundary>
          <ServiceProvider serviceToken={sfServiceToken} treeGraphExportServiceUrl={sfTreeGraphExportServiceUrl}>
            <DefaultValueProvider defaultFullHeight={sfDefaultFullHeight} defaultSize={sfDefaultSize}>
              <SmartFaceContainer smartFaceComponents={[]} />
            </DefaultValueProvider>
          </ServiceProvider>
        </ErrorBoundary>
      </SuiThemeProvider>
    </LocalizationProvider>
  );
});
