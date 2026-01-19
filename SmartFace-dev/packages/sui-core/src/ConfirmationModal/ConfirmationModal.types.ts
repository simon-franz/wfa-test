import type { ModalProps } from '../Modal/Modal.types';

export type ConfirmationModalProps = ModalProps & {
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  isConfirmEnabled?: boolean;
};
