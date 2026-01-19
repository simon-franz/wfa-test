import { observer } from 'mobx-react';

import { SqwMenu } from '../SqwMenu';
import type { SqwProfileMenuProps } from './SqwProfileMenu.types';

export const SqwProfileMenu = observer(({ username, email, ...otherProps }: SqwProfileMenuProps) => (
  <SqwMenu title={username} subtitle={email} {...otherProps} />
));
