export default () =>
  `
import type { SmartFaceComponentsType as SmartFaceCoreComponentsType } from '@hrworks/smartface/types/extension/SmartFaceComponentsType';

/** DO NOT REMOVE: SMART_FACE-CLI-FLAG import */

// prettier-ignore
export type SmartFaceComponentsType =
  /** DO NOT REMOVE: SMART_FACE-CLI-FLAG ElementsType */
  | SmartFaceCoreComponentsType;

export type SmartFaceComponentNamesType = SmartFaceComponentsType['sfComponent'];

`;
