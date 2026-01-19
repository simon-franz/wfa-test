import type { CustomTheme } from '../types/customTheme';
import { getSettings } from './getSettings';

export const getCustomTheme = async (customerCompanyNumber: string) => {
  const settings = await getSettings(customerCompanyNumber);

  const customTheme: CustomTheme = {
    stellenportal: {
      style: settings.style,
      buttonStyle: settings.buttonStyle,
      cardStyle: settings.cardStyle,
      fontStyle: settings.fontStyle,
      headerStyle: settings.headerStyle,
      linkStyle: settings.linkStyle,
      panelStyle: settings.panelStyle,
      titleStyle: settings.titleStyle,
    },
  };

  return customTheme;
};
