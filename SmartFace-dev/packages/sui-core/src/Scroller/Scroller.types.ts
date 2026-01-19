import type { CSSProperties, HTMLAttributes } from 'react';

export type ScrollerProps = {
  scrollToTop?: () => void;
} & HTMLAttributes<HTMLDivElement> &
  Pick<CSSProperties, 'scrollbarGutter'>;
