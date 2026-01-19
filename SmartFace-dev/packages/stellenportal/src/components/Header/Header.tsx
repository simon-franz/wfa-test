import { getSettings } from '../../data-access';
import type { HeaderProps } from './Header.types';
import { HeaderClient } from './HeaderClient';

export const Header = async ({ customerCompanyNumber, ...otherProps }: HeaderProps) => {
  const settings = customerCompanyNumber ? await getSettings(customerCompanyNumber) : undefined;

  return <HeaderClient logoPicture={settings?.logoPicture} {...otherProps} />;
};
