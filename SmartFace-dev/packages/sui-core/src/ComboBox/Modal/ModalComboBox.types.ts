import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLMotionProps } from 'motion/react';

import type { HeadlessComboBoxContext } from '../HeadlessComboBox';
import type { ComboBoxInputProps } from '../Input';
import type { useCache } from '../util';

export type ModalComboBoxProps = {
  inputProps: Omit<ComboBoxInputProps, 'refs'>;
  currentCache: ReturnType<ReturnType<typeof useCache>['getCurrentCache']>;
  open: boolean;
  shouldGetResult: boolean;
  getResult(query: string): Promise<void>;
  size?: Size;
} & Pick<HeadlessComboBoxContext, 'setOpen'> &
  Omit<HTMLMotionProps<'div'>, 'children'>;
