import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import { observer } from 'mobx-react';

import type { StreamlineIconPropsType } from '../../../types/core/StreamlineIconType';

export const StreamlineIconAdapter = observer((props: StreamlineIconPropsType) => <StreamlineIcon {...props} />);
