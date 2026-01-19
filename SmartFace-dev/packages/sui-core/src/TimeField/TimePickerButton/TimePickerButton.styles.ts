import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';

import Button from '../../Button';

const TimePickerButton = styled(Button, {
  shouldForwardProp,
})<{
  $mobile?: boolean;
}>(({ theme, $mobile }) => ({
  outlineOffset: -2,
  width: $mobile ? '100%' : 70,
  height: 32,
  justifyContent: 'center',
  color: theme.sqwTier2Color.text.default,
}));

export const S = {
  TimePickerButton,
} as const;
