import { type AddNotificationProps, Notification } from '@hrworks/sui-shared/classes/Notification';
import { action, makeObservable, observable } from 'mobx';

export class NotificationsController {
  constructor() {
    makeObservable(this);
  }

  @observable
  notifications: Notification[] = [];

  @action
  add = (notification: AddNotificationProps) => {
    this.notifications = this.notifications.filter(({ stack }) => stack);
    this.notifications.push(new Notification(notification, this.remove));
  };

  empty = () => {
    for (let i = this.notifications.length - 1; i >= 0; --i) {
      this.remove(this.notifications[i].id);
    }
  };

  @action
  remove = (notificationId: string) => {
    const notificationIndex = this.notifications.findIndex(({ id }) => id === notificationId);
    if (notificationIndex !== -1) {
      this.notifications[notificationIndex].willBeRemoved();
      this.notifications.splice(notificationIndex, 1);
    }
  };
}
