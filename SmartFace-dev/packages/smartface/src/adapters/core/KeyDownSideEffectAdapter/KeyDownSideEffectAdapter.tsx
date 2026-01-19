import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { KeyDownSideEffectAdapterPropsType } from '../../../types/core/KeyDownSideEffectType';

const isInputElement = (element: HTMLElement): boolean => element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';

export const KeyDownSideEffectAdapter = observer(({ shortcut, onKeyDown }: KeyDownSideEffectAdapterPropsType) => {
  const { applyEvents } = useContext(SmartFaceContext);

  useEffect(() => {
    const keyDownHandler = async (event: KeyboardEvent) => {
      if (!shortcut || !shortcut.key || !onKeyDown || event.repeat || isInputElement(event.target as HTMLElement)) {
        return; // Ignore keydown events in input fields
      }

      const { key, ctrlKey = false, altKey = false, shiftKey = false, metaKey = false } = shortcut;

      const isModifierMatching =
        event.ctrlKey === ctrlKey &&
        event.altKey === altKey &&
        event.shiftKey === shiftKey &&
        event.metaKey === metaKey;

      if (event.key === key && isModifierMatching) {
        event.preventDefault();
        applyEvents(onKeyDown);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [shortcut, onKeyDown, applyEvents]);

  return null;
});
