import OverlayEffect from '@hrworks/sui-extension/OverlayEffect';
import { observer } from 'mobx-react';

import type { OverlayEffectAdapterProps } from './OverlayEffectAdapter.types';

export const OverlayEffectAdapter = observer((props: OverlayEffectAdapterProps) => <OverlayEffect {...props} />);
