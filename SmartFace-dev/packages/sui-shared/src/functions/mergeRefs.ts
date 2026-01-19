import type { Ref } from 'react';

export const mergeRefs = <T>(...refs: Array<Ref<T | null> | undefined>) => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        ref.current = node;
      }
    });
  };
};
