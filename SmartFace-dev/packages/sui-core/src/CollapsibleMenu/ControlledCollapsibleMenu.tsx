import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { ControlledCollapsibleMenuProps } from './CollapsibleMenu.types';
import { S } from './ControlledCollapsibleMenu.styles';
import {
  ControlledCollapsibleMenuContext,
  type ControlledCollapsibleMenuContextProps,
} from './ControlledCollapsibleMenuContext';

export const ControlledCollapsibleMenu = observer(
  ({
    children,
    activeEntryId,
    expandedEntryIds,
    updateExpandedEntryIds,
    updateActiveEntryId,
    multiple,
    showDepthIndicator,
    ...otherProps
  }: ControlledCollapsibleMenuProps) => {
    const isActive = useMemo(
      () => (itemId: string) => {
        return Boolean(activeEntryId === itemId);
      },
      [activeEntryId],
    );

    const isExpanded = useMemo(
      () => (itemId: string) => {
        return Boolean(expandedEntryIds?.includes(itemId));
      },
      [expandedEntryIds],
    );

    const expand = useCallback(
      (newExpandedEntryIds: Array<string>) => {
        if (multiple) {
          // Add only the new IDs to the existing expanded IDs
          updateExpandedEntryIds([...new Set([...expandedEntryIds, ...newExpandedEntryIds])]);
        } else {
          // Keep the existing behavior for single open
          updateExpandedEntryIds(newExpandedEntryIds);
        }
      },
      [multiple, expandedEntryIds, updateExpandedEntryIds],
    );

    const collapse = useCallback(
      (itemId: string) => {
        const newExpandedEntryIds = expandedEntryIds.filter((expandedEntryId) => {
          // Remove the collapsed item and its children
          return expandedEntryId !== itemId;
        });
        updateExpandedEntryIds(newExpandedEntryIds);
      },
      [expandedEntryIds, updateExpandedEntryIds],
    );

    // Skip on first render
    const isFirstRender = useRef(true);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;

        return;
      }
      // If multiple gets changed to false and multiple submenus are open close them
      if (!multiple && expandedEntryIds.length > 1) {
        updateExpandedEntryIds([]);
      }
      // We only want this to fire once multiple changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiple]);

    const contextValue = useMemo<ControlledCollapsibleMenuContextProps>(
      () => ({
        isActive,
        isExpanded,
        expand,
        collapse,
        updateActiveEntryId,
        isParentExpanded: true,
        multiple,
      }),
      [collapse, expand, isActive, isExpanded, updateActiveEntryId, multiple],
    );

    return (
      <S.Container data-showcollapsiblemenudepthindicator={showDepthIndicator} {...otherProps}>
        <ControlledCollapsibleMenuContext.Provider value={contextValue}>
          {children}
        </ControlledCollapsibleMenuContext.Provider>
      </S.Container>
    );
  },
);
