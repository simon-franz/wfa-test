import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { observer } from 'mobx-react';
import { lazy, Suspense, useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { BarChartAdapterProps } from './BarChartAdapter.types';

const BarChart = lazy(() => import('@hrworks/sui-extension/BarChart'));

export const BarChartAdapter = observer((props: BarChartAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);

  return (
    <Suspense fallback={<LoadingAnimation type="spinner" />}>
      <BarChart fullHeight={defaultFullHeight} {...props} />
    </Suspense>
  );
});
