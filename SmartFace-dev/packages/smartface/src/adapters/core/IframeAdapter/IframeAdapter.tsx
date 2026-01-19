import Iframe from '@hrworks/sui-core/Iframe';
import { observer } from 'mobx-react';

import type { IframeAdapterProps } from './IframeAdapter.types';

export const IframeAdapter = observer((props: IframeAdapterProps) => <Iframe {...props} />);
