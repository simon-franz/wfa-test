import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { WorkflowGraphColor } from '../WorkflowGraphAdapter.types';

export type WorkflowGraphNodeBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  color?: WorkflowGraphColor;
  size?: Size;
  onClick?: SfEventType;
  positionContent?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'middle-left'
    | 'middle-center'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

export type WorkflowGraphNodeBackendDefinition = SmartFaceBackendComponentPart<WorkflowGraphNodeBackendProps>;
