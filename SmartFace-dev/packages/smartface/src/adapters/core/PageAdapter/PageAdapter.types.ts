import type { PartialDeep } from 'type-fest';

import type { ModalBackendDefinition } from '../../../adapters/core/PageAdapter/Modal/ModalAdapter.types';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type HeadField = {
  tag: string;
  attributes: Record<string, string>;
  innerText: string | null | undefined;
};

export type PageBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  modals: ModalBackendDefinition[];
  document: PartialDeep<{
    html: never; // Not used currenty. Change if required.
    head: {
      title: string;
      fields: Record<string, HeadField | null>;
    };
    body: never; // Not used currenty. Change if required.
  }>;
};

export type PageBackendDefinition = SmartFaceBackendComponent<'Page', PageBackendProps>;

export type PageAdapterProps = SmartFaceAdapterPropsType<PageBackendDefinition>;
