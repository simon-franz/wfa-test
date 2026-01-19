import { LocalizationContext } from '@hrworks/localization';
import { mergeRefs, useFloat } from '@hrworks/sui-shared';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import { observer } from 'mobx-react';
import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Icon from '../Icon';
import InputField from '../InputField';
import { Scroller } from '../Scroller';
import { S } from './Select.styles';
import type { SelectOptionProps, SelectProps } from './Select.types';
import { SelectContext } from './SelectContext';
import { SelectList } from './SelectList/SelectList';
import { SelectTrigger } from './SelectTrigger/SelectTrigger';
import { useSelectState } from './useSelectState';

export const Select = observer(
  ({
    name,
    onValueChange,
    onValueChangeFinished,
    options,
    noOptionsAvailableText,
    noOptionSelectedText,
    value: _value,
    defaultValue,
    size = 'medium',
    disabled,
    multiple,
    noneOption,
    'aria-label': ariaLabel,
    alwaysOpenOnFocus,
    dropdownWidth = 'auto',
    ref,
    ...otherProps
  }: SelectProps) => {
    const { translate } = useContext(LocalizationContext);
    const _noOptionSelectedText = noOptionSelectedText || translate('select-no-option-selected-text');
    const { value, isControlled, setInternalSelectedValue } = useSelectState(_value, defaultValue, multiple, options);
    const [activeItemValue, setActiveItemValue] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hasInputFocus, setHasInputFocus] = useState(false);
    const outerRef = useRef<HTMLDivElement>(null);
    const valueBeforeOpen = useRef<string | string[] | undefined>(undefined);
    const selectTriggerRef = useRef<HTMLDivElement>(null);
    const shouldPreventToggleDropdownRef = useRef<boolean>(false);
    const hasOptions = useMemo(() => {
      // noneOptions get added to the option array so if there is an noneoption check for >1
      if ((!noneOption && options.length > 0) || (noneOption && options.length > 1)) {
        return true;
      }

      return false;
    }, [noneOption, options]);

    const flatOptions = useMemo(() => {
      return options.flatMap((option) => option.options || option).filter((option) => option != null && option.label);
    }, [options]);

    const { refs, floatingStyles, calculatedHeight } = useFloat({
      shift: true,
      show: isOpen,
      flip: true,
      flipOffset: 10,
      placement: 'bottom-start',
      fallbackPlacements: ['top-start'],
      mainAxisOffset: { 'top-start': 14, 'bottom-start': 4 },
    });

    const flatIndex = useMemo(() => {
      const index = flatOptions.findIndex((item) => item.value === value);

      return index === -1 ? 0 : index; // If no item is found set index to 0 instead of -1
    }, [flatOptions, value]);

    const getValueOfOptionByIndex = useCallback((index: number) => flatOptions[index].value, [flatOptions]);
    const getIndexOfOptionByValue = (value: string) => flatOptions.findIndex((item) => item.value === value);

    const updateSelectedValue = useCallback(
      (newValue: SelectProps['value']) => {
        if (newValue) {
          if (multiple && Array.isArray(newValue)) {
            // For multiple type, explicitly cast to the multiple version of onValueChange
            (onValueChange as ((value: string[]) => void) | undefined)?.(newValue as string[]);
          } else {
            // For single type, explicitly cast to the single version of onValueChange
            (onValueChange as ((value: string) => void) | undefined)?.(newValue as string);
          }
        }
        newValue && setInternalSelectedValue(newValue);
      },
      [multiple, onValueChange, setInternalSelectedValue],
    );

    const onOpenSelect = useCallback(() => {
      setIsOpen(true);
      if (multiple) {
        valueBeforeOpen.current = value;
      } else {
        setActiveItemValue(getValueOfOptionByIndex(flatIndex));
        // value may not be initialized, so set noneOption if available
        valueBeforeOpen.current = value || noneOption?.value;
        if (!valueBeforeOpen.current && hasOptions) {
          // if neither value nor noneOption are set pick the first item from options
          valueBeforeOpen.current = options[0].value;
        }
      }
    }, [flatIndex, getValueOfOptionByIndex, hasOptions, multiple, noneOption?.value, options, value]);

    const onCloseSelect = useCallback(() => {
      setActiveItemValue(null);
      setIsOpen(false);
      if (multiple) {
        if (value.length === 0 && valueBeforeOpen.current?.length === 0) {
          return;
        }
        const optionsBefore = valueBeforeOpen.current;
        const optionsAfter = value;
        const changeHappend =
          typeof optionsBefore !== typeof optionsAfter ||
          (isString(optionsBefore) && isString(optionsAfter) && optionsBefore != optionsAfter) ||
          (Array.isArray(optionsBefore) && Array.isArray(optionsAfter) && !isEqual(optionsBefore, optionsAfter));

        changeHappend && onValueChangeFinished?.();
      }
    }, [multiple, onValueChangeFinished, value]);

    useEffect(() => {
      const closeOnClickOutside = (event: MouseEvent) => {
        if (isOpen && !outerRef.current?.contains(event.target as Node)) {
          onCloseSelect();
        }
      };

      document.addEventListener('click', closeOnClickOutside, { capture: true });

      return () => {
        document.removeEventListener('click', closeOnClickOutside, { capture: true });
      };
    }, [isOpen, onCloseSelect]);

    const toggleDropdown = useCallback(() => {
      if (!hasOptions || disabled) return;
      isOpen ? onCloseSelect() : onOpenSelect();
    }, [disabled, hasOptions, isOpen, onCloseSelect, onOpenSelect]);

    const onFocus = useCallback(() => {
      if (!alwaysOpenOnFocus || isOpen || shouldPreventToggleDropdownRef.current) return;
      toggleDropdown();
    }, [alwaysOpenOnFocus, isOpen, toggleDropdown]);

    const onMouseDown = () => {
      shouldPreventToggleDropdownRef.current = true;
    };

    const onMouseUp = () => {
      toggleDropdown();
      shouldPreventToggleDropdownRef.current = false;
    };

    const sortedIds = useMemo(() => options.map((option) => option.value), [options]);

    const onClickItem = useCallback(
      (option: SelectOptionProps) => {
        if (!multiple) {
          onCloseSelect();
          selectTriggerRef.current?.focus();
        }

        if (!onValueChange && isControlled) {
          return;
        }

        if (multiple) {
          const parsedVal = Array.isArray(value) ? value : [];
          let newValue;
          if (parsedVal.includes(option.value)) {
            newValue = parsedVal.filter((value) => value !== option.value);
          } else {
            // guarantee that value is in same order as options (importend for UX && valueChange event)
            newValue = [...parsedVal, option.value];
            newValue.sort((a, b) => sortedIds.indexOf(a) - sortedIds.indexOf(b));
          }
          updateSelectedValue(newValue);
        } else {
          const valueBefore = valueBeforeOpen.current;
          const valueAfter = option.value;
          const valueHasChanged = valueAfter !== valueBefore;
          valueHasChanged && updateSelectedValue(valueAfter);
        }
      },
      [multiple, onValueChange, isControlled, onCloseSelect, value, updateSelectedValue, sortedIds],
    );

    useEffect(() => {
      if (isOpen && selectTriggerRef.current) {
        selectTriggerRef.current.focus();
      }
    }, [isOpen, value]);

    const onBlur = (event: FocusEvent<HTMLDivElement>) => {
      if (event.currentTarget.contains(event.relatedTarget)) {
        return;
      }
      if (isOpen) {
        onCloseSelect();
      }
      setHasInputFocus(false);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const supressKeyEvent = () => {
        event.stopPropagation();
        event.preventDefault();
      };

      const { key, shiftKey } = event;
      if (hasOptions && !disabled) {
        // Navigation through open Select
        const lastItem = flatOptions.length - 1;
        switch (key) {
          case 'Tab':
            if (isOpen) {
              onCloseSelect();
            }

            return;

          case 'ArrowUp':
            supressKeyEvent();

            if (isOpen) {
              if (activeItemValue === null) {
                setActiveItemValue(getValueOfOptionByIndex(lastItem));
              } else {
                const currentIndex = getIndexOfOptionByValue(activeItemValue);
                const newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : lastItem;
                setActiveItemValue(getValueOfOptionByIndex(newIndex));
              }
            } else {
              if (shiftKey && !multiple) {
                if (flatIndex === 0 && flatOptions.length > 0) {
                  const lastOption = flatOptions.at(-1);
                  lastOption && updateSelectedValue(lastOption.value);
                } else {
                  updateSelectedValue(flatOptions[flatIndex - 1].value);
                }
              } else {
                onOpenSelect();
              }
            }
            break;

          case 'ArrowDown':
            supressKeyEvent();

            if (isOpen) {
              if (activeItemValue === null) {
                setActiveItemValue(getValueOfOptionByIndex(0));
              } else {
                const currentIndex = getIndexOfOptionByValue(activeItemValue);
                const newIndex = (currentIndex + 1) % flatOptions.length;
                setActiveItemValue(getValueOfOptionByIndex(newIndex));
              }
            } else {
              if (shiftKey && !multiple) {
                if (flatIndex >= flatOptions.length - 1) {
                  updateSelectedValue(flatOptions[0].value);
                } else if (flatIndex === -1) {
                  updateSelectedValue(flatOptions[1].value);
                } else {
                  updateSelectedValue(flatOptions[flatIndex + 1].value);
                }
              } else {
                onOpenSelect();
                !multiple && setActiveItemValue(getValueOfOptionByIndex(flatIndex));
              }
            }
            break;

          case 'Home':
            supressKeyEvent();
            isOpen && setActiveItemValue(getValueOfOptionByIndex(0));
            break;

          case 'End':
            supressKeyEvent();
            isOpen && setActiveItemValue(getValueOfOptionByIndex(flatOptions.length - 1));
            break;

          case 'Escape':
            supressKeyEvent();
            isOpen && onCloseSelect();
            break;

          case ' ':
          case 'Space':
          case 'Enter':
            supressKeyEvent();
            if (isOpen) {
              activeItemValue && onClickItem(flatOptions[getIndexOfOptionByValue(activeItemValue)]);
            } else {
              onOpenSelect();
            }
            break;

          default:
            return;
        }
      }
    };

    return (
      <SelectContext.Provider
        value={{
          activeItemValue,
          value,
          multiple: Boolean(multiple),
          setActiveItemValue,
          size,
        }}
      >
        <div ref={outerRef} data-cy="sf-select">
          <InputField
            size={size}
            hasInputFocus={isOpen || hasInputFocus}
            onFocus={onFocus}
            hasInputValue
            onBlur={onBlur}
            disabled={disabled || !hasOptions}
            setHtmlFor={false}
            hasButton={hasOptions}
            input={({ id, inputStyles, buttonStyles }) => (
              <>
                <input
                  ref={ref}
                  type="hidden"
                  value={multiple ? JSON.stringify(value) : value}
                  data-get-form-data-null-value
                  data-get-form-data-array={multiple ? true : undefined}
                  id={id}
                  name={name}
                  defaultValue={typeof defaultValue === 'string' && !value ? defaultValue : undefined}
                  spellCheck={false}
                  aria-label={ariaLabel}
                />

                <SelectTrigger
                  onKeyDown={onKeyDown}
                  options={options}
                  hasOptions={hasOptions}
                  disabled={disabled}
                  value={value}
                  noOptionSelectedText={_noOptionSelectedText}
                  multiple={multiple}
                  defaultValue={defaultValue}
                  ref={mergeRefs(selectTriggerRef, refs.setReference)}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  css={inputStyles}
                  noneOption={options[0]}
                  noOptionsAvailableText={noOptionsAvailableText}
                  id={id}
                />
                {hasOptions && (
                  <S.IconContainer css={buttonStyles}>
                    <S.IconWrapper open={isOpen}>
                      <Icon name="select-down" />
                    </S.IconWrapper>
                  </S.IconContainer>
                )}
                {isOpen && (
                  <S.ListWrapper
                    data-cy="sf-select-list"
                    ref={refs.setFloating}
                    style={{
                      ...floatingStyles,
                      ...(dropdownWidth === 'auto' && { width: outerRef.current?.clientWidth }),
                      ...(dropdownWidth === 'limited' && { minWidth: 150, maxWidth: 300 }),
                    }}
                  >
                    <Scroller>
                      <S.List style={{ maxHeight: `min(250px, ${calculatedHeight}px)` }}>
                        <SelectList
                          noneOption={noneOption}
                          flatOptions={flatOptions}
                          value={value}
                          onClickItem={onClickItem}
                          onClose={onCloseSelect}
                          options={options}
                        />
                      </S.List>
                    </Scroller>
                  </S.ListWrapper>
                )}
              </>
            )}
            {...otherProps}
          />
        </div>
      </SelectContext.Provider>
    );
  },
);
