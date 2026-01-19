import type { SentryConfig } from '@hrworks/error-handling';
import type { Dictionary, Locale } from '@hrworks/localization';
import type { ServiceContext } from '@hrworks/sui-shared';

import type { DefaultValueContext } from '../../main/components/DefaultValueProvider';
import type { UserlanePropsType } from '../extension/UserlaneType';
import type { SuiThemeProviderProps } from '@hrworks/design-system/components/SuiThemeProvider/SuiThemeProvider.types';

export type SmartFaceBackendConfig = Partial<{
  sfBaseUrl: string;
  sfTimeoutLength: number;
  sfEventHandlerUrl: string;
  sfHistoryHandlerUrl: string;
  sfComboBoxHandlerUrl: string;
  sfFileUploadHandlerUrl: string;
  sfFileExportHandlerUrl: string;
  sfCustomHeaders: Record<string, string>;
  sfErrorHandler:
    | {
        name: 'smartFace';
        config: SmartFaceErrorHandlingConfig;
      }
    | {
        name: 'sentry';
        config: SentryConfig;
      };
  sfGuidanceHandler: {
    name: 'userlane';
    config: UserlanePropsType;
  };
  sfTranslations: Dictionary;
  sfLocale: Locale;
  sfTheme: 'hrwDarkMode' | 'hrwSystemMode' | 'hrwLightMode';
  sfIconSet: SuiThemeProviderProps['iconSet'];
  sfUseCustomScrollbars: SuiThemeProviderProps['useCustomScrollbars'];
  sfServiceToken: ServiceContext['serviceToken'];
  sfTreeGraphExportServiceUrl: ServiceContext['treeGraphExportServiceUrl'];
  sfDefaultFullHeight: DefaultValueContext['defaultFullHeight'];
  sfDefaultSize: DefaultValueContext['defaultSize'];
}>;

export type SmartFaceErrorHandlingConfig = {
  url: string;
  data: unknown;
};
