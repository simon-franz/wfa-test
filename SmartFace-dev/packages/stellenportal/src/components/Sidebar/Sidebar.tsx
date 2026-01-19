/* eslint-disable @next/next/no-img-element */
'use client';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Text from '@hrworks/sui-core/Text';
import Title from '@hrworks/sui-core/Title';
import { useTranslations } from 'next-intl';

import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { Link } from '../Link';
import type { SidebarProps } from './Sidebar.types';
import { SidebarContact } from './SidebarContact';
import { SidebarEstablishments } from './SidebarEstablishments';
import { SidebarSection } from './SidebarSection';

export const Sidebar = ({ post }: SidebarProps) => {
  const t = useTranslations();
  const { postOffer, contactInformation, scopeOfActivitiesKey } = post;
  const { careerLevelKey, workingTimeModelKey, permanentEstablishments, id } = postOffer;

  return (
    <>
      <Card>
        <CardBody>
          <Grid>
            {scopeOfActivitiesKey && (
              <SidebarSection title={t('Job.scope-of-activities')}>
                <Text>{t(`Job.scopeOfActivitiesKey.${scopeOfActivitiesKey}`)}</Text>
              </SidebarSection>
            )}
            {careerLevelKey && (
              <SidebarSection title={t('Job.carreer-level')}>
                <Text>{t(`Job.carreerLevelKey.${careerLevelKey}`)}</Text>
              </SidebarSection>
            )}
            {workingTimeModelKey && (
              <SidebarSection title={t('Job.working-time-model')}>
                <Text>{t(`Job.workingTimeModelKey.${workingTimeModelKey}`)}</Text>
              </SidebarSection>
            )}
            {permanentEstablishments && permanentEstablishments.length > 0 && (
              <SidebarEstablishments permanentEstablishments={permanentEstablishments} />
            )}
            <SidebarContact contactInformation={contactInformation} />
            <GridItem>
              <Link href={`${id}/apply`}>
                <Button fullWidth>{t('Main.apply')}</Button>
              </Link>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Grid gap="small">
            <GridItem>
              <Title>Unsere Kultur</Title>
            </GridItem>
            <GridItem>
              <Text>
                Was die DNA von HRworks auszeichnet, ist eine Kultur des Gelingens: Dank unserer Werte, Philosophie und
                Mission schaffen wir das Unternehmen, das stets das Beste hervorbringt. Für uns als Mitarbeiter genauso
                wie für unsere Kunden und Partner.
              </Text>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};
