import { ERROR_CODES, log } from '@hrworks/error-handling';
import type Highcharts from 'highcharts';

export class ChartController {
  Highcharts: typeof Highcharts | null = null;

  private static instance: ChartController | null = null;
  private static listener: Array<() => void> = [];
  static getInstance = async (): Promise<ChartController> => {
    if (this.instance === null) {
      this.instance = new ChartController();
      await this.instance.init();
      // withAccessibility && this.instance.initAccessibility()
    } else if (!this.instance.Highcharts) {
      await new Promise<void>((res) => this.listener.push(res));
    }
    this.listener.forEach((fn) => fn());

    return this.instance;
  };

  private async init() {
    const Highcharts = await import('highcharts');

    try {
      await this.initNoData(Highcharts);
      this.initStyle(Highcharts);
      this.initPattern(Highcharts);
      await this.initFullscreen(Highcharts);
      await this.initExporting(Highcharts);
      await this.initOfflineExporting(Highcharts);
    } catch (error) {
      log({
        type: 'error',
        code: ERROR_CODES.LAZY_LOAD_ERROR,
        error: error instanceof Error ? error : new Error('Error initializing ChartController'),
      });
    }
    this.Highcharts = Highcharts;
  }

  private initStyle(highcharts: typeof Highcharts) {
    highcharts.dateFormats.q = (timestamp: number) => {
      const date = new Date(timestamp);

      return (Math.floor(date.getUTCMonth() / 3) + 1).toString();
    };
  }

  private async initExporting(highcharts: typeof Highcharts) {
    const HighchartsExporting = await import('highcharts/modules/exporting');
    HighchartsExporting.default(highcharts);
  }
  private async initOfflineExporting(highcharts: typeof Highcharts) {
    const HighchartsOfflineExporting = await import('highcharts/modules/offline-exporting');
    HighchartsOfflineExporting.default(highcharts);
  }
  private async initFullscreen(highcharts: typeof Highcharts) {
    const HighchartsFullscreen = await import('highcharts/modules/full-screen');
    HighchartsFullscreen.default(highcharts);
  }
  private async initPattern(highcharts: typeof Highcharts) {
    const HighchartsPattern = await import('highcharts/modules/pattern-fill');
    HighchartsPattern.default(highcharts);
  }
  private async initNoData(highcharts: typeof Highcharts) {
    const HighchartsFullscreen = await import('highcharts/modules/no-data-to-display');
    HighchartsFullscreen.default(highcharts);
  }
}
