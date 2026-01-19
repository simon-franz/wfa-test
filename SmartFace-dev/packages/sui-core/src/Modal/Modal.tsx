import { ConditionalWrapper } from '@hrworks/sui-shared';
import { FocusTrap } from 'focus-trap-react';
import { observer } from 'mobx-react';
import { AnimatePresence } from 'motion/react';
import { useRef } from 'react';

import { Backdrop } from '../Backdrop';
import Portal from '../Portal';
import type { ModalProps } from './Modal.types';
import { ModalRenderer } from './ModalRenderer';

export const Modal = observer(
  ({
    closeable,
    onClose,
    closeOnBackdropClick = true,
    fullScreen,
    show,
    deactivateAnimatePresence,
    onExitComplete,
    ...otherProps
  }: ModalProps) => {
    const fallbackRef = useRef(null);

    return (
      <ConditionalWrapper
        condition={!deactivateAnimatePresence}
        wrapper={(children) => <AnimatePresence>{children}</AnimatePresence>}
      >
        {show && (
          <>
            {!fullScreen && (
              <Backdrop
                onClick={(event) => {
                  event.stopPropagation();
                  closeable && closeOnBackdropClick && onClose?.();
                }}
              />
            )}
            <Portal>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <FocusTrap
                  focusTrapOptions={{
                    escapeDeactivates: false,
                    allowOutsideClick: true,
                    fallbackFocus: () => fallbackRef.current || document.body,
                  }}
                >
                  <ModalRenderer
                    onClose={onClose}
                    closeable={closeable}
                    fallbackRef={fallbackRef}
                    fullScreen={fullScreen}
                    {...otherProps}
                  />
                </FocusTrap>
              </div>
            </Portal>
          </>
        )}
      </ConditionalWrapper>
    );
  },
);
