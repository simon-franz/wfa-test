import type { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

type InputWrapperType = {
  disabled: boolean;
  inputStyles: SerializedStyles;
};

const InputWrapper = styled.div<InputWrapperType>(({ theme, disabled, inputStyles }) => [
  inputStyles,
  {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.marko.variables.spacing.distance.extraSmall,
    cursor: disabled ? 'not-allowed' : 'text',
    alignItems: 'center',
  },
]);

type InputType = {
  disabled: boolean;
  isInputFocused: boolean;
  isBadgeFocused: string | null;
};

const Input = styled.input<InputType>(({ theme, disabled, isInputFocused, isBadgeFocused }) => ({
  border: 0,
  outline: 0,
  width: 0,
  padding: 0,
  flexGrow: 1,
  color: theme.sqwTier2Color.text.default,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  backgroundColor: theme.sqwTier2Color.background.input,
  ':focus-visible': {
    outline: 0,
  },
  ...(disabled && {
    cursor: 'not-allowed',
    color: theme.sqwTier2Color.text.disabled,
    backgroundColor: theme.sqwTier2Color.background.disabled.subtle,
  }),
  ...(isInputFocused && {
    minWidth: '3em',
  }),
  ...(isBadgeFocused && {
    caretColor: 'transparent',
  }),
}));

export const S = {
  InputWrapper,
  Input,
} as const;
