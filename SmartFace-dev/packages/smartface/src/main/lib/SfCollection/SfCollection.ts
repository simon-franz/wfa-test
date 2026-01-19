import { action, makeObservable, observable } from 'mobx';
import type { Constructor } from 'type-fest';

import type { SmartFaceContainer } from '../../../main/components/SmartFaceContainer';
import type { BaseModelData, SfModel } from './SfModel';

export class SfCollection<ModelData extends BaseModelData, Model extends SfModel<ModelData>> {
  @observable
  map = new Map<string, Model>();

  constructor(
    private model: Constructor<Model>,
    private smartFaceContainer: SmartFaceContainer,
  ) {
    queueMicrotask(() => makeObservable(this));
  }

  @action
  add = (modelData: ModelData) => {
    const modelInstance = new this.model(modelData, this.smartFaceContainer);
    this.map.set(modelInstance.id, modelInstance);
  };

  @action
  remove = (id: string) => {
    const modelInstance = this.map.get(id);
    if (modelInstance) {
      typeof modelInstance.willBeRemoved === 'function' && modelInstance.willBeRemoved();
      this.map.delete(id);
    }
  };

  empty = () => {
    for (const [, model] of this.map) {
      this.remove(model.id);
    }
  };
}
