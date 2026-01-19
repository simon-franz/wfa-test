import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { BadgeBackendDefinition } from '../../../core/BadgeAdapter/BadgeAdapter.types';
import type { SwitchBackendDefinition } from '../../../core/SwitchAdapter/SwitchAdapter.types';
import type {
  PreviousNewsItemBackendDefinition,
  PreviousNewsItemBackendProps,
} from './PreviousNewsItemAdapter/PreviousNewsItemAdapter.types';

export type HrworksUserWhatsNewBackendProps = {
  hero?: {
    adminSwitch?: SwitchBackendDefinition;
    src?: string;
    title?: string;
    subtitle?: string;
  };
  content?: {
    spotlight?: {
      imgSrc?: string;
      statusBadge?: BadgeBackendDefinition;
      componentChildren?: SmartFaceComponentsType[];
    } & Omit<PreviousNewsItemBackendProps, 'title'>;
    previousNewsItems?: PreviousNewsItemBackendDefinition[];
  };
};

export type HrworksUserWhatsNewBackendDefinition = SmartFaceBackendComponent<
  'HrworksUserWhatsNew',
  HrworksUserWhatsNewBackendProps
>;

export type HrworksUserWhatsNewAdapterProps = SmartFaceAdapterPropsType<HrworksUserWhatsNewBackendDefinition>;
