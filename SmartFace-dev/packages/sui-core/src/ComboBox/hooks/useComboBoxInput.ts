import { queueMacrotask } from '@hrworks/sui-shared/functions/queueMacrotask';
import {
  type Dispatch,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type RefObject,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { HeadlessComboBoxContext, type HeadlessComboBoxOption } from '../';

type UseComboBoxInputReturn = Pick<
  Required<InputHTMLAttributes<HTMLInputElement>>,
  'onFocus' | 'onBlur' | 'disabled' | 'readOnly' | 'onChange'
> &
  Pick<Required<HTMLAttributes<HTMLElement>>, 'onKeyDown'> &
  Pick<HeadlessComboBoxContext, 'clear' | 'alwaysOpenOnFocus'> & {
    clearable: boolean;
    comboBoxValue: HeadlessComboBoxContext['value'];
    isInputFocused: boolean;
    value: string;
    focusedValueId: string | null;
    setFocusedValueId: Dispatch<SetStateAction<string | null>>;
    setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  };

export const useComboBoxInput = (
  inputRef: RefObject<HTMLInputElement | null>,
  refs?: RefObject<HTMLElement | null>[],
  noBlur?: boolean,
  clearValueOnFocus?: boolean,
): UseComboBoxInputReturn => {
  const { value, query, disabled, readOnly, multiple, clear, onQueryChange, remove, setOpen, alwaysOpenOnFocus } =
    useContext(HeadlessComboBoxContext);
  const [isInputFocused, setIsInputFocused] = useState(false);
  // MultiComboBox badges
  const [focusedValueId, setFocusedValueId] = useState<string | null>(null);

  // Value may have been changed through backend
  // If multiple mode and value, check if focusedValueId is still present to prevent unexpected behavior and to bring back input caret
  useEffect(() => {
    if (
      multiple &&
      focusedValueId != null &&
      (value == null || (Array.isArray(value) && !value.some(({ id }) => id === focusedValueId)))
    ) {
      setFocusedValueId(null);
    }
  }, [focusedValueId, multiple, value]);

  // When clicking on an option, prevent blur
  const onBlur = useCallback<UseComboBoxInputReturn['onBlur']>(
    (event) => {
      if (refs?.some((ref) => ref.current?.contains(event.relatedTarget))) {
        // TODO replace with onMouseDown->event.preventDefault() on the correct places in code
        // setTimeout instead of queueMicrotask fixes Firefox
        queueMacrotask(() => {
          inputRef.current?.focus();
        });

        return;
      }
      setIsInputFocused(false);
      setFocusedValueId(null);
      if (noBlur) {
        return;
      }
      setOpen(false);

      if (!multiple && query !== (value as HeadlessComboBoxOption | undefined)?.text) {
        onQueryChange((value as HeadlessComboBoxOption | null)?.text || '');
      }
    },
    [inputRef, multiple, noBlur, onQueryChange, query, refs, setOpen, value],
  );

  const onFocus = useCallback<UseComboBoxInputReturn['onFocus']>(
    (event) => {
      if (!isInputFocused) {
        setIsInputFocused(true);
        // Selecting the whole text (query) when focusing the input
        // TODO find a better alternative to select the whole text
        if (clearValueOnFocus) {
          clear();
        } else {
          !readOnly && setTimeout(() => event.target.select(), 128);
        }
      }
    },
    [clear, clearValueOnFocus, isInputFocused, readOnly],
  );

  // Keyboard navigation for badges in multiple mode
  const onKeyDown = useCallback<UseComboBoxInputReturn['onKeyDown']>(
    (event) => {
      if (disabled || readOnly || event.repeat || !Array.isArray(value) || value.length === 0) {
        // Not operable or multiple or no value => ignore
        return;
      }
      const selectionStart = inputRef.current?.selectionStart ?? null;
      const selectionEnd = inputRef.current?.selectionEnd ?? null;

      if (selectionStart != null && (selectionStart > 0 || selectionStart !== selectionEnd)) {
        // User interacts with input value
        return;
      }

      switch (event.key) {
        case 'Backspace': {
          event.preventDefault();
          event.stopPropagation();
          if (focusedValueId == null) {
            // Remove last item to simulate backspace behavior on badges
            const item = value.at(-1);
            item && remove(item.id);
            break;
          }
          const index = value.findIndex(({ id }) => id === focusedValueId);
          if (index === -1) {
            // Invalid selectedValueId => reset
            setFocusedValueId(null);
            break;
          }
          // Select previous value to simulate backspace behavior
          setFocusedValueId(value[index - 1]?.id || null);
          remove(focusedValueId);
          break;
        }
        case 'Delete': {
          if (focusedValueId == null) {
            // User wants to delete the first character of the input value
            break;
          }
          event.preventDefault();
          event.stopPropagation();
          const index = value.findIndex(({ id }) => id === focusedValueId);
          if (index === -1) {
            // Invalid selectedValueId => reset
            setFocusedValueId(null);
            break;
          }
          // Select next value to simulate delete behavior
          setFocusedValueId(index >= value.length - 1 ? null : value[index + 1]?.id || null);
          remove(focusedValueId);
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          event.stopPropagation();
          if (focusedValueId == null) {
            // Nothing is selected, select the last item
            setFocusedValueId(value.at(-1)?.id || null);
            break;
          }
          const index = value.findIndex(({ id }) => id === focusedValueId);
          if (index > 0) {
            // Go back one item
            setFocusedValueId(value[index - 1].id);
          } else if (index === -1) {
            // Invalid selectedValueId => treat as nothing is selected
            setFocusedValueId(value.at(-1)?.id || null);
          }
          break;
        }
        case 'ArrowRight': {
          if (focusedValueId == null) {
            // User wants to navigate through the input value
            break;
          }
          event.preventDefault();
          event.stopPropagation();
          const index = value.findIndex(({ id }) => id === focusedValueId);
          if (index >= 0) {
            // Select next badge. If there is none, bring back input caret
            setFocusedValueId(index < value.length - 1 ? value[index + 1]?.id || null : null);
          }
          break;
        }
      }
    },
    [disabled, focusedValueId, inputRef, readOnly, remove, value],
  );

  // Handling input value changes
  const onChange = useCallback<UseComboBoxInputReturn['onChange']>(
    (event) => {
      const { value } = event.target;
      // Bring back input caret
      setFocusedValueId(null);
      if (query !== value) {
        // Query change
        onQueryChange(value);
      }
      if (value !== '') {
        // Input changed so open the list
        setOpen(true);
      }
    },
    [onQueryChange, query, setOpen],
  );

  return {
    clearable: !!query || (Array.isArray(value) && value.length > 0),
    comboBoxValue: value,
    disabled,
    focusedValueId,
    setFocusedValueId,
    isInputFocused,
    readOnly,
    value: query,
    clear,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    alwaysOpenOnFocus,
    setIsInputFocused,
  };
};
