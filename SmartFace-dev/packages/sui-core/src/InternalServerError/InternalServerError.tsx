import { observer } from 'mobx-react';
import { useState } from 'react';

import Button from '../Button';
import { HTML } from '../Html';
import Modal from '../Modal';
import type { InternalServerErrorProps } from './InternalServerError.types';

export const InternalServerError = observer(({ title, message, html, url, close }: InternalServerErrorProps) => {
  const [show, setShow] = useState(true);
  const onClick = () => {
    if (typeof url === 'string') {
      document.location = url;
    } else {
      setShow(false);
    }
  };

  return (
    <Modal show={show} onExitComplete={close} title={title} footer={<Button onClick={onClick}>OK</Button>}>
      {html ? <HTML html={message} /> : message}
    </Modal>
  );
});
