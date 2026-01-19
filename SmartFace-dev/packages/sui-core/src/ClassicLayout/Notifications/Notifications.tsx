import { observer } from 'mobx-react';
import { AnimatePresence, motion } from 'motion/react';

import { S } from './Notifications.styles';
import type { NotificationsProps } from './Notifications.types';
import SingleNotification from './SingleNotification';

export const Notifications = observer(({ notifications, ...otherProps }: NotificationsProps) => (
  <S.Notifications {...otherProps}>
    <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <SingleNotification {...notification} />
        </motion.div>
      ))}
    </AnimatePresence>
  </S.Notifications>
));
