import type { Theme } from '@emotion/react';
import { generateShadowStyles, withOpacity } from '@hrworks/design-system';
import type { Options } from 'highcharts';

import { convertThemeColor, convertTypography } from './convertCSSVars';

const componentConfig = (theme?: Theme) => ({
  ...(theme && {
    legendHoverColor: withOpacity(convertThemeColor(theme.sqwTier2Color.text.subtle), '75%'),
    crosshairThresholdColor: convertThemeColor(theme.sqwTier2Color.border.input),
  }),
  patterns: [
    '',
    //diagonal top to bottom
    'M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5',
    //cubes
    'M 0 0 L 5 0 L 5 5 L 0 5 Z M 4.5 -0.5 L 5.5 -0.5 L 5.5 0.5 L 4.5 0.5 Z M -0.5 4.5 L 0.5 4.5 L 0.5 5.5 L -0.5 5.5 Z',
    //horizontal
    'M 0 2 L 5 2 M 0 4 L 5 4',
    //chevron
    'M 0 0 L 2.5 2.5 L 5 0 M 4.5 -0.5 L 5.5 0.5 L 6.5 -0.5 M -0.5 4.5 L 0.5 5.5 L 1.5 4.5',
    //diagonal bottom to top
    'M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5',
    // checkerboard
    'M 0 0 L 10 0 M 0 0 L 0 10 M 5 5 L 15 5 M 5 5 L 5 15',
    //vertical
    'M 2 0 L 2 5 M 4 0 L 4 5',
    'M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5',
    //hexagon
    'M 0 0 L 2.5 0 L 3.75 2.165 L 2.5 4.33 L 0 4.33 L -1.25 2.165 Z',
    'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
    //pills
    'M 0 0 L 20 20 M 19.5 -0.5 L 20.5 0.5 M -0.5 19.5 L 0.5 20.5',
  ],
});

const styles = (theme: Theme): Options => {
  const dataLabelStyles = {
    ...convertTypography(theme.sqwTier2Typography.bodyMd),
    color: convertThemeColor(theme.sqwTier2Color.text.default),
  };

  const axisTickStyles = {
    tickLength: 8,
    tickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
    minorTickLength: 4,
    minorTickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
    minorGridLineWidth: 0,
    minorTickWidth: 1,
    lineWidth: 0,
    gridLineColor: convertThemeColor(theme.sqwTier2Color.border.bold),
  };

  const axisLabelStyles = {
    ...convertTypography(theme.sqwTier2Typography.bodySm),
    color: convertThemeColor(theme.sqwTier2Color.text.subtle),
  };

  const axisTitleStyles = {
    ...convertTypography(theme.sqwTier2Typography.labelMd),
    color: convertThemeColor(theme.sqwTier2Color.text.subtle),
  };

  return {
    noData: {
      style: {
        ...convertTypography(theme.sqwTier2Typography.headingLg),
        fontSize: '24px', // Override the theme size
        color: convertThemeColor(theme.sqwTier2Color.text.subtle),
      },
    },
    chart: {
      styledMode: false,
      backgroundColor: convertThemeColor(theme.sqwTier2Color.surface.sunken),
    },
    credits: {
      enabled: false,
    },
    legend: {
      alignColumns: false,
      margin: theme.marko.variables.spacing.distance.extraLarge,
      squareSymbol: true,
      symbolRadius: theme.marko.variables.borderRadius.extraSmall,
      symbolWidth: 14,
      symbolHeight: 14,
      itemStyle: {
        ...convertTypography(theme.sqwTier2Typography.bodyMd),
        color: convertThemeColor(theme.sqwTier2Color.text.subtle),
      },
      itemHoverStyle: {
        color: componentConfig(theme).legendHoverColor,
      },
      navigation: {
        arrowSize: 8,
        activeColor: convertThemeColor(theme.sqwTier2Color.text.subtle),
        style: {
          ...convertTypography(theme.sqwTier2Typography.bodyMd),
          color: convertThemeColor(theme.sqwTier2Color.text.subtle),
        },
      },
    },
    tooltip: {
      style: {
        ...convertTypography(theme.sqwTier2Typography.bodyMd),
        filter: generateShadowStyles({ theme, variant: 'default', type: 'drop', returnType: 'shadow-value' }),
        lineHeight: 20,
        color: convertThemeColor(theme.sqwTier2Color.text.inverse),
      },
      backgroundColor: convertThemeColor(theme.sqwTier2Color.background.neutral.bold),
      borderRadius: theme.marko.variables.borderRadius.medium,
      padding: theme.marko.variables.spacing.distance.medium,
      shape: 'rect',
      useHTML: false,
      pointFormat: '{series.name}: <b>{point.y}</b><br>',
    },
    exporting: {
      sourceWidth: 800,
      sourceHeight: 400,
      chartOptions: {
        chart: {
          backgroundColor: convertThemeColor(theme.sqwTier2Color.surface.sunken),
        },
        legend: {
          itemStyle: {
            ...convertTypography(theme.sqwTier2Typography.bodyMd),
            color: convertThemeColor(theme.sqwTier2Color.text.subtle),
          },
          itemHoverStyle: {
            color: componentConfig(theme).legendHoverColor,
          },
          navigation: {
            activeColor: convertThemeColor(theme.sqwTier2Color.text.subtle),
            style: {
              ...convertTypography(theme.sqwTier2Typography.bodyMd),
              color: convertThemeColor(theme.sqwTier2Color.text.subtle),
            },
          },
        },
        title: {
          style: {
            ...convertTypography(theme.sqwTier2Typography.headingLg),
            color: convertThemeColor(theme.sqwTier2Color.text.subtle),
          },
        },
        subtitle: {
          style: {
            ...convertTypography(theme.sqwTier2Typography.headingMd),
            color: convertThemeColor(theme.sqwTier2Color.text.subtlest),
          },
        },
        xAxis: {
          title: {
            style: {
              ...axisTitleStyles,
            },
          },
          labels: {
            style: {
              ...axisLabelStyles,
            },
          },
          tickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
          minorTickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
          gridLineColor: convertThemeColor(theme.sqwTier2Color.border.bold),
        },
        yAxis: {
          title: {
            style: {
              ...axisTitleStyles,
            },
          },
          labels: {
            style: {
              ...axisLabelStyles,
            },
          },
          tickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
          minorTickColor: convertThemeColor(theme.sqwTier2Color.border.bold),
          gridLineColor: convertThemeColor(theme.sqwTier2Color.border.bold),
        },
        plotOptions: {
          series: {
            dataLabels: {
              style: {
                ...dataLabelStyles,
                textOutline: 'none',
              },
            },
          },
          pie: {
            borderColor: convertThemeColor(theme.sqwTier2Color.surface.sunken),
            dataLabels: {
              style: {
                ...dataLabelStyles,
              },
            },
          },
          line: {
            dataLabels: {
              style: {
                ...dataLabelStyles,
              },
            },
          },
          column: {
            borderColor: 'transparent',
            dataLabels: {
              style: {
                ...dataLabelStyles,
                textOutline: 'none',
              },
            },
          },
          bar: {
            borderColor: 'transparent',
            dataLabels: {
              style: {
                ...dataLabelStyles,
                textOutline: 'none',
              },
            },
          },
        },
      },
    },
    title: {
      style: {
        ...convertTypography(theme.sqwTier2Typography.headingLg),
        color: convertThemeColor(theme.sqwTier2Color.text.subtle),
      },
      align: 'left',
      text: undefined,
    },
    subtitle: {
      style: {
        ...convertTypography(theme.sqwTier2Typography.headingMd),
        color: convertThemeColor(theme.sqwTier2Color.text.subtlest),
      },
      align: 'left',
      verticalAlign: 'top',
      text: undefined,
    },
    xAxis: {
      title: {
        style: {
          ...axisTitleStyles,
        },
      },
      labels: {
        style: {
          ...axisLabelStyles,
        },
      },
      ...axisTickStyles,
      tickmarkPlacement: 'on',
      showFirstLabel: true,
      showLastLabel: true,
      startOnTick: false,
    },
    yAxis: {
      title: {
        style: {
          ...axisTitleStyles,
        },
      },
      labels: {
        style: {
          ...axisLabelStyles,
        },
      },
      ...axisTickStyles,
      startOnTick: true,
      endOnTick: true,
    },
    plotOptions: {
      series: {
        stickyTracking: false,
        dataLabels: {
          style: {
            ...dataLabelStyles,
            textOutline: 'none',
          },
        },
        states: {
          inactive: {
            opacity: theme.marko.variables.opacity.medium,
          },
        },
      },
      pie: {
        borderColor: convertThemeColor(theme.sqwTier2Color.surface.sunken),
        borderRadius: theme.marko.variables.borderRadius.extraSmall,
        showInLegend: true,
        dataLabels: {
          connectorShape: 'fixedOffset',
          connectorPadding: 0,
          style: {
            ...dataLabelStyles,
          },
        },
      },
      line: {
        dataLabels: {
          style: {
            ...dataLabelStyles,
          },
        },
      },
      column: {
        borderRadius: theme.marko.variables.borderRadius.extraSmall,
        borderColor: 'transparent',
        dataLabels: {
          style: {
            ...dataLabelStyles,
            textOutline: 'none',
          },
        },
      },
      bar: {
        borderRadius: theme.marko.variables.borderRadius.extraSmall,
        borderColor: 'transparent',
        dataLabels: {
          style: {
            ...dataLabelStyles,
            textOutline: 'none',
          },
        },
      },
    },
  };
};

export const S = {
  componentConfig,
  styles,
} as const;
