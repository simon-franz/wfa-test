'use client';

import { Scroller } from '@hrworks/sui-core/Scroller';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { BackButton } from '../../BackButton';
import { ClockInMethodSelectorContext } from '../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { QrCodeScanner } from './QrCodeScanner';
import { S } from './QrCodeScannerPage.styles';
import type { QrCodeScannerPageProps } from './QrCodeScannerPage.types';
import { QrCodeScannerPageContext } from './QrCodeScannerPageContext';
import { useQrCodeScanner } from './useQrCodeScanner';

export const QrCodeScannerPage = (props: QrCodeScannerPageProps) => {
  const t = useTranslations('qrCodeScannerPage');
  const { onScan, isScanSuccessful, setIsScanSuccessful } = useQrCodeScanner();
  const { isCameraActive } = useContext(ClockInMethodSelectorContext);

  return (
    <QrCodeScannerPageContext value={{ onScan, isScanSuccessful, setIsScanSuccessful }}>
      <Scroller {...props}>
        {isCameraActive && <BackButton />}
        <S.Container>
          <S.Title>{t('title')}</S.Title>
          <QrCodeScanner />
        </S.Container>
      </Scroller>
    </QrCodeScannerPageContext>
  );
};
