import { thresholds } from '@hrworks/sui-extension/PanelGroup/PanelGroupItem/PanelGroupItem';
import type { Size } from '@hrworks/types/shared/UiTypes';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseHotkeyTogglePanelSizeProps = {
  initialPanelSize: number;
  threshold?: Size;
  toggleHotkey?: string;
};

export const useHotkeyTogglePanelSize = ({
  initialPanelSize,
  threshold = 'extraSmall',
  toggleHotkey = 'F9',
}: UseHotkeyTogglePanelSizeProps) => {
  const localStorageKey = 'adapterbook-panel-size';
  const _threshold = 100 - thresholds[threshold];

  const getSavedPanelSize = (): number => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (!saved) {
        return initialPanelSize;
      }

      return Number.parseFloat(saved);
    } catch {
      return initialPanelSize;
    }
  };

  const savePanelSize = useCallback((size: number) => {
    try {
      localStorage.setItem(localStorageKey, size.toString());
    } catch {
      console.error('no local storage available');
    }
  }, []);

  const [componentPanelSize, setComponentPanelSize] = useState(() => getSavedPanelSize());
  const [lastPanelSizeState, setLastPanelSize] = useState(componentPanelSize);
  const currentPanelSizeRef = useRef(componentPanelSize);
  const [open, setOpen] = useState(componentPanelSize < _threshold);

  const togglePanelSize = useCallback(() => {
    if (open) {
      // Right panel is closed.
      if (currentPanelSizeRef.current >= _threshold) {
        // HACK: In the future the PanelGroup needs to provide a hasDraggingEnded function/event so we can properly set the correct panel-size.
        // The current implementation simulates the behaviour in the a dirty and incomplete way. Sem says its ok :) (for now)
        setComponentPanelSize(componentPanelSize === lastPanelSizeState ? componentPanelSize - 1 : lastPanelSizeState);
      } else {
        // Closing Right Panel
        setOpen(false);
        setLastPanelSize(currentPanelSizeRef.current);
        setComponentPanelSize(componentPanelSize === 100 ? 99 : 100);
      }
    } else {
      // Expand the right panelgroup item if to its last saved value.
      setOpen(true);
      if (lastPanelSizeState < _threshold) {
        setComponentPanelSize(componentPanelSize === lastPanelSizeState ? componentPanelSize - 1 : lastPanelSizeState);
      } else {
        setComponentPanelSize(initialPanelSize);
      }
    }
  }, [_threshold, componentPanelSize, initialPanelSize, lastPanelSizeState, open]);

  useEffect(() => {
    const onHotkeyPress = (event: KeyboardEvent) => {
      if (event.key === toggleHotkey) {
        event.preventDefault();
        togglePanelSize();
      }
    };

    window.addEventListener('keydown', onHotkeyPress);

    return () => {
      window.removeEventListener('keydown', onHotkeyPress);
    };
  }, [togglePanelSize, toggleHotkey, open]);

  const onPanelResize = (newSize: number) => {
    currentPanelSizeRef.current = newSize;
    setOpen(newSize < _threshold);
    savePanelSize(newSize);
  };

  return { componentPanelSize, onPanelResize, togglePanelSize };
};
