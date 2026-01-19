export function stringifyDimension(value: number | string): string {
  return typeof value === 'number' || /\d$/.test(value) ? `${value}px` : value;
}
