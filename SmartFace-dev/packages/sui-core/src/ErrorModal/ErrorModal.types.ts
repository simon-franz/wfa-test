import type { Dictionary } from '@hrworks/localization';

import type { ModalProps } from '../Modal/Modal.types';

export type ErrorModalProps = ModalProps &
  (
    | {
        translateTextAndTitle: true;
        title?: keyof Dictionary;
        text?: keyof Dictionary;
        onDismiss?: () => void;
      }
    | {
        translateTextAndTitle?: false;
        text?: string;
        onDismiss?: () => void;
      }
  );
