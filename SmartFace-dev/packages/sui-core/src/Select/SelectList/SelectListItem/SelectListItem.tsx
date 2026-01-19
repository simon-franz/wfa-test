import { forwardRef, useContext, useMemo } from 'react';

import FontAwesomeIcon from '../../../FontAwesomeIcon';
import { SelectContext } from '../../SelectContext';
import { SelectList } from '../../SelectList/SelectList';
import { S } from './SelectListItem.styles';
import type { SelectListItemProps } from './SelectListItem.types';

export const SelectListItem = forwardRef<HTMLLIElement, SelectListItemProps>(
  ({ noneOption, option, onClickItem, onClose, value, flatOptions, ...otherProps }, ref) => {
    const { setActiveItemValue, activeItemValue, size, multiple } = useContext(SelectContext);
    const isSelected = useMemo(() => {
      if (!value && noneOption && option.value === noneOption.value) {
        return true;
      }

      return value?.includes(option.value);
    }, [noneOption, option.value, value]);

    if ((multiple && option.value === noneOption?.value) || !option.label) {
      return null;
    }

    if (option.options) {
      return (
        <>
          <S.GroupLabel tabIndex={-1}>{option.label}</S.GroupLabel>
          <SelectList
            flatOptions={flatOptions}
            value={value}
            options={option.options}
            onClickItem={onClickItem}
            onClose={onClose}
          />
        </>
      );
    }

    return (
      <S.Item
        size={size}
        tabIndex={-1}
        key={option.value}
        ref={ref}
        onClick={() => onClickItem(option)}
        onMouseEnter={() => setActiveItemValue(option.value)}
        onMouseLeave={() => setActiveItemValue(null)}
        onFocus={() => setActiveItemValue(option.value)}
        {...otherProps}
      >
        <S.ItemContainer active={activeItemValue === option.value}>
          <S.Description>
            {multiple && <S.Checkbox name="" checked={isSelected} tabIndex={-1} aria-label={option.label} />}
            {option.media && <S.MediaWrapper>{option.media}</S.MediaWrapper>}
            {option.label}
          </S.Description>
          {isSelected && !multiple && <FontAwesomeIcon name="check" />}
        </S.ItemContainer>
      </S.Item>
    );
  },
);
