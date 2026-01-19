import type { SetOptional } from 'type-fest';

import { isPlainObject } from '../../../main/lib/isPlainObject';

type SingleSmartTreeNodeObjectType = {
  sfId: string;
} & NodePropertiesType;

export type SmartFaceTreeNodeType = SingleSmartTreeNodeObjectType | Array<SmartFaceTreeNodeType>;

type NodePropertiesType = {
  [key: string]: SmartFaceTreeNodeType | SmartFaceTreeNodeType[] | NodePropertiesType | unknown;
};

type ParentArray = { parentType: 'array'; identifier: number };
type ParentObject = { parentType: 'object'; identifier: string };

type IdMapValueType = (ParentArray | ParentObject) & {
  parent: SmartFaceTreeNodeType;
  node: SingleSmartTreeNodeObjectType;
};

type IdMapType = Record<string, IdMapValueType>;

export function generateSfIdMap(
  nodeMap: Omit<SetOptional<IdMapValueType, 'parent' | 'parentType' | 'identifier'>, 'node'> & {
    node: SmartFaceTreeNodeType;
  },
): IdMapType {
  const localIdMap: IdMapType = {};

  const { node, parent, parentType, identifier } = nodeMap;
  const duplicateSfIds: string[] = [];

  if (Array.isArray(node)) {
    node
      .filter((subNode) => Boolean(subNode) && (Array.isArray(subNode) || isPlainObject(subNode)))
      .map((subNode, index) => generateSfIdMap({ node: subNode, parent: node, parentType: 'array', identifier: index }))
      // eslint-disable-next-line unicorn/no-array-for-each
      .forEach((idMap) => {
        for (const [key, value] of Object.entries(idMap)) {
          if (localIdMap[key]) {
            duplicateSfIds.push(key);
          } else {
            localIdMap[key] = value;
          }
        }
      });
  } else if (isPlainObject(node)) {
    for (const [key, value] of Object.entries<any>(node as SmartFaceTreeNodeType)) {
      if (isPlainObject(value) || Array.isArray(value)) {
        Object.assign(
          localIdMap,
          generateSfIdMap({
            node: value as SmartFaceTreeNodeType,
            parent: node,
            parentType: 'object',
            identifier: key,
          }),
        );
      }
    }
    if (node.sfId && parent && parentType && identifier !== undefined) {
      //@ts-expect-error I don't know why but it works
      localIdMap[node.sfId] = {
        node,
        parent,
        parentType: parentType as IdMapValueType['parentType'],
        identifier: identifier as IdMapValueType['identifier'],
      };
    }
  }

  if (duplicateSfIds.length > 0) {
    const existingError = document.querySelector('[data-smartface-error="duplicate-sfid"]');
    if (!existingError) {
      const errorDiv = document.createElement('div');
      errorDiv.dataset.smartfaceError = 'duplicate-sfid';
      errorDiv.style.cssText =
        'position: fixed; bottom: 5px; left: 5px; right: 5px; color: #1e1d21; z-index: 9999; background: #f8877e; padding: 8px; border-radius: 4px;';
      errorDiv.textContent = `ERROR: Encountered two or more components with the same sfId. Please make sure that every component has a unique sfId. Duplicates: ${duplicateSfIds.join(
        ', ',
      )}`;

      errorDiv.addEventListener('click', () => errorDiv.remove());

      document.body.append(errorDiv);
    }

    console.error(
      `Encountered two or more components with the same sfId. Please make sure that every component has a unique sfId. Duplicates: ${duplicateSfIds}`,
    );
  }

  return localIdMap;
}
