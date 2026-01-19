import styled from '@emotion/styled';
import _Button from '@hrworks/sui-core/Button';
import _Carousel from '@hrworks/sui-extension/Carousel';

// TODO: Refactor sui-extension Carousel for this use case
// TODO: mockup-icons: material design-icons: 'arrow_forward_ios' and 'arrow_back_ios'
const Carousel = styled(_Carousel)({
  'button[direction]': {
    opacity: 0.8,
    "&[direction='prev']": {
      translate: -35,
    },
    "&[direction='next']": {
      translate: 35,
    },
  },
});

// TODO: Discuss usage of sui-core Button with UI/UX, esp. focus-state
const Button = styled(_Button)<{ activeFilter: boolean }>(({ theme, activeFilter }) => ({
  ...theme.sqwTier2Typography.headingMdSemibold,
  minHeight: '3.5rem',
  backgroundColor: theme.sqwTier2Color.background.nav.default,
  color: theme.sqwTier2Color.text.selected,
  outlineOffset: -2,
  ...(activeFilter && {
    backgroundColor: theme.sqwTier2Color.background.nav.selected,
    border: `1px solid ${theme.sqwTier2Color.border.selected}`,
  }),
  '&&:hover': {
    backgroundColor: theme.sqwTier2Color.background.nav.hovered,
  },
}));

export const S = { Carousel, Button } as const;
