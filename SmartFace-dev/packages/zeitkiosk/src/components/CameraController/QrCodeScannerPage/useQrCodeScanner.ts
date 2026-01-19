import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useContext, useState } from 'react';

import { AppContext } from '../../App/AppContext';
import { ClockInMethodSelectorContext } from '../../ClockInMethodSelector/ClockInMethodSelectorContext';

export const useQrCodeScanner = () => {
  const { users } = useContext(AppContext);
  const { setPendingAuthUser, setSelectedUser, setInvalidQrCode } = useContext(ClockInMethodSelectorContext);
  const [isScanSuccessful, setIsScanSuccessful] = useState<boolean | undefined>(undefined);

  const onScan = (result: IDetectedBarcode[]) => {
    const scannedUser = users?.find((user) => user.qrCode === result[0].rawValue);

    if (scannedUser) {
      setIsScanSuccessful(true);
      setTimeout(() => {
        setPendingAuthUser(scannedUser);
        setSelectedUser(scannedUser?.userId);
      }, 500);
    } else {
      setIsScanSuccessful(false);
      setPendingAuthUser(undefined);
      setInvalidQrCode(true);
    }
  };

  return {
    onScan,
    isScanSuccessful,
    setIsScanSuccessful,
  };
};
