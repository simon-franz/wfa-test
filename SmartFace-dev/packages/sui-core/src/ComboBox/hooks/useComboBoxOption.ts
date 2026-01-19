import { useCallback, useContext, useMemo } from 'react';

import { HeadlessComboBoxContext, type HeadlessComboBoxOption } from '../';

type UseComboBoxOptionReturn = {
  active: boolean;
  multiple: boolean;
  query: string;
  selected: boolean;
  onClick(): void;
  onMouseMove(): void;
};

export const useComboBoxOption = (option: HeadlessComboBoxOption, index: number): UseComboBoxOptionReturn => {
  const { activeItemIndex, multiple, query, isSelected, select, setActiveItemIndex } =
    useContext(HeadlessComboBoxContext);

  // Select the option
  const onClick = useCallback(() => select(option), [option, select]);

  // Is keyboard navigated or mouseover. active !== selected
  const active = useMemo(() => index === activeItemIndex, [activeItemIndex, index]);

  // Setting the option active if not already
  const onMouseMove = useCallback(() => {
    !active && setActiveItemIndex(index);
  }, [active, index, setActiveItemIndex]);

  return { active, multiple, query, selected: isSelected(option.id), onClick, onMouseMove };
};
