import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { observer } from 'mobx-react';
import { lazy, Suspense, useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { LineChartAdapterProps } from './LineChartAdapter.types';

const LineChart = lazy(() => import('@hrworks/sui-extension/LineChart'));

export const LineChartAdapter = observer((props: LineChartAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);

  return (
    <Suspense fallback={<LoadingAnimation type="spinner" />}>
      <LineChart fullHeight={defaultFullHeight} {...props} />
    </Suspense>
  );
});
