import type { Interpolation, Theme } from '@emotion/react';
import type { SmartFaceTheme } from '@hrworks/design-system';

import type { CustomTheme } from './types/customTheme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme, SmartFaceTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}
