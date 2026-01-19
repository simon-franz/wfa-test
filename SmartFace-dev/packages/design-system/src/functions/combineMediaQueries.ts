type MediaQuery = `@media${string}`;

export const combineMediaQueries = (mediaQueries: Array<MediaQuery>) => {
  let combinedMediaQuery = '@media ';
  mediaQueries.forEach((mediaQuery) => {
    combinedMediaQuery += mediaQuery.slice(7) + ' and ';
  });

  return combinedMediaQuery.slice(0, -5);
};
