import { observer } from 'mobx-react';

import { S } from './TabList.styles';
import type { TabListProps } from './TabList.types';

export const TabList = observer(({ ...props }: TabListProps) => <S.TabList role="tablist" {...props} />);
