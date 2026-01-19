/**
 * @typedef { Object } Config
 * @property { string } config.adapterPath
 * @property { string } config.typePath
 * @property { string } config.uiPath
 * @property { string } config.applicationName
 *
 * @param { Config } config
 *
 * @return { Config }
 */
export default ({ applicationName, ...otherConfig }) => ({
  ...otherConfig,
  applicationName: applicationName === 'default' ? undefined : applicationName,
});
