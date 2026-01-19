// @ts-check

import getId from '../getId.js';

/**
 * @template { import('../../src/types/SmartFaceComponentsType').SmartFaceComponentsType } SmartFaceComponentsType
 * @param { SmartFaceComponentsType['sfComponent'] } componentName
 * @param { SmartFaceComponentsType['props'] } props
 * @param { string } sfId
 * @param { string } [dataGuideId]
 * @returns { SmartFaceComponentsType }
 */
export function smartFaceComponentFactory(componentName, props = {}, sfId = getId(), dataGuideId) {
  // @ts-expect-error Works, so some type must be wrong
  return {
    sfComponent: componentName,
    sfId,
    dataGuideId,
    props: { ...props },
  };
}
