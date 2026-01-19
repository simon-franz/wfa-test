import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { useRef } from 'react';

type Ref<T> = T | undefined;

export const useDeepCompareMemoize = <T>(value: T): T => {
  const ref = useRef<Ref<T>>(undefined);

  if (!isEqual(value, ref.current)) {
    ref.current = cloneDeep(value);
  }

  return ref.current!;
};
