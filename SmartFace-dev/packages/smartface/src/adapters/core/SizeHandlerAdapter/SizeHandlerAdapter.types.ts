import type { CSSProperties } from 'react';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type SizeHandlerBackendProps = {
  componentChildren?: Array<SmartFaceComponentsType>;
} & Pick<CSSProperties, 'height' | 'minHeight' | 'maxHeight' | 'width' | 'minWidth' | 'maxWidth'>;

export type SizeHandlerBackendDefinition = SmartFaceBackendComponent<'SizeHandler', SizeHandlerBackendProps>;

export type SizeHandlerAdapterProps = SmartFaceAdapterPropsType<SizeHandlerBackendDefinition>;
