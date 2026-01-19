import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';

import { Scroller as _Scroller } from '../../Scroller';

const componentConfig = {
  maxHeightOffset: 20,
};

const Scroller = styled(_Scroller)(({ theme }) => [
  generateShadowStyles({
    theme,
  }),
  {
    backgroundColor: theme.sqwTier2Color.background.input,
    border: `1px solid ${theme.sqwTier2Color.border.bold}`,
    borderRadius: 6,
  },
]);

export const S = {
  componentConfig,
  Scroller,
} as const;
