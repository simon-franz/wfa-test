import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { forwardRef, useContext } from 'react';

import { Button } from '../Button/Button';
import { S } from './ConfirmationModal.styles';
import type { ConfirmationModalProps } from './ConfirmationModal.types';

export const ConfirmationModal = observer(
  forwardRef<HTMLDivElement, ConfirmationModalProps>(
    ({ onConfirm, onCancel, confirmText, cancelText, isConfirmEnabled, ...otherProps }, ref) => {
      const { translate } = useContext(LocalizationContext);

      return (
        <S.ConfirmationModal
          closeable
          onClose={onCancel}
          ref={ref}
          footer={
            <>
              {onCancel && (
                <Button variant="subtle" onClick={onCancel}>
                  {cancelText || translate('confirmation-modal-cancel')}
                </Button>
              )}
              {onConfirm && (
                <Button variant="subtle" disabled={!isConfirmEnabled} onClick={onConfirm}>
                  {confirmText || translate('confirmation-modal-confirm')}
                </Button>
              )}
            </>
          }
          {...otherProps}
        />
      );
    },
  ),
);
