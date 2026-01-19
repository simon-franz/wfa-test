import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import { observer } from 'mobx-react';
import { lazy, Suspense, useContext } from 'react';

import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { PieChartAdapterProps } from './PieChartAdapter.types';

const PieChart = lazy(() => import('@hrworks/sui-extension/PieChart'));

export const PieChartAdapter = observer((props: PieChartAdapterProps) => {
  const { defaultFullHeight } = useContext(DefaultValueContext);

  return (
    <Suspense fallback={<LoadingAnimation type="spinner" />}>
      <PieChart fullHeight={defaultFullHeight} {...props} />
    </Suspense>
  );
});
