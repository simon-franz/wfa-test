import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const containerClassName = 'group flex items-center has-[:disabled]:opacity-30';

const InputContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SlotGroup = styled.div({
  display: 'flex',
  gap: '8px',
});

const Slot = styled.div<{ isActive?: boolean; hasError?: boolean }>(({ theme, isActive, hasError }) => ({
  position: 'relative',
  width: '48px',
  height: '56px',
  border: `2px solid ${hasError ? theme.sqwTier2Color.border.error : theme.sqwTier2Color.border.input}`,
  borderRadius: theme.marko.variables.borderRadius.medium,
  backgroundColor: theme.sqwTier2Color.background.input,
  color: theme.sqwTier2Color.text.default,
  fontSize: '24px',
  fontWeight: 600,
  textAlign: 'center',
  fontFamily: "'Monaco', 'Lucida Console', monospace",
  outline: 'none',
  transition: 'all 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'text',

  '&[data-selected="true"]': {
    borderColor: hasError ? theme.sqwTier2Color.border.error : theme.sqwTier2Color.border.focus,
    boxShadow: `0 0 0 3px ${
      hasError ? `${theme.sqwTier2Color.border.error}20` : `${theme.sqwTier2Color.border.focus}20`
    }`,
  },

  '&[data-disabled="true"]': {
    backgroundColor: theme.sqwTier2Color.background.disabled.default,
    color: theme.sqwTier2Color.text.disabled,
    cursor: 'not-allowed',
    opacity: 0.6,
  },

  ...(isActive && {
    borderColor: hasError ? theme.sqwTier2Color.border.error : theme.sqwTier2Color.border.focus,
    boxShadow: `0 0 0 3px ${
      hasError ? `${theme.sqwTier2Color.border.error}20` : `${theme.sqwTier2Color.border.focus}20`
    }`,
  }),
}));

const SlotChar = styled.div({
  '.group:has([data-input-otp-placeholder-shown]) &': {
    opacity: 0.2,
  },
});

const caretBlink = keyframes({
  '0%, 70%, 100%': {
    opacity: 1,
  },
  '20%, 50%': {
    opacity: 0,
  },
});

const FakeCaret = styled.div(({ theme }) => ({
  position: 'absolute',
  pointerEvents: 'none',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${caretBlink} 1.2s ease-out infinite`,

  '&::after': {
    content: '""',
    width: '1px',
    height: '2rem',
    backgroundColor: theme.sqwTier2Color.text.default,
  },
}));

const ErrorMessage = styled.div(({ theme }) => ({
  color: theme.sqwTier2Color.text.error.default,
  fontSize: '14px',
  textAlign: 'center',
}));

export const S = {
  Container,
  containerClassName,
  InputContainer,
  SlotGroup,
  Slot,
  SlotChar,
  FakeCaret,
  ErrorMessage,
} as const;
