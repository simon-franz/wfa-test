import { css } from '@emotion/react';

const nestedChecklistExpandArrow = css({
  fontSize: '1.35em',
});

const alertClose = css({
  '&&&': {
    fontSize: '1.429em',
  },
});

const selectDown = css({
  fontSize: '1.5em',
});

const collapsibleMenuSubmenuArrow = css({
  fontWeight: 400,
});

const comboBoxClear = css({
  fontSize: '1.25em',
});

const dropdownIndicatorRight = css({
  fontWeight: 400,
});

const modalClose = css({
  fontSize: '1.5rem',
  fontWeight: 300,
});

export const S = {
  nestedChecklistExpandArrow,
  alertClose,
  selectDown,
  collapsibleMenuSubmenuArrow,
  comboBoxClear,
  dropdownIndicatorRight,
  modalClose,
} as const;
