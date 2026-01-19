import type { ReactNode } from 'react';

import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import { ComponentMapper } from './ComponentMapper';

export function mapSmartFaceComponentsToAdapters(
  smartFaceComponents?: SmartFaceComponentsType[],
): ReactNode[] | undefined {
  return Array.isArray(smartFaceComponents) && smartFaceComponents.length > 0
    ? smartFaceComponents.map((element) => <ComponentMapper key={element.sfId} smartFaceComponent={element} />)
    : undefined;
}
