import type { SmartFaceTheme } from '@hrworks/design-system';

declare module '@emotion/react' {
  export interface Theme extends SmartFaceTheme {}
}
