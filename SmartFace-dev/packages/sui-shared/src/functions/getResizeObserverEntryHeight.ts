export const getResizeObserverEntryHeight = (entry: ResizeObserverEntry): number => {
  const blockSize = entry.borderBoxSize?.[0]?.blockSize;

  return blockSize == null ? entry.target?.getBoundingClientRect().height : blockSize;
};
