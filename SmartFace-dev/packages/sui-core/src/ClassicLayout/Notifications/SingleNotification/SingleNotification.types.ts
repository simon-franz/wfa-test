import type { Notification } from '@hrworks/sui-shared/classes/Notification';
import type { HTMLAttributes } from 'react';

export type SingleNotificationProps = Omit<Notification, 'removeNotification'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
