import { useTheme } from '@emotion/react';
import { SuiThemeContext } from '@hrworks/design-system';
import { LocalizationContext } from '@hrworks/localization';
import type HighchartsReact from 'highcharts-react-official';
import { type RefObject, useCallback, useContext, useEffect, useState } from 'react';

import { ChartController } from '../ChartController';
import { S } from './useHighcharts.styles';
import type { ChartActionEventType } from './useHighcharts.types';

export type UseHighchartsProps = {
  chartRef: RefObject<HighchartsReact.Props | null>;
  id?: string;
  exportTitle?: string;
  exportSubtitle?: string;
};

export const useHighcharts = ({ chartRef, id, exportTitle, exportSubtitle }: UseHighchartsProps) => {
  // TODO: This function is very SmartFace specific, consider moving it to SmartFace package
  const onAction = useCallback(
    (event: ChartActionEventType) => {
      if (!id || !event.detail.targetSfId?.includes(id)) {
        return;
      }
      const exportTitleSubtitle =
        event.detail.includeTitle && event.detail.includeSubtitle
          ? { title: { text: exportTitle }, subtitle: { text: exportSubtitle } }
          : event.detail.includeTitle
            ? { title: { text: exportTitle } }
            : event.detail.includeSubtitle
              ? { subtitle: { text: exportSubtitle } }
              : false;

      const exportConfig = {
        scale: 1,
        sourceWidth: 1920,
        sourceHeight: 1080,
        filename: event.detail.filename || 'chart',
      };

      switch (event.detail.action) {
        case 'export-as-png':
          chartRef.current?.chart.exportChartLocal(
            {
              type: 'image/png',
              ...exportConfig,
            },
            exportTitleSubtitle,
          );
          break;
        case 'export-as-jpeg':
          chartRef.current?.chart.exportChartLocal(
            {
              type: 'image/jpeg',
              ...exportConfig,
            },
            exportTitleSubtitle,
          );
          break;
        case 'export-as-pdf':
          chartRef.current?.chart.exportChartLocal(
            {
              type: 'application/pdf',
              ...exportConfig,
            },
            exportTitleSubtitle,
          );
          break;
        case 'export-as-svg':
          chartRef.current?.chart.exportChartLocal(
            {
              type: 'image/svg+xml',
              ...exportConfig,
            },
            exportTitleSubtitle,
          );
          break;
        case 'fullscreen':
          chartRef.current?.chart.update(exportTitleSubtitle);
          chartRef.current?.chart.fullscreen.toggle();
          break;
        case 'print':
          chartRef.current?.chart.update(exportTitleSubtitle);
          chartRef.current?.chart.print();
          break;
        default:
          break;
      }
    },
    [chartRef, id, exportTitle, exportSubtitle],
  );

  const [chartController, setChartController] = useState<ChartController | null>(null);
  const [documentTheme, setDocumentTheme] = useState<string | undefined>(document.documentElement.dataset.theme);

  const { dayNames, monthNames, shortMonthNames } = useContext(LocalizationContext);

  const currentTheme = useTheme();

  useEffect(() => {
    (async () => {
      const instance = await ChartController.getInstance();
      instance.Highcharts?.setOptions({
        ...S.styles(currentTheme),
        lang: {
          weekdays: dayNames,
          months: monthNames,
          shortMonths: shortMonthNames,
        },
        chart: {
          events: {
            afterPrint: function () {
              this.update({
                title: { text: undefined },
                subtitle: { text: undefined },
              });
            },
            fullscreenClose: function (this: Highcharts.Chart) {
              this.update({
                title: { text: undefined },
                subtitle: { text: undefined },
              });
            },
          },
        },
      });
      setChartController(instance);
    })();
  }, [currentTheme, dayNames, monthNames, shortMonthNames]);

  // Listen to changes of data-theme and put it in a state documentTheme so that we can update based on it.
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.dataset.theme;
          setDocumentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Update theme when colorScheme or documentTheme changes
  const { colorScheme } = useContext(SuiThemeContext);
  useEffect(() => {
    if (chartRef.current?.chart && chartController?.Highcharts) {
      const themeOptions = S.styles(currentTheme);
      chartRef.current.chart.update(themeOptions, true);
    }
  }, [colorScheme, documentTheme, currentTheme, chartRef, chartController]);

  useEffect(() => {
    window.addEventListener('chart-action' as any, onAction);

    return () => {
      window.removeEventListener('chart-action' as any, onAction);
    };
  }, [onAction]);

  return { Highcharts: chartController?.Highcharts || null };
};
