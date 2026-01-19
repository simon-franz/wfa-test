import { observer } from 'mobx-react';
import { type HTMLAttributes, type ReactNode, useContext, useEffect, useId, useRef } from 'react';
import { tabbable } from 'tabbable';

import { KeyboardNavigableListContext } from '../KeyboardNavigableListContext';
import { S } from './KeyboardNavigableListSublist.styles';

type KeyboardNavigableListSublistPropsType = {
  children: (renderFunctionProps: { isOpen: boolean }) => ReactNode;
} & Omit<HTMLAttributes<HTMLUListElement>, 'children'>;

export const KeyboardNavigableListSublist = observer(
  ({ id: _id, children, ...otherProps }: KeyboardNavigableListSublistPropsType) => {
    const { openedSublists } = useContext(KeyboardNavigableListContext);
    const ref = useRef<HTMLUListElement>(null);
    const generatedId = useId();
    const id = _id || generatedId;
    useEffect(() => {
      const isOpen = openedSublists.includes(id);
      const tabbableNodes = tabbable(ref.current!);
      if (isOpen) {
        for (const node of tabbableNodes) {
          node.tabIndex = node.dataset.tabIndex as any;
        }
      } else {
        for (const node of tabbableNodes) {
          node.dataset.tabIndex = node.tabIndex as any;
          node.tabIndex = -1;
        }
      }
    }, [id, openedSublists, ref]);

    return (
      <S.SubList ref={ref} data-keyboard-navigable-list-sublist={id} {...otherProps}>
        {children({ isOpen: openedSublists.includes(id) })}
      </S.SubList>
    );
  },
);
