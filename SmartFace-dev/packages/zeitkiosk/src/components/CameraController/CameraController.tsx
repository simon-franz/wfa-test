import { useContext } from 'react';

import { AppContext } from '../App/AppContext';
import { ClockInMethodSelectorContext } from '../ClockInMethodSelector/ClockInMethodSelectorContext';
import { ActivateCameraPage } from './ActivateCameraPage';
import { QrCodeScannerPage } from './QrCodeScannerPage/QrCodeScannerPage';

export const CameraController = () => {
  const { isCameraContinuous } = useContext(AppContext);
  const { isCameraActive } = useContext(ClockInMethodSelectorContext);

  return isCameraContinuous || isCameraActive ? <QrCodeScannerPage /> : <ActivateCameraPage />;
};
