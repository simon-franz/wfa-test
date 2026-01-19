import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type FontAwesomeIconBackendProps = {
  name: string;
  variant?:
    | 'brands'
    | 'duotone'
    | 'light'
    | 'regular'
    | 'sharp-duotone'
    | 'sharp-light'
    | 'sharp-regular'
    | 'sharp-solid'
    | 'sharp-thin'
    | 'solid'
    | 'thin';
};

export type FontAwesomeIconBackendDefinition = SmartFaceBackendComponent<
  'FontAwesomeIcon',
  FontAwesomeIconBackendProps
>;

export type FontAwesomeIconAdapterProps = SmartFaceAdapterPropsType<FontAwesomeIconBackendDefinition>;
