import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { ContainerAdapterPropsType, ContainerUiPropsType } from '../../../types/core/ContainerType';

export const ContainerAdapter = observer(({ componentChildren, ...otherProps }: ContainerAdapterPropsType) => {
  const translatedProps: ContainerUiPropsType = {
    ...otherProps,
    children: mapSmartFaceComponentsToAdapters(componentChildren),
  };

  return <div css={{ display: 'contents' }} {...translatedProps} />;
});
