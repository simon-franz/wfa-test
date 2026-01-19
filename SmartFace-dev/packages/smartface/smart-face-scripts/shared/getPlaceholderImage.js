/**
 * Get placeholder-image with dimensions from external service that currently works
 * @param {number} width
 * @param {number} height
 * @return {string}
 */
export const getPlaceholderImage = (width = 200, height = 200) => {
  return `https://placedog.net/${width}/${height}`;
  // return `https://placebear.com/${width}/${height}`;
};
