import { SuiThemeProvider } from '@hrworks/design-system';
import { LocalizationProvider } from '@hrworks/localization';
import { MotionConfig } from 'motion/react';

import { S } from './CypressComponentWrapper.styles';
import type { CypressComponentWrapperProps } from './CypressComponentWrapper.types';

export const CypressComponentWrapper = ({ children, ...otherProps }: CypressComponentWrapperProps) => (
  <SuiThemeProvider>
    <MotionConfig reducedMotion="always">
      <LocalizationProvider>
        <S.Wrapper {...otherProps}>{children}</S.Wrapper>
      </LocalizationProvider>
    </MotionConfig>
  </SuiThemeProvider>
);
