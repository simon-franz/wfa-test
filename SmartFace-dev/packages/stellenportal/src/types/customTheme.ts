import type { Settings } from './settings';

export type CustomTheme = {
  stellenportal?: Pick<
    Settings,
    'style' | 'buttonStyle' | 'cardStyle' | 'linkStyle' | 'fontStyle' | 'headerStyle' | 'panelStyle' | 'titleStyle'
  >;
};
