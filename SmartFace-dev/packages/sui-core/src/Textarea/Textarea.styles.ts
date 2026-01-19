import type { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import type { TextareaProps as _TextareaProps } from './Textarea.types';

type TextareaProps = Pick<Required<_TextareaProps>, 'resize'> & {
  inputStyles: SerializedStyles;
};

const Textarea = styled.textarea<TextareaProps>(({ resize, inputStyles }) => [
  {
    resize,
  },
  inputStyles,
]);

export const S = {
  Textarea,
} as const;
