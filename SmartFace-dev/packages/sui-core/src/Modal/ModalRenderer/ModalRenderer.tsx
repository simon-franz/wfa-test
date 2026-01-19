import { useTheme } from '@emotion/react';
import { ERROR_CODES, ErrorHandlingContext } from '@hrworks/error-handling';
import { LocalizationContext } from '@hrworks/localization';
import { type MouseEvent, useContext, useEffect, useId } from 'react';

import Icon from '../../Icon';
import ModalContent from '../Content';
import ModalFooter from '../Footer';
import ModalHeader from '../Header';
import ModalHeaderCloseButton from '../Header/CloseButton';
import ModalHeaderTitle from '../Header/Title';
import { S } from './ModalRenderer.styles';
import type { ModalRendererProps } from './ModalRenderer.types';

export const ModalRenderer = ({
  children,
  fallbackRef,
  title,
  closeable,
  footer,
  ref,
  size = 'small',
  fullHeight,
  fullScreen,
  fullWidth,
  onClose,
  entryAnimation = 'grow',
  exitAnimation = 'shrink',
  ...otherProps
}: ModalRendererProps) => {
  const titleId = useId();
  const { log } = useContext(ErrorHandlingContext);
  const { translate } = useContext(LocalizationContext);

  const theme = useTheme();

  const _onClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    closeable && onClose?.();
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.style.overflow = 'hidden';
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (closeable && event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.style.overflow = '';
      }
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeable, onClose]);

  const contentsOrErrors = () => {
    if (title || children || footer) {
      return { title, children, closeable };
    }

    log({
      type: 'error',
      code: ERROR_CODES.MODAL_MISSING_TITLE_CHILDREN_FOOTER,
      error: new Error('Modal has missing properties title, children or footer'),
    });

    return {
      title: translate('modal-error-title'),
      children: translate('modal-error-message'),
      closeable: true,
    };
  };

  const { title: _title, children: _children, closeable: _closeable } = contentsOrErrors();

  return (
    <S.Modal
      tabIndex={-1}
      ref={ref}
      role="dialog"
      aria-labelledby={titleId}
      $size={size}
      $fullHeight={fullHeight}
      $fullWidth={fullWidth}
      $fullScreen={fullScreen}
      {...S.generateAnimationStyles(theme, entryAnimation, exitAnimation)}
      {...otherProps}
    >
      <S.ScrollerContainer ref={fallbackRef} tabIndex={-1}>
        {(_title || _closeable) && (
          <ModalHeader>
            {_title && <ModalHeaderTitle id={titleId} title={_title} />}
            {_closeable && (
              <ModalHeaderCloseButton onClick={_onClose} aria-label={translate('modal-close')}>
                <Icon name="modal-close" />
              </ModalHeaderCloseButton>
            )}
          </ModalHeader>
        )}
        {_children && <ModalContent>{_children}</ModalContent>}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </S.ScrollerContainer>
    </S.Modal>
  );
};
