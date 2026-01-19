import { observer } from 'mobx-react';
import { forwardRef } from 'react';

import { S } from './IconButton.styles';
import type { IconButtonProps } from './IconButton.types';

export const IconButton = observer(
  forwardRef<HTMLButtonElement, IconButtonProps>(({ corner = 'pill', variant = 'filled', ...otherProps }, ref) => (
    <S.Button ref={ref} corner={corner} variant={variant} {...otherProps} />
  )),
);
