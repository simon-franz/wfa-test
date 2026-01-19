// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TableAdapter/TableAdapter.types').TableBackendDefinition } TableBackendDefinition
 * @param { TableBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { TableBackendDefinition }
 */
function tableFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Table', { ...props }, sfId, dataGuideId);
}

/**
 * @param  { Partial<import('../../../src/adapters/core/TableAdapter/HeaderRow/TableHeaderRowAdapter.types').TableHeaderRowBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TableAdapter/HeaderRow/TableHeaderRowAdapter.types').TableHeaderRowBackendDefinition }
 */
function headerRowFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/TableAdapter/HeaderRow/Header/TableHeaderAdapter.types').TableHeaderBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TableAdapter/HeaderRow/Header/TableHeaderAdapter.types').TableHeaderBackendDefinition }
 */
function headerFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: { text: 'Table Header', ...props },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/TableAdapter/DataRow/TableDataRowAdapter.types').TableDataRowBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TableAdapter/DataRow/TableDataRowAdapter.types').TableDataRowBackendDefinition }
 */
function dataRowFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/TableAdapter/DataRow/Data/TableDataAdapter.types').TableDataBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TableAdapter/DataRow/Data/TableDataAdapter.types').TableDataBackendDefinition }
 */
function dataFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

export { tableFactory, headerRowFactory, headerFactory, dataRowFactory, dataFactory };
