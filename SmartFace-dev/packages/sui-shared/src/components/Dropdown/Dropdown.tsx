import { useEffect, useState } from 'react';

import { useFloat } from '../Float/useFloat';
import type { DropdownProps } from './Dropdown.types';
import { DropdownContext } from './DropdownContext';

export const Dropdown = ({ placement = 'bottom', ...otherProps }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, arrowStyles, arrowRef } = useFloat({
    placement,
    arrow: true,
    flip: true,
    shift: true,
    mainAxisOffset: 10,
    show: isOpen,
    scroll: false,
  });

  useEffect(() => {
    const onEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !event.repeat) {
        event.stopPropagation();
        setIsOpen(false);
      }
    };

    const onClickOutside = (event: MouseEvent | FocusEvent | UIEvent) => {
      if (
        refs.floating.current &&
        refs.reference.current &&
        !refs.floating.current.contains(event.target as HTMLElement) &&
        !refs.reference.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [isOpen, refs.floating, refs.reference]);

  return (
    <DropdownContext.Provider
      value={{
        setReference: refs.setReference,
        setFloating: refs.setFloating,
        arrowRef,
        arrowStyles,
        floatingStyles,
        isOpen,
        setIsOpen,
      }}
    >
      <div {...otherProps} />
    </DropdownContext.Provider>
  );
};
