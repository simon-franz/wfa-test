import { WARNING_CODES } from '@hrworks/error-handling';
import isFinite from 'lodash/isFinite';
import { action, computed, get, makeObservable, observable, set } from 'mobx';
import objectPath from 'object-path';

import type { Update } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import { loggingFunction as log } from '../ErrorHandling/functions/loggingFunction';
import { generateSfIdMap, type SmartFaceTreeNodeType } from './generateSfIdMap';

function setByPath(node: any, keys: string[], value: any) {
  const keyIsNumber = isFinite(Number(keys[0]));
  const key = keyIsNumber ? Number(keys[0]) : keys[0];

  if (!get(node, key)) {
    set(node, key, keys.length > 1 ? (isFinite(Number(keys[1])) ? [] : {}) : value);
  } else if (keys.length === 1) {
    set(node, key, value);
  }

  const nextNode = get(node, key);
  keys.shift();

  if (keys.length > 0) {
    setByPath(nextNode, keys, value);
  }
}

export type TreeNode = SmartFaceComponentsType & SmartFaceTreeNodeType;
export class SmartFaceTree {
  @observable
  public root: TreeNode[];

  @computed
  get sfIdMap() {
    return generateSfIdMap({ node: this.root });
  }

  constructor(rawTree: SmartFaceComponentsType[]) {
    makeObservable(this);
    this.root = rawTree;
  }

  @action
  replaceTree = (smartFaceComponents: SmartFaceComponentsType[]) => {
    this.root = [...smartFaceComponents];

    return this.root;
  };

  getBySfId = (sfId: string, sfIdMap: this['sfIdMap']) => sfIdMap[sfId];

  @action
  applyUpdates = (updates: Update[] = []): SmartFaceTreeNodeType[] => {
    // Cache the map to not generate it on every update
    let map: this['sfIdMap'] | null = null;
    for (const update of updates) {
      // TODO flag for caching
      if (!map || update.operation !== 'write') {
        map = this.sfIdMap;
      }
      let sfIdMapValue = this.getBySfId(update.targetSfId, map);

      // If the sfId is not in the map, refresh the cache
      if (!sfIdMapValue) {
        map = this.sfIdMap;
        sfIdMapValue = this.getBySfId(update.targetSfId, map);
      }
      if (sfIdMapValue) {
        if (update.operation === 'write') {
          if (typeof update.path === 'string') {
            setByPath(sfIdMapValue.node, (update.path as string).split('.'), update.value);
          } else {
            // @ts-expect-error I don't know why but it works
            sfIdMapValue.parent[sfIdMapValue.identifier] = update.value as TreeNode;
          }
        } else if (update.operation === 'delete') {
          if (typeof update.path === 'string') {
            objectPath.del(sfIdMapValue.node, update.path);
          } else {
            if (Array.isArray(sfIdMapValue.parent)) {
              sfIdMapValue.parent.splice(sfIdMapValue.identifier as number, 1);
            } else {
              delete sfIdMapValue.parent[sfIdMapValue.identifier];
            }
          }
        } else if (['prepend', 'append', 'insert'].includes(update.operation)) {
          objectPath.ensureExists(sfIdMapValue.node, update.path, [] as Array<SmartFaceTreeNodeType>);
          const target = objectPath.get(sfIdMapValue.node, update.path);
          switch (update.operation) {
            case 'prepend': {
              target.unshift(...(Array.isArray(update.value) ? update.value : [update.value]));
              break;
            }
            case 'append': {
              target.push(...(Array.isArray(update.value) ? update.value : [update.value]));
              break;
            }
            case 'insert': {
              target.splice(update.index, 0, ...(Array.isArray(update.value) ? update.value : [update.value]));
              break;
            }
            // No default
          }
        }
      } else {
        log({ type: 'warning', code: WARNING_CODES.INVALID_TREE_STATE, message: JSON.stringify(update, null, 2) });
      }
    }

    return [...this.root];
  };
}
