import { useEffect, useRef } from 'react';

import type { UseResizeableTextareaProps } from './useResizeableTextarea.types';

export const useResizableTextarea = ({
  textareaRef,
  growsWithContent,
  resize,
  rows,
  value,
}: UseResizeableTextareaProps) => {
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Reset height when rows change
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
  }, [textareaRef, rows]);

  // Configure resize behavior based on growsWithContent prop
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (growsWithContent) {
      textarea.style.height = 'auto';
      textarea.style.overflow = 'hidden';
      textarea.style.resize = 'none';
    } else {
      textarea.style.height = 'auto';
      textarea.style.overflow = 'auto';
      textarea.style.resize = resize;
    }
  }, [textareaRef, growsWithContent, resize]);

  // Handle auto-resizing when content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !growsWithContent) return;

    const setTextareaHeight = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    };

    // ResizeObserver detects when textarea content changes and triggers auto-resize
    // to match the content height. requestAnimationFrame prevents rapid DOM updates
    // that could cause ResizeObserver loops.
    resizeObserverRef.current = new ResizeObserver(setTextareaHeight);
    resizeObserverRef.current.observe(textarea);
    setTextareaHeight();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      resizeObserverRef.current?.disconnect();
    };
  }, [textareaRef, value, growsWithContent]);
};
