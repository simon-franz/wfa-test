import styled from '@emotion/styled';

import type { LabelProps } from './Label.types';

const LabelContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
});

const Wrapper = styled.span<Pick<LabelProps, 'validationState'>>(({ theme, validationState }) => ({
  ...(validationState && {
    color: theme.sqwTier2Color.text[validationState === 'danger' ? 'error' : validationState].default,
  }),

  'span:last-child': {
    marginLeft: '0.2em',
  },
}));

const LabelChildren = styled.span({
  display: 'inline-flex',
  cursor: 'default',
  gap: 'inherit',
  pointerEvents: 'auto',
});

export const S = {
  LabelContainer,
  Wrapper,
  LabelChildren,
} as const;
