import { css, type SerializedStyles } from '@emotion/react';
import type { Breakpoint } from '@hrworks/types/shared/UiTypes';
import isObject from 'lodash/isObject';
import type { CSSProperties } from 'react';

import { mq, type screenSizeMediaQueries } from '../mediaQueries';

type CSSValue = CSSProperties[keyof CSSProperties];
type ResponsiveValue<T extends CSSValue> = T | Partial<Record<Breakpoint, T>>;

type GenerateResponsiveStylesParams<T, V extends CSSValue> = {
  value: ResponsiveValue<V>;
  theme?: T;
} & (
  | { cssProp: keyof CSSProperties; styleFn?: never }
  | {
      cssProp?: never;
      styleFn: (props: { value: V; theme?: T }) => SerializedStyles | undefined;
    }
);

export const generateResponsiveStyles = <T, V extends CSSValue>({
  value,
  theme,
  cssProp,
  styleFn,
}: GenerateResponsiveStylesParams<T, V>) => {
  if (isObject(value)) {
    return Object.entries(sortResponsiveObjectByKeys(value as Record<Breakpoint, V>)).map(([breakpoint, _value]) =>
      css({
        [mq[`>=${breakpoint}` as keyof typeof screenSizeMediaQueries]]: {
          ...(cssProp ? { [cssProp]: _value } : styleFn({ value: _value, theme })),
        },
      }),
    );
  }

  return cssProp ? css({ [cssProp]: value }) : styleFn({ value: value, theme });
};

const sortResponsiveObjectByKeys = <T extends Record<Breakpoint, CSSProperties[keyof CSSProperties]>>(obj: T): T => {
  const order: (keyof T)[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const sortedObject = {} as T;
  order.forEach((breakpoint) => {
    if (breakpoint in obj) {
      sortedObject[breakpoint] = obj[breakpoint];
    }
  });

  return sortedObject;
};
