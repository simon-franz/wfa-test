import Progress from '@hrworks/sui-core/Progress';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { ProgressAdapterProps } from './ProgressAdapter.types';

export const ProgressAdapter = observer((props: ProgressAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);

  return <Progress size={defaultSize} {...props} />;
});
