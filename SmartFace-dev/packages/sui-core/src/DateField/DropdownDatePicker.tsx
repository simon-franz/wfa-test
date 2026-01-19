import { useTheme } from '@emotion/react';
import { autoUpdate, flip, limitShift, offset, shift, useFloating } from '@floating-ui/react-dom';
import { FocusTrap } from 'focus-trap-react';
import { observer } from 'mobx-react';
import type { HTMLAttributes } from 'react';

import type { DatePickerToggleProps } from './DatePickerToggle.types';
import { S } from './DropdownDatePicker.styles';

type DropdownDatePickerProps = Pick<
  DatePickerToggleProps,
  'readOnly' | 'disabled' | 'isPickerOpen' | 'clickTrackerRef' | 'size' | 'calendar' | 'placement'
> &
  HTMLAttributes<HTMLDivElement>;

export const DropdownDatePicker = observer(
  ({
    readOnly,
    disabled,
    isPickerOpen,
    clickTrackerRef,
    size,
    calendar,
    placement = 'bottom-end',
    ...otherProps
  }: DropdownDatePickerProps) => {
    const { spacing } = useTheme().marko.variables;

    const { refs, floatingStyles } = useFloating({
      middleware: [
        shift({ padding: spacing.distance.small, limiter: limitShift() }),
        flip(),
        offset(spacing.distance.small),
      ],
      placement,
      strategy: 'fixed',
      whileElementsMounted: autoUpdate,
    });

    return (
      <>
        {isPickerOpen && (
          <div ref={refs.setReference} {...otherProps}>
            <FocusTrap
              active={isPickerOpen}
              focusTrapOptions={{
                initialFocus: false,
                allowOutsideClick: true,
                clickOutsideDeactivates: true,
              }}
            >
              <div ref={clickTrackerRef}>
                <S.CalendarWrapper ref={refs.setFloating} size={size} style={floatingStyles}>
                  {calendar}
                </S.CalendarWrapper>
              </div>
            </FocusTrap>
          </div>
        )}
      </>
    );
  },
);
