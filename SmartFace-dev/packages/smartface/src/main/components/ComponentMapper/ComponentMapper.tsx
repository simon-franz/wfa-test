import { observer } from 'mobx-react';
import { createElement } from 'react';

import { COMPONENT_MAP } from '../../../adapters/componentMap';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type ComponentMapperProps = {
  smartFaceComponent: SmartFaceComponentsType;
};

export const ComponentMapper = observer(({ smartFaceComponent }: ComponentMapperProps) => {
  const { sfId, props, sfComponent, dataGuideId } = smartFaceComponent;
  const component = COMPONENT_MAP[sfComponent];

  const translatedProps = {
    ...props,
    key: sfId,
    id: sfId,
    'data-sfid': sfId,
    'data-guide-id': dataGuideId,
  };

  if (!component) {
    const error = new Error(`SmartFace Component ${sfComponent} was not found in ComponentMapper`);
    throw error;
  }

  return createElement(component, translatedProps);
});
