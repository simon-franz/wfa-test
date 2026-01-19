import { fontAwesomeIconMap, materialDesignIconMap, streamlineIconMap } from '@hrworks/sui-core/Icon/';
import type { IconSet } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../types/shared/BackendTypes';

export function getSmartFaceIconComponent(
  iconSet: IconSet | null,
  name: keyof typeof fontAwesomeIconMap,
  sfId: string,
): IconBackendDefinition | null {
  switch (iconSet) {
    case 'streamline':
      return { sfComponent: 'StreamlineIcon', sfId, props: streamlineIconMap[name] };
    case 'font-awesome':
      return { sfComponent: 'FontAwesomeIcon', sfId, props: fontAwesomeIconMap[name] };
    case 'material-design':
      return { sfComponent: 'MaterialDesignIcon', sfId, props: materialDesignIconMap[name] };
    default:
      return null;
  }
}
