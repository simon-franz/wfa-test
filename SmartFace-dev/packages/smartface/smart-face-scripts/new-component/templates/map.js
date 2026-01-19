export default ({ applicationName }) =>
  `
import { COMPONENT_MAP as EXTENSION_COMPONENT_MAP } from '@hrworks/smartface/adapters/extension/componentMap';
import type { SmartFaceComponentNamesType } from '@hrworks/smartface/types/application/${applicationName}/SmartFaceComponentsType';
import type { ComponentType } from 'react';

/** DO NOT REMOVE: SMART_FACE-CLI-FLAG import */

export const COMPONENT_MAP: Record<SmartFaceComponentNamesType, ComponentType<any>> = {
  ...EXTENSION_COMPONENT_MAP,
  /** DO NOT REMOVE: SMART_FACE-CLI-FLAG componentMap */

};
`;
