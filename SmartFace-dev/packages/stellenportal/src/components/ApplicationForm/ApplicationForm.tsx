'use client';

import Alert from '@hrworks/sui-core/Alert';
import Button from '@hrworks/sui-core/Button';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Modal from '@hrworks/sui-core/Modal';
import Text from '@hrworks/sui-core/Text';
import Title from '@hrworks/sui-core/Title';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { sendApplication } from '../../data-access/sendApplication';
import { Card, CardBody, CardHeader } from '../Card';
import { Link } from '../Link';
import { S } from './ApplicationForm.styles';
import type { ApplicationFormProps } from './ApplicationForm.types';
import { ApplicationFormContext } from './ApplicationFormContext';
import { ApplicationFormFileManager } from './ApplicationFormFileManager';
import { FormField } from './FormField';
import { NoticePeriodFields } from './NoticePeriodFields';
import { SubmitButton } from './SubmitButton';

const initialState = {
  message: '',
  success: false,
  errors: {} as Record<string, string[]>,
  inputs: new FormData(),
};

export const ApplicationForm = ({ postOfferId, post, ...otherProps }: ApplicationFormProps) => {
  const t = useTranslations();
  const [formState, formAction] = useActionState(sendApplication, initialState);

  const salutationOptions = [
    { label: t('FormFields.salutation-options.mr'), value: 'mr' },
    { label: t('FormFields.salutation-options.ms'), value: 'ms' },
    { label: t('FormFields.salutation-options.none'), value: 'none' },
  ];

  const { visibleFields, postOffer } = post;

  return (
    <ApplicationFormContext.Provider value={{ formState }}>
      <S.Container {...otherProps}>
        <Alert>
          Das Bewerbungsformular ist noch stark in Bearbeitung. Es werden aktuell keine Daten an HR WORKS übermittelt.
        </Alert>
        <Modal
          show={formState.success}
          title="Bewerbung Absenden?"
          footer={
            <Link href="apply/success">
              <Button>Bewerben</Button>
            </Link>
          }
        >
          <pre>{JSON.stringify(formState.inputs, null, 2)}</pre>
          <Alert>
            Diese Funktion ist noch nicht implementiert. Bei Klick auf Bewerben wirst du einfach auf die Success-Page
            weitergeleitet, die Bewerbung wird nicht an HR WORKS übermittelt.
          </Alert>
        </Modal>
        <form action={formAction}>
          <Card>
            <CardHeader>
              <Grid gap="small">
                <GridItem>
                  <Title size="extraLarge">{t('Main.application-form')}</Title>
                </GridItem>
                <GridItem>
                  <Title size="large">{postOffer.displayName}</Title>
                </GridItem>
              </Grid>
            </CardHeader>
            <CardBody>
              <Text>{`*${t('Form.required-fields')}`}</Text>
              <S.FormFieldContainer>
                <FormField fieldKey="salutation" options={salutationOptions} component="Select" />
                <FormField fieldKey="title" />
                <FormField fieldKey="firstName" />
                <FormField fieldKey="lastName" />
                <FormField fieldKey="email" />
                <FormField fieldKey="phone" visibility={visibleFields.mobilePhone} />
                <FormField fieldKey="street" visibility={visibleFields.address} />
                <FormField fieldKey="streetNumber" visibility={visibleFields.address} />
                <FormField fieldKey="additional" visibility={visibleFields.address} />
                <FormField fieldKey="countryCode" visibility={visibleFields.address} />
                <FormField fieldKey="zipCode" visibility={visibleFields.address} />
                <FormField fieldKey="city" visibility={visibleFields.address} />
                <FormField fieldKey="birthday" visibility={visibleFields.birthday} component="DateField" />
                <FormField fieldKey="birthplace" visibility={visibleFields.birthPlace} />
                <FormField fieldKey="fieldOfStudy" visibility={visibleFields.fieldOfStudy} />
                <GridItem size={12}>
                  <Grid>
                    <FormField fieldKey="lastAnnualSalary" visibility={visibleFields.lastAnnualSalary} />
                    <FormField
                      fieldKey="lastAnnualSalaryCurrency"
                      visibility={visibleFields.lastAnnualSalary}
                      component="CurrencySelect"
                    />
                  </Grid>
                </GridItem>
                <FormField fieldKey="desiredSalary" visibility={visibleFields.desiredSalary} />
                <FormField fieldKey="earliestPossibleJoinDate" visibility={visibleFields.earliestPossibleJoinDate} />
                <NoticePeriodFields visibility={visibleFields.noticePeriod} />
                <FormField
                  fieldKey="isSeverelyDisabled"
                  visibility={visibleFields.severelyDisabled}
                  component="Checkbox"
                />
                <FormField fieldKey="remark" size={12} visibility={visibleFields.remark} component="Textarea" />
                <ApplicationFormFileManager />
                <FormField
                  fieldKey="mayBePassedWithinCorporateGroup"
                  visibility={visibleFields.mayBePassedWithinCorporateGroup}
                  component="Checkbox"
                  size={12}
                />
                <FormField size={12} fieldKey="hasPrivacyTermsAccepted" component="Checkbox" />
              </S.FormFieldContainer>
              <p>{formState?.message}</p>
            </CardBody>
          </Card>
          <S.ButtonWrapper>
            <SubmitButton />
          </S.ButtonWrapper>
        </form>
      </S.Container>
    </ApplicationFormContext.Provider>
  );
};
