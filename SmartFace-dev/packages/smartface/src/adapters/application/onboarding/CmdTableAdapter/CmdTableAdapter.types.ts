import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { CmdTableItemBackendDefinition } from './';

export type CmdTableBackendProps = {
  items?: CmdTableItemBackendDefinition[];
};

export type CmdTableBackendDefinition = SmartFaceBackendComponent<'CmdTable', CmdTableBackendProps>;

export type CmdTableAdapterProps = SmartFaceAdapterPropsType<CmdTableBackendDefinition>;
