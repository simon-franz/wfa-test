import type { Interpolation, Theme } from '@emotion/react';
import type { SmartFaceTheme } from '@hrworks/design-system';

declare module '@emotion/react' {
  export interface Theme extends SmartFaceTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}
