import getId from '@hrworks/sui-shared/functions/getId';

import type { SmartFaceContainer } from '../../../main/components/SmartFaceContainer';

export type BaseModelData = { id?: string };

export class SfModel<ModelData extends BaseModelData | object> {
  id: string;

  willBeRemoved?: () => void;

  constructor(
    modelData: ModelData,
    public smartFaceContainer: SmartFaceContainer,
  ) {
    this.id = 'id' in modelData && typeof modelData.id === 'string' ? modelData.id : getId();
    this.smartFaceContainer = smartFaceContainer;
  }
}
