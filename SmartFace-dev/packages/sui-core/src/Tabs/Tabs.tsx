import { observer } from 'mobx-react';
import { useCallback, useId, useMemo } from 'react';

import { S } from './Tabs.styles';
import type { TabsProps } from './Tabs.types';
import { TabsContext } from './TabsContext';
import { useTabState } from './useTabState';

export const Tabs = observer(
  ({
    children,
    selectedItemId,
    defaultSelectedItemId,
    updateSelectedItemId,
    fullHeight,
    contentGap = 'default',
    ...otherProps
  }: TabsProps) => {
    const indicatorId = useId();

    const { activeId, isControlled, setInternalSelectedId } = useTabState(selectedItemId, defaultSelectedItemId);

    const isSelected = useCallback((id?: string) => activeId === id, [activeId]);

    const _updateSelectedItemId = useCallback(
      (id: string) => {
        isControlled && updateSelectedItemId?.(id);
        setInternalSelectedId(id);
      },
      [isControlled, updateSelectedItemId, setInternalSelectedId],
    );

    const contextValue = useMemo(
      () => ({
        isSelected,
        updateSelectedItemId: _updateSelectedItemId,
        selectedItemId: activeId,
        indicatorId,
        fullHeight,
      }),
      [isSelected, _updateSelectedItemId, activeId, indicatorId, fullHeight],
    );

    return (
      <S.Tabs fullHeight={fullHeight} contentGap={contentGap} {...otherProps}>
        <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
      </S.Tabs>
    );
  },
);
