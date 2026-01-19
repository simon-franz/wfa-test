export default ({ componentName, normalizedSubpath }) => {
  const camelCaseComponentName = componentName[0].toLowerCase() + componentName.slice(1);
  const additionalBackpaths = '../'.repeat((normalizedSubpath.match(/\//) || []).length);

  return `// @ts-check

import { smartFaceComponentFactory } from '../${additionalBackpaths}smartFaceComponentFactory.js';

/**
 * @template { import('../../../${additionalBackpaths}src/adapters/${normalizedSubpath}/${componentName}Adapter/${componentName}Adapter.types').${componentName}BackendDefinition } ${componentName}BackendDefinition
 * @param { ${componentName}BackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { ${componentName}BackendDefinition }
 */
export function ${camelCaseComponentName}Factory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    '${componentName}',
    { ...props },
    sfId,
    dataGuideId,
  );
}
`;
};
