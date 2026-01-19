import type { HexColor } from '@hrworks/types/shared/UiTypes';

/**
 * Calculates the brightness of a color based on its hex code.
 *
 * @param {string} color - The hex color code of the color.
 * @returns {number} Value representing the brightness of the color, ranging from 0 (darkest) to 255 (brightest).
 */

export const getBrightness = (color: HexColor): number => {
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness;
};
