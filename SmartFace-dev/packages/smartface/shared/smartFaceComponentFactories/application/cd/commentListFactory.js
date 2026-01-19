// @ts-check
import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/cd/CommentListAdapter/CommentListAdapter.types').CommentListBackendDefinition } CommentListBackendDefinition
 * @param { CommentListBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { CommentListBackendDefinition }
 */
export function commentListFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('CommentList', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../../src/adapters/application/cd/CommentListAdapter/Item/CommentListItemAdapter.types').CommentListItemBackendProps> } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { import('../../../../src/adapters/application/cd/CommentListAdapter/Item/CommentListItemAdapter.types').CommentListItemBackendDefinition }
 */
export function commentListItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return { sfId, props: { ...props }, dataGuideId };
}
