import { useFloat } from '@hrworks/sui-shared/components/Float/useFloat';
import { observer } from 'mobx-react';
import { useRef } from 'react';

import { ComboBoxInput, ComboBoxList } from '..';
import { S } from './DropdownComboBox.styles';
import type { DropdownComboBoxProps } from './DropdownComboBox.types';

export const DropdownComboBox = observer(
  ({
    currentCache,
    getResult,
    open,
    shouldGetResult,
    inputProps,
    size = 'medium',
    getResultMinLength,
    isDropdown,
    ...otherProps
  }: DropdownComboBoxProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const {
      refs,
      floatingStyles,
      calculatedHeight = 0,
    } = useFloat({
      placement: 'bottom-start',
      fallbackPlacements: ['top-start'],
      show: open && shouldGetResult,
      flip: true,
      scroll: true,
    });

    return (
      <>
        <div ref={wrapperRef} {...otherProps}>
          <ComboBoxInput
            ref={refs.setReference}
            refs={[containerRef, wrapperRef]}
            size={size}
            isDropdown={isDropdown}
            getResultMinLength={getResultMinLength}
            {...inputProps}
          />
        </div>
        {open && shouldGetResult && (
          <div ref={refs.setFloating} style={{ ...floatingStyles, width: wrapperRef.current?.clientWidth }}>
            <S.Scroller
              tabIndex={-1}
              ref={containerRef}
              style={{ maxHeight: calculatedHeight - S.componentConfig.maxHeightOffset }}
            >
              <ComboBoxList containerRef={containerRef} currentCache={currentCache} loadMore={getResult} size={size} />
            </S.Scroller>
          </div>
        )}
      </>
    );
  },
);
