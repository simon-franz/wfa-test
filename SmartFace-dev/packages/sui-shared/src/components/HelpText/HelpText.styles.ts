import styled from '@emotion/styled';
import { overflowHyphens } from '@hrworks/design-system/stylePresets';
import type { SetRequired } from 'type-fest';

import type { HelpTextProps } from './HelpText.types';

const HelpTextContainer = styled.span<SetRequired<HelpTextProps, 'size'>>(
  ({ theme, validationState, validationMessage, size }) => [
    overflowHyphens,
    {
      ...theme.sqwTier2Typography.bodySm,
      display: 'inline-block',
      fontSize: '0.875em',
      marginTop: theme.marko.variables.spacing.formGap[size],
      color: theme.sqwTier2Color.text.info.default,
      ...(validationState &&
        validationMessage && {
          color: theme.sqwTier2Color.text[validationState === 'danger' ? 'error' : validationState].default,
        }),
    },
  ],
);

export const S = {
  HelpTextContainer,
} as const;
