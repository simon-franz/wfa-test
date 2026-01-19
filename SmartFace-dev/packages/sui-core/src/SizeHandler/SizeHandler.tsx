import { observer } from 'mobx-react';

import { Scroller } from '../Scroller';
import type { SizeHandlerProps } from './SizeHandler.types';

export const SizeHandler = observer(
  ({ height = 'auto', maxHeight, minHeight, width, maxWidth, minWidth, ...otherProps }: SizeHandlerProps) => (
    <Scroller css={{ height, maxHeight, minHeight, width, maxWidth, minWidth }} {...otherProps} />
  ),
);
