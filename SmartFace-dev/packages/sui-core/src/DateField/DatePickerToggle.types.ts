import type { SerializedStyles } from '@emotion/react';
import type { FloatDirection, Presentation, Size } from '@hrworks/types/shared/UiTypes';
import type { ReactNode, RefObject } from 'react';

export type DatePickerToggleProps = {
  calendar: ReactNode;
  clickTrackerRef: RefObject<HTMLDivElement | null>;
  togglePickerButtonRef: RefObject<HTMLDivElement | null>;
  isPickerOpen: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  buttonStyles: SerializedStyles;
  togglePicker: () => void;
  size: Size;
  presentation: Presentation;
  placement?: FloatDirection;
  numberOfMonths?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  isValidSelection?: boolean;
};
