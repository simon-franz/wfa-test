import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { HeadlessComboBoxContext, HeadlessComboBoxOption, HeadlessControlledComboBoxProps } from '../';

export const useComboBox = ({
  disabled = false,
  getResultMinLength,
  multiple,
  onQueryChange,
  onValueChange,
  onValueChangeLazy,
  query,
  options,
  readOnly = false,
  value,
  alwaysOpenOnFocus,
}: HeadlessControlledComboBoxProps) => {
  const [open, _setOpen] = useState<HeadlessComboBoxContext['open']>(false);
  const lazyValue = useRef<HeadlessControlledComboBoxProps['value']>(value);
  const lastSelectedOptions = useRef<HeadlessComboBoxOption[] | null>(
    value && (Array.isArray(value) ? value : [value]),
  );

  const isSameOptionSelection = (
    valueArray: HeadlessComboBoxOption[] | null,
    lastOptionsArray: HeadlessComboBoxOption[] | null,
  ) => {
    if (valueArray === null || lastOptionsArray === null) return false;

    const ids1 = new Set(valueArray.map((item) => item.id));
    const ids2 = new Set(lastOptionsArray.map((item) => item.id));

    return ids1.size === ids2.size && [...ids1].every((id) => ids2.has(id));
  };

  // Multiple mode only sends onValueChangeLazy if list gets closed and something changed
  const setOpen = useCallback(
    (newOpen: HeadlessComboBoxContext['open']) => {
      if (multiple) {
        // Single is directly handled in select
        if (open) {
          if (!newOpen && value !== lazyValue.current) {
            // ComboBox gets closed
            lazyValue.current = value;

            if (!isSameOptionSelection(value, lastSelectedOptions.current)) {
              onValueChangeLazy?.(value);
              lastSelectedOptions.current = value;
            }
          }
        } else if (newOpen) {
          // ComboBox gets opened
          lazyValue.current = value;
        }
      }
      _setOpen(newOpen);
    },
    [multiple, open, value, lastSelectedOptions, onValueChangeLazy],
  );

  const [activeItemIndex, setActiveItemIndex] = useState<HeadlessComboBoxContext['activeItemIndex']>(null);

  // When query changes, remove the selection of the currently active option in the list
  useEffect(() => {
    setActiveItemIndex(null);
  }, [query]);

  // Whether an option is selected or not
  const isSelected = useCallback<HeadlessComboBoxContext['isSelected']>(
    (optionId) => (value == null ? false : multiple ? value.some(({ id }) => id === optionId) : value.id === optionId),
    [multiple, value],
  );

  // Handle edge case when query is empty on single mode
  // TODO clearValueOnQueryChange
  const handleQueryChange = useCallback<HeadlessComboBoxContext['onQueryChange']>(
    (query) => {
      onQueryChange(query);
      if (!multiple && value && query === '') {
        onValueChange(null);
        lazyValue.current = null;
        onValueChangeLazy?.(null);
      }
    },
    [multiple, onQueryChange, onValueChange, onValueChangeLazy, value],
  );

  // When clicking on the X button
  const clear = useCallback<HeadlessComboBoxContext['clear']>(() => {
    handleQueryChange('');
    if (multiple) {
      onValueChange(null);
      lazyValue.current = null;
      onValueChangeLazy?.(null);
    }
  }, [handleQueryChange, multiple, onValueChange, onValueChangeLazy]);

  // Selecting an option
  const select = useCallback<HeadlessComboBoxContext['select']>(
    (option) => {
      if (multiple) {
        const sanitizedValue = value || [];
        const idx = sanitizedValue.findIndex(({ id }) => id === option.id);
        const newValue =
          idx === -1
            ? [...sanitizedValue, option]
            : [...sanitizedValue.slice(0, idx), ...sanitizedValue.slice(idx + 1)];
        onValueChange(newValue.length === 0 ? null : newValue);
      } else {
        setOpen(false);
        onQueryChange(option.text);
        onValueChange(option);
        onValueChangeLazy?.(option);
      }
    },
    [multiple, onQueryChange, onValueChange, onValueChangeLazy, setOpen, value],
  );

  // Handle removing a selection on multiple mode
  const remove = useCallback<HeadlessComboBoxContext['remove']>(
    (idToRemove) => {
      if (!multiple || value == null) {
        return;
      }
      const idx = value.findIndex(({ id }) => id === idToRemove);
      if (idx !== -1) {
        const newValue = [...value.slice(0, idx), ...value.slice(idx + 1)];
        onValueChange(newValue);
        if (!open) {
          lazyValue.current = newValue;
          onValueChangeLazy?.(newValue);
        }
      }
    },
    [multiple, onValueChange, onValueChangeLazy, open, value],
  );

  const contextValue = useMemo<HeadlessComboBoxContext>(
    () => ({
      activeItemIndex,
      disabled,
      multiple: !!multiple,
      open: !disabled && !readOnly && open,
      options,
      query,
      readOnly,
      shouldGetResult: getResultMinLength == null || query.length >= getResultMinLength,
      value,
      clear,
      isSelected,
      onQueryChange: handleQueryChange,
      remove,
      select,
      setActiveItemIndex,
      setOpen,
      alwaysOpenOnFocus,
    }),
    [
      activeItemIndex,
      alwaysOpenOnFocus,
      clear,
      disabled,
      getResultMinLength,
      handleQueryChange,
      isSelected,
      multiple,
      open,
      options,
      query,
      readOnly,
      remove,
      select,
      setOpen,
      value,
    ],
  );

  return { contextValue };
};
