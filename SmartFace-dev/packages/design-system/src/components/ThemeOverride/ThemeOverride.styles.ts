import styled from '@emotion/styled';

import { S as SuiThemeProviderStyles } from '../SuiThemeProvider/SuiThemeProvider.styles';

export const DefaultStyleProvider = styled.div(SuiThemeProviderStyles.defaultStyles);

export const S = {
  DefaultStyleProvider,
} as const;
