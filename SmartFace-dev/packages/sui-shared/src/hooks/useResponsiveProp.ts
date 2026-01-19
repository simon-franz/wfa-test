import { mq, type screenSizeMediaQueries } from '@hrworks/design-system/mediaQueries';
import type { Breakpoint } from '@hrworks/types/shared/UiTypes';
import isObject from 'lodash/isObject';
import { useEffect, useState } from 'react';

const BREAKPOINT_ORDER: readonly Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'] as const;

/**
 * A hook that returns a responsive value based on the current breakpoint,
 * or returns the input value if it's not an object with breakpoints.
 *
 * @template T - The type of the value to be returned.
 * @param input - An object defining values for different breakpoints or a simple value.
 * @returns The value for the current breakpoint, the simple input value, or undefined if no matching value is found.
 *
 * @example
 * // Usage with breakpoints:
 * const padding = useResponsiveProp({
 *   xs: '14px',
 *   sm: '16px',
 *   md: '18px',
 *   lg: '20px'
 * });
 *
 * // Usage with a simple value:
 * const padding = useResponsiveProp('10px');
 *
 * // In a component:
 * return <div style={{ fontSize, padding }}>Responsive Text</div>;
 */
export const useResponsiveProp = <T>(input: T | Partial<Record<Breakpoint, T>>): T | undefined => {
  const isObjectInput = isObject(input);

  const [value, setValue] = useState<T | undefined>(() => {
    if (!isObjectInput) {
      return input;
    }

    return;
  });

  useEffect(() => {
    const relevantBreakpoints = isObjectInput ? BREAKPOINT_ORDER.filter((breakpoint) => breakpoint in input) : [];
    const getResponsiveValue = (mediaQueries: Record<string, MediaQueryList>) => {
      if (!isObjectInput) {
        return input;
      }

      for (const breakpoint of relevantBreakpoints) {
        const mediaQuery = mediaQueries[`>=${breakpoint}`];
        if (mediaQuery?.matches) {
          return input[breakpoint];
        }
      }

      return;
    };

    if (!isObjectInput) {
      setValue(input);

      return;
    }

    const mediaQueries: Record<string, MediaQueryList> = {};
    relevantBreakpoints.forEach((breakpoint) => {
      const query = mq[`>=${breakpoint}` as keyof typeof screenSizeMediaQueries].slice(7);
      mediaQueries[`>=${breakpoint}`] = window.matchMedia(query);
    });

    const updateValue = () => setValue(getResponsiveValue(mediaQueries));
    updateValue();

    Object.values(mediaQueries).forEach((mq) => {
      mq.addEventListener('change', updateValue);
    });

    return () => {
      Object.values(mediaQueries).forEach((mq) => {
        mq.removeEventListener('change', updateValue);
      });
    };
  }, [input, isObjectInput]);

  return value;
};
