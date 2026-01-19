import Button from '@hrworks/sui-core/Button';
import Flexbox from '@hrworks/sui-core/Flexbox';
import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import Modal from '@hrworks/sui-core/Modal';
import Text from '@hrworks/sui-core/Text';
import Title from '@hrworks/sui-core/Title';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ClockInMethodSelectorContext } from '../../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { QrCodeScannerPageContext } from '../QrCodeScannerPageContext';
import { S } from './InvalidQrCodeModal.styles';
import type { InvalidQrCodeModalProps } from './InvalidQrCodeModal.types';

export const InvalidQrCodeModal = (props: InvalidQrCodeModalProps) => {
  const t = useTranslations('qrCodeScannerPage.invalidQrCodeModal');
  const { setInvalidQrCode, invalidQrCode } = useContext(ClockInMethodSelectorContext);
  const { setIsScanSuccessful } = useContext(QrCodeScannerPageContext);

  const onClick = () => {
    setIsScanSuccessful(undefined);
    setInvalidQrCode(false);
  };

  return (
    <Modal
      show={invalidQrCode}
      size="small"
      footer={
        <Button fullWidth onClick={onClick} leftIcon={<FontAwesomeIcon name="check" />}>
          {t('closeButtonText')}
        </Button>
      }
      {...props}
    >
      <Flexbox flexDirection="column" alignItems="center">
        <S.IconWrapper>
          <FontAwesomeIcon name="circle-xmark" />
        </S.IconWrapper>
        <Title size="extraLarge">{t('title')}</Title>
        <Text>{t('text')}</Text>
      </Flexbox>
    </Modal>
  );
};
