import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';

import _Button from '../../Button';

// Referenced in: YearButton.styles.ts
const Button = styled(_Button, {
  shouldForwardProp,
})({
  textAlign: 'center',
  justifyContent: 'center',
});

export const S = {
  Button,
} as const;
