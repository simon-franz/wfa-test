import { type RefObject, useEffect, useState } from 'react';

type DimensionObject = {
  width: number;
  height: number;
};

export const useElementDimensions = (ref: RefObject<HTMLElement | null>): DimensionObject => {
  const [dimensions, setDimensions] = useState<DimensionObject>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return dimensions;
};
