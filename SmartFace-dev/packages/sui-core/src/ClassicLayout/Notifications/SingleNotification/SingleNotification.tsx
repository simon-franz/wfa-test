import { useContext } from 'react';

import Alert from '../../../Alert';
import { HTML } from '../../../Html';
import { PageContext } from '../../../Page/PageContext';
import type { SingleNotificationProps } from './SingleNotification.types';

export const SingleNotification = ({ id, message, html, onDismiss, ...otherProps }: SingleNotificationProps) => {
  const { onDismissNotification } = useContext(PageContext);

  return (
    <Alert
      id={id}
      text={html ? undefined : message}
      corner="rounded"
      closeable
      onClose={() => onDismissNotification(id, onDismiss)}
      {...otherProps}
    >
      {html && <HTML html={message} />}
    </Alert>
  );
};
