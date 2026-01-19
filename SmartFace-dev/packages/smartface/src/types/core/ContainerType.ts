import type { HTMLAttributes } from 'react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../types/SmartFaceComponentsType';

type ContainerPropsType = {
  componentChildren: Array<SmartFaceComponentsType>;
};

export type ContainerBackendType = SmartFaceBackendComponent<'Container', ContainerPropsType>;

export type ContainerAdapterPropsType = SmartFaceAdapterPropsType<ContainerBackendType>;

export type ContainerUiPropsType = Omit<ContainerPropsType, 'componentChildren'> & HTMLAttributes<HTMLDivElement>;
