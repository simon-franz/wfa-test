import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import type { Size } from '@hrworks/types/shared/UiTypes';

import { S as ScrollerStyles } from '../Scroller/Scroller.styles';
import { S as DateFieldStyles } from './DateField.styles';

const CalendarWrapper = styled.div<{
  size: Size;
}>(({ theme, size }) => [
  generateShadowStyles({
    theme,
    variant: 'medium',
  }),
  {
    zIndex: theme.marko.variables.zIndex.popover,
    backgroundColor: theme.sqwTier2Color.background.input,
    padding: '1.042em 0.694em 0.694em 0.694em',
    borderRadius: theme.marko.variables.borderRadius.small,
    fontSize: theme.marko.typography.sqwFontSizes[size],
    [`${ScrollerStyles.Wrapper}`]: {
      height: DateFieldStyles.componentConfig.yearContainerHeight[size],
    },
  },
]);

export const S = {
  CalendarWrapper,
} as const;
