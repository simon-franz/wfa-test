import { observer } from 'mobx-react';
import { useEffect, useRef } from 'react';

import { ComboBoxInput, ComboBoxList } from '../';
import { S } from './ModalComboBox.styles';
import type { ModalComboBoxProps } from './ModalComboBox.types';

export const ModalComboBox = observer(
  ({ currentCache, getResult, open, setOpen, inputProps, size = 'medium', ...otherProps }: ModalComboBoxProps) => {
    const { label, placeholder } = inputProps;
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      open && queueMicrotask(() => inputRef.current?.focus());
    }, [open]);

    return (
      <>
        <ComboBoxInput noBlur={open} refs={[]} label={label} placeholder={placeholder} size={size} {...inputProps} />
        <S.Modal title={label || placeholder} closeable onClose={() => setOpen(false)} show={open} {...otherProps}>
          <ComboBoxInput
            noBlur
            ref={inputRef}
            refs={[containerRef]}
            placeholder={placeholder}
            size={size}
            {...inputProps}
          />
          <S.StyledScroller ref={containerRef}>
            <ComboBoxList containerRef={containerRef} currentCache={currentCache} loadMore={getResult} size={size} />
          </S.StyledScroller>
        </S.Modal>
      </>
    );
  },
);
