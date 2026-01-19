// @ts-check
import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/onboarding/CmdTableAdapter/CmdTableAdapter.types').CmdTableBackendDefinition } CmdTableBackendDefinition
 * @param { CmdTableBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { CmdTableBackendDefinition }
 */
export function cmdTableFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('CmdTable', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../../src/adapters/application/onboarding/CmdTableAdapter/CmdTableItemAdapter/CmdTableItemAdapter.types').CmdTableItemBackendProps> & { dataGuideId?: string } } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../../src/adapters/application/onboarding/CmdTableAdapter/CmdTableItemAdapter/CmdTableItemAdapter.types.js').CmdTableItemBackendDefinition }
 */
export function cmdTableItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return { sfId, props: { ...props }, dataGuideId };
}
