import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import Button from '../Button';
import Modal from '../Modal';
import type { ErrorModalProps } from './ErrorModal.types';

export const ErrorModal = observer(
  ({ translateTextAndTitle, onDismiss, title, text, ...otherProps }: ErrorModalProps) => {
    const { translate } = useContext(LocalizationContext);

    return (
      <Modal
        title={translateTextAndTitle && title ? translate(title) : title}
        footer={<Button onClick={onDismiss}>OK</Button>}
        {...otherProps}
      >
        {translateTextAndTitle && text ? translate(text) : text}
      </Modal>
    );
  },
);
