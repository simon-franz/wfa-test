import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';

import { SidebarSection } from '../SidebarSection';
import type { SidebarEstablishmentsProps } from './SidebarEstablishments.types';

export const SidebarEstablishments = ({ permanentEstablishments, ...otherProps }: SidebarEstablishmentsProps) => {
  const t = useTranslations('Job');

  if (!permanentEstablishments || permanentEstablishments.length === 0) {
    return;
  }

  return (
    <SidebarSection title={t('locations')} {...otherProps}>
      {permanentEstablishments.map((permanentEstablishment, index) => (
        <Text key={index}>
          {permanentEstablishment.address.city} <br />
          {permanentEstablishment.address.street} <br />
          {permanentEstablishment.address.country}
        </Text>
      ))}
    </SidebarSection>
  );
};
