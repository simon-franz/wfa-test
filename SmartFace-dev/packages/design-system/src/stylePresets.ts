import { css } from '@emotion/react';

export const overflowHyphens = css({
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  hyphens: 'auto',
});

export const overflowEllipsis = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const overflowBreakWord = css({
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
});

export const resetListStyles = css({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});
