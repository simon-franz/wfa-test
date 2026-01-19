import { stringifyDimension } from '@hrworks/sui-shared/functions/stringifyDimension';
import { PResizeObserver } from '@hrworks/sui-shared/polyfills/PResizeObserver';
import debounce from 'lodash/debounce';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { WaypointProps } from './Waypoint.types';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  passive?: boolean;
}

export const Waypoint = observer(
  ({ repeatOnEnter = true, rootMargin = '0px', onIntersection, onEnter, onExit, ...otherProps }: WaypointProps) => {
    const isIntersectingRef = useRef(false);
    const preventOnIntersection = useRef(false);
    const onIntersectionRef = useRef(onIntersection);
    const preventExitFromFiringOnMountRef = useRef(false);
    const targetRef = useRef<HTMLDivElement>(null);
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const scrollableParentRef = useRef<HTMLElement | null>(null);
    const scrollableParentHeightRef = useRef(0);
    const intersectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const rootMarginString = useMemo(() => {
      const rootMarginStr = '' + rootMargin;
      if (rootMargin == null || rootMarginStr.length < 1) return '0px';

      return rootMarginStr
        .split(' ')
        .map((side) => stringifyDimension(side))
        .join(' ');
    }, [rootMargin]);

    const getScrollParent = useCallback((node: HTMLElement): HTMLElement | null => {
      if (node === document.body || !node.parentNode) {
        return null;
      }
      const overflowY = window.getComputedStyle(node).overflowY;
      if (!/(hidden|visible)/.test(overflowY) && (node.hidden || node.scrollHeight > node.clientHeight)) {
        return node;
      }

      return getScrollParent(node.parentNode as HTMLElement);
    }, []);

    const unobserveAndDisconnectObserver = useCallback(() => {
      if (!targetRef.current) {
        return;
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.unobserve(targetRef.current);
        intersectionObserverRef.current.disconnect();
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(targetRef.current);
        resizeObserverRef.current.disconnect();
      }
      if (intersectionIntervalRef.current) {
        clearInterval(intersectionIntervalRef.current);
      }
    }, []);

    const startIntersectionInterval = useCallback(() => {
      if (intersectionIntervalRef.current) {
        clearInterval(intersectionIntervalRef.current);
      }
      intersectionIntervalRef.current = setInterval(() => {
        if (isIntersectingRef.current && onIntersectionRef.current) {
          onIntersectionRef.current();
        } else if (!isIntersectingRef.current || !onIntersectionRef.current) {
          clearInterval(intersectionIntervalRef.current!);
        }
      }, 1000);
    }, []);

    const handleIntersectionChange = useCallback(
      (isIntersecting: boolean) => {
        if (isIntersecting && !isIntersectingRef.current) {
          isIntersectingRef.current = true;
          onEnter?.();
          onIntersectionRef.current && startIntersectionInterval();
        } else if (!isIntersecting && isIntersectingRef.current) {
          isIntersectingRef.current = false;
          if (preventExitFromFiringOnMountRef.current) {
            onExit?.();
          }
          if (intersectionIntervalRef.current) {
            clearInterval(intersectionIntervalRef.current);
          }
        }

        preventExitFromFiringOnMountRef.current = true;
      },
      [onEnter, onExit, startIntersectionInterval],
    );

    const bindObserver = useCallback(
      (scrollableParentNode: HTMLElement | null) => {
        if (!targetRef.current) {
          return;
        }

        scrollableParentRef.current = scrollableParentNode;
        const intersectionOptions: IntersectionObserverOptions = {
          root: scrollableParentNode,
          rootMargin: rootMarginString,
          threshold: 0,
          passive: true,
        };

        intersectionObserverRef.current = new IntersectionObserver((entries) => {
          const isIntersecting = entries[0]?.isIntersecting;

          if (isIntersecting && !preventOnIntersection.current) {
            onIntersection?.();
            preventOnIntersection.current = true;
            // After one second it is allowed to fire again immediately
            setTimeout(() => {
              preventOnIntersection.current = false;
            }, 1000);
          }

          handleIntersectionChange(isIntersecting);

          if (!repeatOnEnter && isIntersecting) {
            intersectionObserverRef.current?.unobserve(targetRef.current!);
          }
        }, intersectionOptions);

        resizeObserverRef.current = new PResizeObserver(
          debounce((entries: ResizeObserverEntry[]) => {
            if (!entries[0]?.borderBoxSize) {
              return;
            }
            const height = entries[0].borderBoxSize[0].inlineSize;
            if (height !== scrollableParentHeightRef.current) {
              scrollableParentHeightRef.current = height;
            }
          }, 250),
        );

        intersectionObserverRef.current.observe(targetRef.current);
        resizeObserverRef.current.observe(targetRef.current);
      },
      [handleIntersectionChange, onIntersection, repeatOnEnter, rootMarginString],
    );

    useEffect(() => {
      if (targetRef.current) {
        bindObserver(getScrollParent(targetRef.current));
      }

      return () => {
        unobserveAndDisconnectObserver();
      };
    }, [getScrollParent, bindObserver, unobserveAndDisconnectObserver]);

    useEffect(() => {
      if (!targetRef.current) {
        return;
      }
      const scrollableParentNode = getScrollParent(targetRef.current);

      if (scrollableParentNode !== scrollableParentRef.current) {
        unobserveAndDisconnectObserver();
        bindObserver(scrollableParentNode);
      }

      return () => {
        unobserveAndDisconnectObserver();
      };
    }, [bindObserver, getScrollParent, repeatOnEnter, unobserveAndDisconnectObserver]);

    useEffect(() => {
      onIntersectionRef.current = onIntersection;
      if (isIntersectingRef.current) {
        if (onIntersection) {
          startIntersectionInterval();
        } else {
          clearInterval(intersectionIntervalRef.current!);
        }
      }
    }, [onIntersection, startIntersectionInterval]);

    return <div ref={targetRef} {...otherProps} />;
  },
);
