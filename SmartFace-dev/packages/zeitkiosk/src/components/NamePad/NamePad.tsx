'use client';

import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { AppContext } from '../App/AppContext';
import { Card } from '../Card';
import { Title } from '../Typography/Title';
import type { NamePadProps } from './NamePad.types';
import { UserSelector } from './UserSelector/UserSelector';

export const NamePad = (props: NamePadProps) => {
  const t = useTranslations('namePad');
  const { users } = useContext(AppContext);

  return (
    <Card {...props}>
      <Title>{t('title')}</Title>
      {users?.length ? <UserSelector /> : <Text color="danger">{t('noRegisteredUserText')}</Text>}
    </Card>
  );
};
