import { observer } from 'mobx-react';

import Button from '../Button';
import Icon from '../Icon';
import { S } from './DatePickerToggle.styles';
import type { DatePickerToggleProps } from './DatePickerToggle.types';
import { DropdownDatePicker } from './DropdownDatePicker';

export const DatePickerToggle = observer(
  ({
    placement,
    calendar,
    clickTrackerRef,
    label,
    isPickerOpen,
    disabled,
    readOnly,
    buttonStyles,
    togglePicker,
    togglePickerButtonRef,
    size,
    presentation,
    numberOfMonths,
    onConfirm,
    onCancel,
    isValidSelection,
    ...otherProps
  }: DatePickerToggleProps) => {
    return (
      <>
        <div ref={togglePickerButtonRef} {...otherProps}>
          <Button css={buttonStyles} variant="unstyled" disabled={readOnly || disabled} onClick={togglePicker}>
            <Icon name="date-field-calendar" />
          </Button>
        </div>
        {presentation === 'dropdown' ? (
          <DropdownDatePicker
            calendar={calendar}
            clickTrackerRef={clickTrackerRef}
            isPickerOpen={isPickerOpen}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            placement={placement}
          />
        ) : (
          <S.ConfirmationModal
            show={isPickerOpen && !disabled && !readOnly}
            $size={size}
            title={label}
            $numberOfMonths={numberOfMonths}
            ref={clickTrackerRef}
            onConfirm={onConfirm}
            onCancel={onCancel}
            isConfirmEnabled={isValidSelection}
          >
            {calendar}
          </S.ConfirmationModal>
        )}
      </>
    );
  },
);
