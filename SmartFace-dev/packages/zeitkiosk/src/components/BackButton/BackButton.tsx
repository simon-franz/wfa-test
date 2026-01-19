'use client';

import Button from '@hrworks/sui-core/Button';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ClockInMethodSelectorContext } from '../ClockInMethodSelector/ClockInMethodSelectorContext';
import type { BackButtonProps } from './BackButton.types';

export const BackButton = (props: BackButtonProps) => {
  const t = useTranslations('backButton');
  const { setSelectedUser, setIsCameraActive } = useContext(ClockInMethodSelectorContext);

  const onClick = () => {
    setSelectedUser('');
    setIsCameraActive(false);
  };

  return (
    <Button leftIcon={<FontAwesomeIcon name="angle-left" />} variant="subtle" onClick={onClick} {...props}>
      {t('text')}
    </Button>
  );
};
