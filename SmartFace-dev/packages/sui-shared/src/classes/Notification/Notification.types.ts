import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { Color } from '@hrworks/types/shared/UiTypes';

export type AddNotificationProps = {
  type: 'addNotification';
  id?: string;
  message?: string;
  title?: string;
  html?: boolean;
  color?: Color;
  stack?: boolean;
  onDismiss?: SfEventType;
  duration?: number | 'infinite';
};

type RemoveNotificationProps = {
  type: 'removeNotification';
  id: string;
};

export type NotificationProps = AddNotificationProps | RemoveNotificationProps;
