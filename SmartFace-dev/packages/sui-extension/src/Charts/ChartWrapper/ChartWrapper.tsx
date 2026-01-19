import LoadingAnimation from '@hrworks/sui-core/LoadingAnimation';
import HighchartsReact from 'highcharts-react-official';
import cloneDeep from 'lodash/cloneDeep';
import { observer } from 'mobx-react';
import { type RefObject, useEffect, useRef } from 'react';

import { useHighcharts } from '../hooks/useHighcharts';
import { S } from './ChartWrapper.styles';
import type { ChartWrapperProps } from './ChartWrapper.type';

export const ChartWrapper = observer(({ id, exportTitle, exportSubtitle, options, fullHeight }: ChartWrapperProps) => {
  const chartRef = useRef<HighchartsReact.Props>(null);
  const { Highcharts } = useHighcharts({ chartRef, id, exportTitle, exportSubtitle });

  useEffect(() => {
    if (chartRef.current?.chart?.noDataLabel) {
      chartRef.current.chart.noDataLabel.attr({ text: options.lang.noData });
      chartRef.current.chart.redraw();
    }
  }, [options.lang.noData]);

  return Highcharts == null ? (
    <LoadingAnimation type="spinner" />
  ) : (
    Highcharts && (
      <S.Wrapper fullHeight={fullHeight}>
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={fullHeight && { style: { height: '100%' } }}
          options={cloneDeep(options)}
          ref={chartRef as RefObject<HighchartsReact.RefObject>} // TODO This is a workaround and should be fixed properly. https://github.com/highcharts/highcharts-react/issues/431
        />
      </S.Wrapper>
    )
  );
});
