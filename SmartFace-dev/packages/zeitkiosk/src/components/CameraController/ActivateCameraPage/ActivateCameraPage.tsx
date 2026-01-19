import Button from '@hrworks/sui-core/Button';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ClockInMethodSelectorContext } from '../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { S } from './ActivateCameraPage.styles';
import type { ActivateCameraPageProps } from './ActivateCameraPage.types';

export const ActivateCameraPage = ({ ...otherProps }: ActivateCameraPageProps) => {
  const t = useTranslations('activateCameraPage');
  const { setIsCameraActive } = useContext(ClockInMethodSelectorContext);

  return (
    <S.Container {...otherProps}>
      <S.Title>{t('title')}</S.Title>
      <Button leftIcon={<FontAwesomeIcon variant="regular" name="video" />} onClick={() => setIsCameraActive(true)}>
        {t('buttonText')}{' '}
      </Button>
    </S.Container>
  );
};
