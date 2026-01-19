import { type ComponentType, createElement, type ReactNode } from 'react';

import type { SmartFaceBackendComponentPart } from '../../../types/SmartFaceComponent';

export const mapElementProps = <T extends Record<string, any>>(
  element: SmartFaceBackendComponentPart<T, string | undefined>,
) => {
  const { sfId, dataGuideId, props } = element;

  return { ...(props as T), key: sfId, id: sfId, 'data-sfid': sfId, 'data-guide-id': dataGuideId };
};

const mapElements = <T extends string | undefined = undefined>(
  mappingFunction: (child: SmartFaceBackendComponentPart<any, T>) => ReactNode,
  smartFaceComponentParts?: SmartFaceBackendComponentPart<any, T>[],
): ReactNode[] | null => {
  if (!Array.isArray(smartFaceComponentParts) || smartFaceComponentParts.length === 0) {
    return null;
  }

  return smartFaceComponentParts.map((child) => mappingFunction(child));
};

export const mapSmartFaceComponentPartsToAdapter = (
  Adapter: ComponentType<any>,
  smartFaceComponentParts?: SmartFaceBackendComponentPart<any>[],
): ReactNode[] | null =>
  mapElements((child) => createElement(Adapter, mapElementProps(child)), smartFaceComponentParts);
