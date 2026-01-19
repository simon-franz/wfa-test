import { useTheme } from '@emotion/react';
import extractNumbersFromString from '@hrworks/sui-shared/functions/extractNumbersFromString';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext, useEffect, useState } from 'react';

import { TabsContext } from '../TabsContext';
import { S } from './Tab.styles';
import type { TabProps } from './Tab.types';

export const Tab = observer(
  ({
    children,
    id,
    href,
    target,
    preventInitialSelect,
    preventSelect,
    onBeforeInitialSelect,
    onBeforeSelect,
    onAfterInitialSelect,
    onAfterSelect,
    onDeselect,
    color = 'primary',
    onClick,
    ...otherProps
  }: TabProps) => {
    const { isSelected, updateSelectedItemId, indicatorId } = useContext(TabsContext);
    const [initialSelectCallbackFired, setInitialSelectCallbackFired] = useState(false);
    const [dirtySelected, setDirtySelected] = useState(false);
    const [itemIsSelected, setItemIsSelected] = useState(isSelected(id));
    const [transitionDuration, setTransitionDuration] = useState(0);
    const animationDuration = Number(extractNumbersFromString(useTheme().marko.variables.animationDuration.long));

    const onTabClick = async (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      setTransitionDuration(animationDuration); //Fixes a visual bug related to framer-motion when using tabs in modals, see FE-1839 on Jira
      if (onBeforeInitialSelect || onBeforeSelect || onAfterInitialSelect || onAfterSelect) {
        event.preventDefault();
      }

      if (!itemIsSelected && isSelected(id)) {
        setItemIsSelected(true);
      }

      let prevent: boolean;
      if (itemIsSelected) {
        event.stopPropagation();
        id && updateSelectedItemId?.(id);
      } else {
        if (initialSelectCallbackFired) {
          await onBeforeSelect?.();
          prevent = Boolean(preventSelect);
        } else {
          onBeforeInitialSelect ? await onBeforeInitialSelect() : await onBeforeSelect?.();
          prevent = preventInitialSelect == null ? Boolean(preventSelect) : preventInitialSelect;
        }
        if (!prevent) {
          event.stopPropagation();
          id && updateSelectedItemId?.(id);
        }
      }
    };

    useEffect(() => {
      setItemIsSelected(isSelected(id));
    }, [id, isSelected]);

    useEffect(() => {
      if (itemIsSelected) {
        if (!initialSelectCallbackFired) {
          setDirtySelected(true);
          setInitialSelectCallbackFired(true);
          onAfterInitialSelect ? onAfterInitialSelect() : onAfterSelect && onAfterSelect();
        } else if (!dirtySelected) {
          setDirtySelected(true);
          onAfterSelect?.();
        }
      } else if (dirtySelected) {
        setDirtySelected(false);
        onDeselect?.();
      }
    }, [dirtySelected, initialSelectCallbackFired, onAfterInitialSelect, onAfterSelect, onDeselect, itemIsSelected]);

    return (
      <S.Tab id={id} key={id} {...otherProps}>
        <S.TabButton
          variant="subtle"
          onClick={onTabClick}
          role="tab"
          $selected={itemIsSelected}
          color={color}
          aria-selected={itemIsSelected}
          href={href}
          target={target}
        >
          {children}
        </S.TabButton>
        {!!itemIsSelected && <S.IndicatorLine layoutId={indicatorId} transition={{ duration: transitionDuration }} />}
      </S.Tab>
    );
  },
);
