import { useContext } from 'react';

import { QrCodeScannerPageContext } from '../../../CameraController/QrCodeScannerPage/QrCodeScannerPageContext';
import { S } from './FinderOverlay.styles';
import type { FinderOverlayProps } from './FinderOverlay.types';

export const FinderOverlay = (props: FinderOverlayProps) => {
  const { isScanSuccessful } = useContext(QrCodeScannerPageContext);

  return (
    <S.OverlayBackdrop {...props}>
      <S.FocusArea isScanSuccessful={isScanSuccessful}>
        <S.TopLeftCorner />
        <S.TopRightCorner />
        <S.BottomRightCorner />
        <S.BottomLeftCorner />
      </S.FocusArea>
    </S.OverlayBackdrop>
  );
};
