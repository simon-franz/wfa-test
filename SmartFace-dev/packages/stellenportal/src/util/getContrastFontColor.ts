/**
 * Determines the best contrasting font color (black or white) for a given background color
 * @param backgroundColor - Hex color code (e.g., '#FFFFFF', '#000000', '#3A86FF')
 * @returns '#000000' for dark text or '#FFFFFF' for light text
 */
export function getContrastFontColor(backgroundColor: string): string {
  // Remove the hash if it exists
  const hex = backgroundColor.replace('#', '');

  // Handle both 3-digit and 6-digit hex codes
  const r = Number.parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);

  // Calculate perceived brightness using the numeric representation of the color
  // Using the relative luminance formula (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return white for dark backgrounds, black for light backgrounds
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
