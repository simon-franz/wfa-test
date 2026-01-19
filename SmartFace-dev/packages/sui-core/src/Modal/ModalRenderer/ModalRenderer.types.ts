import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLMotionProps } from 'motion/react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';

import type { ModalAnimationDirections } from '../Modal.types';

export type ModalRendererProps = {
  size?: Size | 'auto';
  closeOnBackdropClick?: boolean;
  entryAnimation?: ModalAnimationDirections;
  exitAnimation?: ModalAnimationDirections;
  fullHeight?: boolean;
  fullWidth?: boolean;
  fullScreen?: boolean;
  title?: string;
  footer?: ReactNode;
  closeable?: boolean;
  onClose?: () => void;
  fallbackRef?: Ref<HTMLDivElement> | undefined;
} & Omit<HTMLMotionProps<'div'>, 'children'> &
  Pick<HTMLAttributes<HTMLElement>, 'children'>;
