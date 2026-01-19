import type { Notification } from '@hrworks/sui-shared/classes/Notification';
import type { SfEventType } from '@hrworks/types/shared/SfEventTypes/SfEventType';
import type { ReactNode } from 'react';

export type PageProps = {
  modals: (ReactNode[] | null)[];
  notifications: Notification[];
  onDismissNotification: (notificationId: Notification['id'], event?: SfEventType) => void;
  children: ReactNode;
};
