/// <reference types="cypress" />

export const getBrowserConfiguration = (
  browser: Cypress.Browser,
  launchOptions: Cypress.BeforeBrowserLaunchOptions,
): Cypress.BeforeBrowserLaunchOptions => {
  console.log('launching browser %s is headless? %s', browser.name, browser.isHeadless);

  const width = 3480;
  const height = 2160;

  if (browser.name === 'chrome' && browser.isHeadless) {
    launchOptions.args.push(
      `--window-size=${width},${height}`,
      '--force-device-scale-factor=1',
      '--font-render-hinting=none',
    );
  }

  if (browser.name === 'electron' && browser.isHeadless) {
    if (!launchOptions.preferences) {
      launchOptions.preferences = { width: 0, height: 0 };
    }
    launchOptions.preferences.width = width;
    launchOptions.preferences.height = height;
    launchOptions.args.push('--font-render-hinting=none');
  }

  if (browser.name === 'firefox' && browser.isHeadless) {
    launchOptions.args.push(`--width=${width}`, `--height=${height + 74}`);
  }

  return launchOptions;
};
