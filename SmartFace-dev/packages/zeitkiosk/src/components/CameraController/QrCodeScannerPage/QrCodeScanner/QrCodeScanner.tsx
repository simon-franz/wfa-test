import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useContext, useState } from 'react';

import { useDeviceCameras } from '../../../../hooks/useDeviceCameras';
import { ClockInMethodSelectorContext } from '../../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { FinderOverlay } from '../../../QrCodeScannerPage/QrCodeScanner/FinderOverlay';
import { InvalidQrCodeModal } from '../InvalidQrCodeModal';
import { QrCodeScannerPageContext } from '../QrCodeScannerPageContext';
import { S } from './QrCodeScanner.styles';
import type { QrCodeScannerProps } from './QrCodeScanner.types';

export const QrCodeScanner = ({ ...otherProps }: QrCodeScannerProps) => {
  const { isLoading, facingMode, cameraCount, toggleFacingMode } = useDeviceCameras();
  const { isQrCodeTabActive } = useContext(ClockInMethodSelectorContext);
  const { onScan, isScanSuccessful } = useContext(QrCodeScannerPageContext);

  const [isSwitchingCamera, setIsSwitchingCamera] = useState(false);

  const onClick = async () => {
    if (isSwitchingCamera) return;

    setIsSwitchingCamera(true);

    try {
      toggleFacingMode();

      // TODO: replace Promise & arbitrary 1000ms with time span to re-build video after toggle
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error toggling camera:', error);
    } finally {
      setIsSwitchingCamera(false);
    }
  };

  return !isQrCodeTabActive || isLoading ? (
    <LoadingAnimation type="spinner" />
  ) : (
    <S.QrCodeScannerWrapper {...otherProps}>
      <Scanner
        components={{ finder: false }}
        styles={{
          container: {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 8,
            transform: 'scaleX(-1)',
          },
        }}
        onScan={onScan}
        constraints={{ facingMode, aspectRatio: { ideal: 4 / 3 } }}
        sound={false}
      >
        {cameraCount > 1 && (
          <S.ToggleButtonWrapper>
            <S.Button disabled={isSwitchingCamera} onClick={onClick}>
              <FontAwesomeIcon name="repeat" />
            </S.Button>
          </S.ToggleButtonWrapper>
        )}
        <FinderOverlay />
        {/* TODO: Clarify positioning & appearance of InvalidQrCodeModal */}
        {!isScanSuccessful && <InvalidQrCodeModal />}
      </Scanner>
    </S.QrCodeScannerWrapper>
  );
};
