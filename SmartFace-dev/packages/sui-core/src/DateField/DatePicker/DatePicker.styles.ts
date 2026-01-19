import styled from '@emotion/styled';
import { mq, shouldForwardProp } from '@hrworks/design-system';
import { Swipeable } from '@hrworks/sui-shared/components/Swipeable/Swipeable';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { DayPicker as _DayPicker } from 'react-day-picker';

const componentConfig = {
  datePickerContainerHeight: {
    extraSmall: 234,
    small: 267,
    medium: 270,
    large: 351,
    extraLarge: 383,
  },
};

const DatePickerContainer = styled(Swipeable)<{
  size: Size;
}>(({ size, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: componentConfig.datePickerContainerHeight[size],
  fontSize: theme.marko.typography.sqwFontSizes[size],
}));

const DayPicker = styled(_DayPicker, {
  shouldForwardProp,
})<{
  $hidden: boolean;
}>(({ theme, $hidden }) => ({
  '.sf-day': {
    color: 'inherit',
  },
  '.sf-button': [
    {
      '::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        borderRadius: '50%',
      },
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 0,
      outline: 0,
      border: 0,
      width: '2.25em',
      height: '2.25em',
      cursor: 'pointer',
      ':focus-visible:after': {
        outlineOffset: -2,
        outline: `2px solid ${theme.sqwTier2Color.border.focus}`,
      },
    },
    {
      ':not(.sf-day-disabled)': {
        [mq.supportsHover]: {
          ':hover:after': {
            backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,
          },
        },
        ':active:after': {
          backgroundColor: theme.sqwTier2Color.background.nav.selected,
        },
      },
    },
  ],
  '.sf-months': {
    display: 'flex',
    justifyContent: 'center',
    columnGap: '1.25em',
  },
  '.sf-table': {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...($hidden && {
      display: 'none',
    }),
  },
  '.sf-cell': {
    padding: 0,
  },
  '.sf-weeknumber': {
    fontSize: '0.75em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.sqwTier2Color.text.subtle,
  },
  '.sf-vhidden': {
    display: 'none',
  },
  '.sf-head-cell': {
    textAlign: 'center',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  '.rdp-head_row': {
    color: theme.sqwTier2Color.text.brand.pressed,
  },
  '.sf-day-today': {
    fontWeight: 600,
    color: theme.sqwTier2Color.text.error.default,
  },
  '.sf-day-outside': {
    opacity: theme.marko.variables.opacity.medium,
  },
  '.sf-day-disabled': {
    opacity: theme.marko.variables.opacity.low,
    [mq.supportsHover]: {
      ':hover': {
        cursor: 'not-allowed',
      },
    },
  },
  '.sf-day-range-middle:after': {
    borderRadius: 0,
  },
  '.sf-day-range-start:after': {
    borderRadius: '100% 0 0 100%',
  },
  '.sf-day-range-end:after': {
    borderRadius: '0 100% 100% 0',
  },
  '.sf-day-range-end.sf-day-range-start:after': {
    borderRadius: '50%',
  },
  '.sf-day-selected:after': {
    backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
  },
}));

export const S = {
  DatePickerContainer,
  DayPicker,
} as const;
