'use client';

import Checkbox from '@hrworks/sui-core/Checkbox';
import DateField from '@hrworks/sui-core/DateField';
import GridItem from '@hrworks/sui-core/GridItem';
import Select from '@hrworks/sui-core/Select';
import Textarea from '@hrworks/sui-core/Textarea';
import TextField from '@hrworks/sui-core/TextField';
import { CurrencySelect } from '@hrworks/sui-extension/CurrencySelect';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ApplicationFormContext } from '../ApplicationFormContext';
import { getFieldProps } from '../getFieldProps';
import type { FormFieldProps } from './FormField.types';

export const FormField = ({ size = 6, fieldKey, component = 'TextField', options, visibility }: FormFieldProps) => {
  const t = useTranslations('FormFields');
  const { formState } = useContext(ApplicationFormContext);

  const mandatory = visibility === 'Mandatory';
  const fieldProps = getFieldProps(formState, fieldKey, t);
  const commonProps = { mandatory, ...fieldProps };
  const componentMap = {
    Checkbox: <Checkbox {...commonProps} />,
    Textarea: <Textarea {...commonProps} />,
    TextField: <TextField {...commonProps} />,
    DateField: <DateField {...commonProps} />,
    CurrencySelect: <CurrencySelect {...commonProps} />,
    Select: <Select options={options || []} {...commonProps} />,
  };

  return <GridItem size={size}>{componentMap[component]}</GridItem>;
};
