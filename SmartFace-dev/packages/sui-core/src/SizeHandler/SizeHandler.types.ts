import type { CSSProperties, HTMLAttributes } from 'react';

export type SizeHandlerProps = Pick<
  CSSProperties,
  'height' | 'minHeight' | 'maxHeight' | 'width' | 'minWidth' | 'maxWidth'
> &
  HTMLAttributes<HTMLDivElement>;
