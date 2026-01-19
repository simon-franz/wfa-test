import { spawnSync } from 'bun';
import fs from 'node:fs';
import path from 'node:path';

export const openLatestMochaReport = (): void => {
  const reportsDir = path.join(process.cwd(), 'outputs/reports');

  try {
    const files = fs
      .readdirSync(reportsDir)
      .filter((file) => file.startsWith('mochawesome-report-') && file.endsWith('.html'))
      .map((file) => ({
        name: file,
        path: path.join(reportsDir, file),
        time: fs.statSync(path.join(reportsDir, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length > 0) {
      const latestReport = files[0];
      console.log(`📊 Opening latest report: ${latestReport.name}`);

      const chromeFlags = [
        '--no-sandbox',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-notifications',
        '--disable-popup-blocking',
        '--disable-infobars',
        `${latestReport.path}`,
      ];

      try {
        spawnSync(['google-chrome', ...chromeFlags], {
          env: {
            ...process.env,
            DISPLAY: ':0',
          },
        });
      } catch (error) {
        console.error(`Error opening report: ${error}`);
        console.log(`You can manually open the report at: ${latestReport.path}`);
      }
    }
  } catch (error) {
    console.error('Failed to find report:', error);
  }
};
