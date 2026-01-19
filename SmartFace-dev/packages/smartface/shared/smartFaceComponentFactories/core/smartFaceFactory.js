// @ts-check

/**
 * @param { Partial<import('../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType> } props
 * @returns { import('../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export function smartFaceFactory(props = {}) {
  return {
    sfComponents: [],
    sideEffects: [],
    ...props,
  };
}
