import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

// uncomment code below to fix ResizeObserver issue in old browsers
// window.ResizeObserver = window.ResizeObserver || Polyfill;
// TODO lazy load
export const PResizeObserver = window.ResizeObserver || Polyfill;
