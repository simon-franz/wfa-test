import { getSettings } from '../../data-access';
import type { RootLayoutProps } from './RootLayout.types';
import { RootLayoutClient } from './RootLayoutClient';

export const RootLayout = async ({ customerCompanyNumber, ...otherProps }: RootLayoutProps) => {
  const settings = customerCompanyNumber ? await getSettings(customerCompanyNumber) : {};

  return <RootLayoutClient settings={settings} {...otherProps} />;
};
