import type { RefObject } from 'react';
import type { SetRequired } from 'type-fest/source/set-required';

import type { TextareaProps } from '../Textarea.types';

export type UseResizeableTextareaProps = SetRequired<
  Pick<TextareaProps, 'resize' | 'rows' | 'growsWithContent' | 'value'>,
  'resize'
> & {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};
