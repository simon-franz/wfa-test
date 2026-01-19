import type { Breakpoint } from '@hrworks/types/shared/UiTypes';

export const screenSizes: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const screenSizeMediaQueries = {
  '>=xs': `@media (min-width: ${screenSizes.xs}px)`,
  '>=sm': `@media (min-width: ${screenSizes.sm}px)`,
  '>=md': `@media (min-width: ${screenSizes.md}px)`,
  '>=lg': `@media (min-width: ${screenSizes.lg}px)`,
  '>=xl': `@media (min-width: ${screenSizes.xl}px)`,

  '<=xs': `@media (${screenSizes.sm}px > width >= ${screenSizes.xs}px)`,
  '<=sm': `@media (${screenSizes.md}px > width >= ${screenSizes.xs}px)`,
  '<=md': `@media (${screenSizes.lg}px > width >= ${screenSizes.xs}px)`,
  '<=lg': `@media (${screenSizes.xl}px > width >= ${screenSizes.xs}px)`,
  '<=xl': `@media (min-width: ${screenSizes.xs}px)`,

  xs: `@media (${screenSizes.sm}px > width >= ${screenSizes.xs}px)`,
  sm: `@media (${screenSizes.md}px > width >= ${screenSizes.sm}px)`,
  md: `@media (${screenSizes.lg}px > width >= ${screenSizes.md}px)`,
  lg: `@media (${screenSizes.xl}px > width >= ${screenSizes.lg}px)`,
  xl: `@media (min-width: ${screenSizes.xl}px)`,
} as const;

const isTouchDevice = '@media (pointer: coarse)';
const isPointerDevice = '@media (not (pointer: coarse))';
const isSmallDevice = screenSizeMediaQueries['<=md'];
const isLargeDevice = screenSizeMediaQueries['>=lg'];

export const mq = {
  isTouchDevice,
  isPointerDevice,
  isSmallDevice,
  isLargeDevice,
  isTouchOrSmallDevice: `${isTouchDevice}, ${isSmallDevice.slice(7)}`,
  isPointerAndLargeDevice: `${isPointerDevice} and ${isLargeDevice.slice(7)}`,
  conditionalTransition: '@media (prefers-reduced-motion: no-preference)',
  supportsHover: `@media (hover: hover) and ${isPointerDevice.slice(7)}`,
  print: '@media print',
  prefersColorSchemeDark: '@media (prefers-color-scheme: dark)',
  ...screenSizeMediaQueries,
} as const;
