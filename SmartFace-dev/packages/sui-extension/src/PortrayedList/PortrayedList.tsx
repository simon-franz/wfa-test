import List from '@hrworks/sui-core/List';
import { observer } from 'mobx-react';

import type { PortrayedListProps } from './PortrayedList.types';

export const PortrayedList = observer((props: PortrayedListProps) => <List {...props} />);
