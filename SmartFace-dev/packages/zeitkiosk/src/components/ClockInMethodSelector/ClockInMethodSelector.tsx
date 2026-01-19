'use client';

import TabPanel from '@hrworks/sui-core/Tabs/TabPanel';
import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import type { User } from '../App/App.types';
import { AppContext } from '../App/AppContext';
import { CameraController } from '../CameraController/CameraController';
import { InvalidQrCodeModal } from '../CameraController/QrCodeScannerPage/InvalidQrCodeModal';
import { NamePad } from '../NamePad';
import { PinPad } from '../PinPad';
import { S } from './ClockInMethodSelector.styles';
import type { ClockInMethodSelectorProps } from './ClockInMethodSelector.types';
import { ClockInMethodSelectorContext } from './ClockInMethodSelectorContext';

// TODO: Evaluate better naming for component
export const ClockInMethodSelector = (props: ClockInMethodSelectorProps) => {
  const t = useTranslations('clockInMethodSelector');
  const { users } = useContext(AppContext);
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [invalidQrCode, setInvalidQrCode] = useState(false);
  const [pendingAuthUser, setPendingAuthUser] = useState<User | undefined>(undefined);
  const [selectedTabId, setSelectedTabId] = useState('user-selection');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState(users);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const setSelectedUser = (userId: string) => {
    if (pendingAuthUser && pendingAuthUser.userId !== userId) {
      setPendingAuthUser(undefined);
    }
    setLoggedInUserId(loggedInUserId === userId ? '' : userId);
  };

  const selectedUser = pendingAuthUser ?? users?.find((user) => user.userId === loggedInUserId);

  const onClick = () => {
    setSelectedUsers(users);
    setActiveFilter('all');
    setSelectedUser('');
  };

  return (
    <ClockInMethodSelectorContext.Provider
      value={{
        setSelectedUser,
        selectedUser,
        setInvalidQrCode,
        setPendingAuthUser,
        invalidQrCode,
        activeFilter,
        setActiveFilter,
        selectedUsers,
        setSelectedUsers,
        setIsCameraActive,
        isCameraActive,
        isQrCodeTabActive: selectedTabId === 'qr-code-selection',
      }}
    >
      <S.Tabs defaultSelectedItemId="user-selection" {...props}>
        <S.TabList>
          <S.Tab id="user-selection" onAfterSelect={() => setSelectedTabId('user-selection')} onClick={onClick}>
            <Text>{t('personsTab')}</Text>
          </S.Tab>
          <S.Tab id="qr-code-selection" onAfterSelect={() => setSelectedTabId('qr-code-selection')} onClick={onClick}>
            <Text>{t('qrCodeTab')}</Text>
          </S.Tab>
        </S.TabList>
        <TabPanel id="user-selection">{selectedUser ? <PinPad /> : <NamePad />}</TabPanel>
        <TabPanel id="qr-code-selection">
          {selectedUser ? <PinPad /> : <CameraController />}
          {/* TODO: Clarify positioning & appearance of InvalidQrCodeModal */}
          {invalidQrCode && <InvalidQrCodeModal />}
        </TabPanel>
      </S.Tabs>
    </ClockInMethodSelectorContext.Provider>
  );
};
