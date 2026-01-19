import { NewsItem } from '@hrworks/sui-extension/HrworksUserWhatsNew';
import { observer } from 'mobx-react';

import type { PreviousNewsItemAdapterProps } from './PreviousNewsItemAdapter.types';

export const PreviousNewsItemAdapter = observer((props: PreviousNewsItemAdapterProps) => <NewsItem {...props} />);
