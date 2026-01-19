import { getSmartFaceBackendConfigProperty } from './getSmartFaceBackendConfigProperty';

export const getSmartFaceBackendRequestHeaders = () => ({
  windowlocationhref: window.location.href,
  ...getSmartFaceBackendConfigProperty('sfCustomHeaders'),
});
