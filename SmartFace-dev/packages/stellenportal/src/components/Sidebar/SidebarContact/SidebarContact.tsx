import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Image from '@hrworks/sui-core/Image';
import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';

import { SidebarSection } from '../SidebarSection';
import type { SidebarContactProps } from './SidebarContact.types';

export const SidebarContact = ({ contactInformation, ...otherProps }: SidebarContactProps) => {
  const t = useTranslations('Job');

  if (!contactInformation) {
    return;
  }

  const { contactPerson, phone, email } = contactInformation;

  return (
    <SidebarSection title={t('contact')} {...otherProps}>
      <Grid>
        <GridItem size={4}>
          <Image
            alt={`${contactPerson?.firstName} ${contactPerson?.lastName}`}
            src="https://placedog.net/80/80/?id=242"
            // src={contactPerson?.profileImage || ''}
          />
        </GridItem>
        <GridItem size={8}>
          {contactPerson && (
            <Text overflowBehaviour="ellipsis">{`${contactPerson?.firstName} ${contactPerson?.lastName}`}</Text>
          )}
          {phone && <Text overflowBehaviour="ellipsis">{phone}</Text>}
          {email && <Text overflowBehaviour="ellipsis">{email}</Text>}
        </GridItem>
      </Grid>
    </SidebarSection>
  );
};
