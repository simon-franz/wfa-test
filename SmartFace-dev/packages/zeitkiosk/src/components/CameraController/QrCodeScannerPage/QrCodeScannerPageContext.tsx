import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type QrCodeScannerPageContextProps = {
  onScan: (result: IDetectedBarcode[]) => void;
  isScanSuccessful?: boolean;
  setIsScanSuccessful: Dispatch<SetStateAction<boolean | undefined>>;
};

export const QrCodeScannerPageContext = createContext<QrCodeScannerPageContextProps>(
  {} as QrCodeScannerPageContextProps,
);
