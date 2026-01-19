import { observer } from 'mobx-react';
import {
  type FocusEvent,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { tabbable } from 'tabbable';

import { queueMacrotask } from '../../../functions/queueMacrotask';
import { KeyboardNavigableListContext } from '../KeyboardNavigableListContext';
import { S } from './KeyboardNavigableListItem.styles';
// configure({ enforceActions: 'never' });
export type ItemPropsType = {
  preserveFocus?: boolean;
  selectOnHover?: boolean;
  item: (renderFunctionProps: { focus: boolean; sublistOpen: boolean }) => ReactNode;
  sublist?: (renderFunctionProps: { focus: boolean; sublistOpen: boolean }) => ReactNode | undefined;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const KeyboardNavigableListItem = observer(
  ({ id: _id, onKeyDown, onFocus, item, sublist, onBlur, preserveFocus, ...otherProps }: ItemPropsType) => {
    const { selectedItem, openedSublists, listMap, setSelectedItem } = useContext(KeyboardNavigableListContext);
    const [hover, setHover] = useState(false);
    const generatedId = useId();
    const id = _id || generatedId;
    const divRef = useRef<HTMLDivElement>(null);

    const shouldGetSelectedByHover = useMemo(() => window.sfLastEventType === 'pointer' && hover, [hover]);

    const isItemSelected = useMemo(() => selectedItem?.id === id, [id, selectedItem?.id]);

    const isParentOfSelectedItem = useMemo(
      () => Boolean(selectedItem?.path.some(({ id: itemId }) => itemId === id)),
      [selectedItem?.path, id],
    );

    const isSublistOpened = useMemo(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      () => openedSublists.includes(listMap.get(id)?.sublistId!),
      [id, listMap, openedSublists],
    );

    const getChildElement = () =>
      divRef.current!.querySelector('a, button, [role="button"], [data-keyboard-navigable-list-item-child]') as
        | HTMLButtonElement
        | HTMLAnchorElement
        | null;

    const _onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        getChildElement()?.click();
      }
      onKeyDown && onKeyDown(event);
    };

    const _onFocus = (event: FocusEvent<HTMLDivElement>) => {
      setSelectedItem(id);
      onFocus && onFocus(event);
    };

    useEffect(() => {
      if (shouldGetSelectedByHover) {
        setSelectedItem(id);
      }
      if (!preserveFocus) {
        const tabbableNodes = tabbable(divRef.current!);
        for (const node of tabbableNodes) {
          node.tabIndex = -1;
        }

        divRef.current!.tabIndex = 0;

        if (isItemSelected) {
          divRef.current!.focus();
        } else {
          divRef.current!.blur();
        }
      }
      if (isItemSelected && window.sfLastEventType === 'keyboard') {
        queueMacrotask(() => divRef.current?.scrollIntoView({ block: 'nearest' }));
      }
    }, [id, isItemSelected, preserveFocus, setSelectedItem, shouldGetSelectedByHover]);

    return (
      <S.Item data-keyboard-navigable-list-item={id}>
        <div
          ref={divRef}
          onKeyDown={_onKeyDown}
          onFocus={_onFocus}
          onBlur={onBlur}
          onMouseEnter={() => setSelectedItem(id)}
          onMouseLeave={() => setHover(false)}
          {...otherProps}
        >
          {item({
            focus: isItemSelected,
            sublistOpen: isParentOfSelectedItem,
          })}
        </div>
        {sublist &&
          sublist({
            focus: isItemSelected,
            sublistOpen: isSublistOpened,
          })}
      </S.Item>
    );
  },
);
