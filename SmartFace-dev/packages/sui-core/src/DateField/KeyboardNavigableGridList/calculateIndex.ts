const calculateNormalizedIndex = (index: number, nextOffset: number, max: number, _columns: number) => {
  const newIndex = index + nextOffset;

  if (newIndex > max) {
    return newIndex % (max + 1);
  } else if (newIndex < 0) {
    return newIndex + max + 1;
  }

  return newIndex;
};

export const calculateIndex = (index: number, nextOffset: number, min: number, max: number, columns: number) => {
  const newIndex = calculateNormalizedIndex(index - min, nextOffset, max - min, columns);

  return newIndex + min;
};
