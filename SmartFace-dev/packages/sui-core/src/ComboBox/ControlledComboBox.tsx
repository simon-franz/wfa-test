import { useMediaQuery } from '@hrworks/design-system';
import { useDeepCompareMemoize } from '@hrworks/sui-shared/hooks/useDeepCompareMemoize';
import { usePrevious } from '@hrworks/sui-shared/hooks/usePrevious';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo } from 'react';

import type { ComboBoxProps } from './ComboBox.types';
import { DropdownComboBox } from './Dropdown';
import type { HeadlessComboBoxOption, HeadlessControlledComboBoxValue } from './HeadlessComboBox';
import { HeadlessComboBoxContext } from './HeadlessComboBox/HeadlessComboBoxContext';
import { useComboBox } from './hooks';
import { ModalComboBox } from './Modal';
import { useCache } from './util';

export const ControlledComboBox = observer(
  ({
    clearValueOnQueryChange, // TODO implement
    disabled,
    getOptions,
    getResultDelay = 0,
    getResultMinLength = 0,
    multiple,
    name,
    onQueryChange,
    onValueChange,
    onValueChangeLazy,
    query: _query,
    readOnly,
    size = 'medium',
    presentation,
    value,
    alwaysOpenOnFocus = false,
    ...otherProps
  }: ComboBoxProps) => {
    const query = useMemo<typeof _query>(
      () => (_query || multiple ? _query : (value as HeadlessComboBoxOption | null)?.text || ''),
      [_query, multiple, value],
    );

    // Cache for options
    const cache = useCache(getOptions, getResultDelay);
    const currentCache = cache.getCurrentCache(query);

    // getFormData serialization
    const serializedValue = useMemo(
      () => (value ? (Array.isArray(value) ? JSON.stringify(value.map(({ id }) => id)) : value.id) : ''),
      [value],
    );

    // ComboBox initialization
    const { contextValue } = useComboBox({
      options: currentCache?.options || [],
      alwaysOpenOnFocus,
      disabled,
      readOnly,
      query,
      onQueryChange,
      getResultMinLength,
      ...({
        multiple,
        value,
        onValueChange,
        onValueChangeLazy,
      } as HeadlessControlledComboBoxValue<HeadlessComboBoxOption, boolean>),
    });
    const { open, setOpen, shouldGetResult } = contextValue;

    // Evaluate if dropdown or modal
    const isPointerAndLargeDevice = useMediaQuery('isPointerAndLargeDevice');
    const wasPointerAndLargeDevice = usePrevious(isPointerAndLargeDevice);
    const isDropdown = useMemo(
      () => (presentation ? presentation === 'dropdown' : isPointerAndLargeDevice),
      [presentation, isPointerAndLargeDevice],
    );

    useEffect(() => {
      if (wasPointerAndLargeDevice !== isPointerAndLargeDevice) {
        // Close when switching type
        // queueMicrotask prevents "Can't perform React state update on an unmounted component."
        queueMicrotask(() => setOpen(false));
      }
    }, [isPointerAndLargeDevice, setOpen, wasPointerAndLargeDevice]);

    const closeComboBoxOnEscapePress = useCallback(
      (event: KeyboardEvent) => {
        if (open && event.key === 'Escape') {
          event.stopPropagation();
          setOpen(false);
        }
      },
      [open, setOpen],
    );

    useEffect(() => {
      document.addEventListener('keydown', closeComboBoxOnEscapePress, { capture: true });

      return () => {
        document.removeEventListener('keydown', closeComboBoxOnEscapePress, { capture: true });
      };
    }, [closeComboBoxOnEscapePress]);

    const memoizedOtherProps = useDeepCompareMemoize(otherProps);

    return (
      <HeadlessComboBoxContext.Provider value={contextValue}>
        {isDropdown ? (
          <DropdownComboBox
            currentCache={currentCache}
            open={open}
            shouldGetResult={shouldGetResult}
            getResult={cache.getResult}
            inputProps={memoizedOtherProps}
            size={size}
            getResultMinLength={getResultMinLength}
            isDropdown={isDropdown}
          />
        ) : (
          <ModalComboBox
            currentCache={currentCache}
            open={open}
            shouldGetResult={shouldGetResult}
            getResult={cache.getResult}
            setOpen={setOpen}
            inputProps={memoizedOtherProps}
            size={size}
          />
        )}
        <input
          hidden
          name={name}
          aria-hidden
          readOnly
          type="text"
          value={serializedValue}
          data-get-form-data-array={multiple}
          data-get-form-data-null-value
        />
      </HeadlessComboBoxContext.Provider>
    );
  },
);
