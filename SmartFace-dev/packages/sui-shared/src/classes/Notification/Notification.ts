import getId from '../../functions/getId';
import type { AddNotificationProps } from './Notification.types';

export class Notification {
  id: Required<AddNotificationProps>['id'];
  message: Required<AddNotificationProps>['message'];
  title: Required<AddNotificationProps>['title'];
  html: Required<AddNotificationProps>['html'];
  color: Required<AddNotificationProps>['color'];
  stack: Required<AddNotificationProps>['stack'];
  onDismiss: AddNotificationProps['onDismiss'];

  timeoutId?: NodeJS.Timeout;

  constructor(
    { id, message, title, html, color, stack, onDismiss, duration }: AddNotificationProps,
    removeNotification: (id: string) => void,
  ) {
    this.id = id || getId();
    this.message = message || '';
    this.title = title || '';
    this.html = html || false;
    this.color = color || 'primary';
    this.stack = stack || false;
    this.onDismiss = onDismiss;

    if (duration !== 'infinite') {
      this.timeoutId = setTimeout(() => removeNotification(this.id), duration ?? 3000);
    }
  }

  willBeRemoved = () => {
    clearTimeout(this.timeoutId!);
  };
}
