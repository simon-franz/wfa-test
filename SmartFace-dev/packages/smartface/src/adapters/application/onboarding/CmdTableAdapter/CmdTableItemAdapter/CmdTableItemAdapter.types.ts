import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';

export type CmdTableItemBackendProps = {
  title: string;
  url: string;
  onButtonClick: SfEventType;
  confirmed?: boolean;
  signingUrl?: string;
};

export type CmdTableItemBackendDefinition = SmartFaceBackendComponentPart<CmdTableItemBackendProps>;

export type CmdTableItemAdapterProps = SmartFaceAdapterPropsType<CmdTableItemBackendDefinition>;
