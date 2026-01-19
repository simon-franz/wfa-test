import { useContext, useEffect, useRef } from 'react';

import { SelectContext } from '../SelectContext';
import type { SelectListProps } from './SelectList.types';
import { SelectListItem } from './SelectListItem/SelectListItem';

export const SelectList = ({ noneOption, options, onClickItem, value, flatOptions, onClose }: SelectListProps) => {
  const { activeItemValue } = useContext(SelectContext);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const isEdgeItem =
      flatOptions.length > 0 &&
      (flatOptions[0].value === activeItemValue || flatOptions.at(-1)?.value === activeItemValue);

    activeItemRef.current?.scrollIntoView({
      block: isEdgeItem ? 'center' : 'nearest',
    });
  }, [activeItemValue, flatOptions]);

  return (
    <>
      {options.map((option, index) => (
        <SelectListItem
          ref={option.value === activeItemValue ? activeItemRef : null}
          key={option.value}
          onClose={onClose}
          noneOption={noneOption}
          value={value}
          onClickItem={onClickItem}
          option={option}
          index={index}
          flatOptions={flatOptions}
        />
      ))}
    </>
  );
};
