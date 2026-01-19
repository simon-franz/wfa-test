import { css } from '@emotion/react';

import { defaultTheme } from '../../theme';

const defaultStyles = css({
  ...defaultTheme.sqwTier2Typography.bodyMd,
  color: defaultTheme.sqwTier2Color.text.default,
});

const globalStyles = css({
  body: defaultStyles,
});

export const S = {
  defaultStyles,
  globalStyles,
};
