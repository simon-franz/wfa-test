import { SuiThemeContext } from '@hrworks/design-system';
import { observer } from 'mobx-react';
import { type ForwardedRef, forwardRef, useContext } from 'react';

import { S } from './Scroller.styles';
import type { ScrollerProps } from './Scroller.types';

export const Scroller = observer(
  forwardRef((props: ScrollerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { useCustomScrollbars } = useContext(SuiThemeContext);

    return <S.Wrapper useCustomScrollbars={useCustomScrollbars} ref={ref} {...props} />;
  }),
);
