import styled from '@emotion/styled';
import _IconButton from '@hrworks/sui-core/IconButton';

import type { KeypadButtonProps } from './KeypadButton.types';

const IconButton = styled(_IconButton)<Pick<KeypadButtonProps, '$isZero' | '$isBackspace'>>(
  ({ theme, $isZero, $isBackspace }) => ({
    ...theme.sqwTier2Typography.title,
    // TODO: Clarify with UI / UX styling of buttons
    height: '5.625rem',
    width: '5.625rem',
    padding: '1.5rem 2rem',
    backgroundColor: theme.sqwTier2Color.background.nav.hovered,
    color: theme.sqwTier2Color.text.default,
    border: `1px solid ${theme.sqwTier2Color.border.selected}`,
    ...($isZero && { gridColumn: 2 }),
    ...($isBackspace && { gridColumn: 3, backgroundColor: 'unset', border: 'none' }),
    // TODO: Clarify with UI / UX styling of buttons in different states
    '&&': {
      ':hover': {
        backgroundColor: theme.sqwTier2Color.background.nav.hovered,
      },
      ':active': {
        backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
      },
    },
  }),
);

export const S = {
  IconButton,
} as const;
