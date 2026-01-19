import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import type { HTMLAttributes } from 'react';

export type User = {
  firstName?: string;
  lastName?: string;
  userId: string;
  qrCode?: IDetectedBarcode['rawValue'];
};

export type AppProps = {
  users: User[];
  isCameraContinuous: boolean;
  isTimeTypeSelectionEnabled: boolean;
  isProjectBookingEnabled: boolean;
} & HTMLAttributes<HTMLDivElement>;
