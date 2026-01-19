import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import { observer } from 'mobx-react';

import { SqwMenu } from '../SqwMenu';
import type { SqwSupportMenuProps } from './SqwSupportMenu.types';

export const SqwSupportMenu = observer((props: SqwSupportMenuProps) => (
  <SqwMenu icon={<StreamlineIcon name="question-circle" />} {...props} />
));
