import { useState, useCallback, useRef, useEffect } from 'react';

interface UseContextInputOptions {
  value: string;
  onChange: (value: string) => void;
  onOpenContextPanel?: () => void;
}

export function useContextInput({ value, onChange, onOpenContextPanel }: UseContextInputOptions) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const handleFocus = useCallback(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
    onOpenContextPanel?.();
  }, [onOpenContextPanel]);

  const insertVariable = useCallback(
    (variable: string) => {
      if (!inputRef.current) return;

      const start = cursorPosition;
      const end = cursorPosition;
      const newValue = value.substring(0, start) + variable + value.substring(end);

      onChange(newValue);

      // Set cursor position after the inserted variable
      setTimeout(() => {
        if (inputRef.current) {
          const newPosition = start + variable.length;
          inputRef.current.setSelectionRange(newPosition, newPosition);
          inputRef.current.focus();
        }
      }, 0);
    },
    [value, onChange, cursorPosition],
  );

  return {
    inputRef,
    handleFocus,
    handleClick,
    insertVariable,
  };
}
