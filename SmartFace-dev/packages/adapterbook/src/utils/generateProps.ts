import type {
  SmartFaceComponentNamesType,
  SmartFaceComponentsType,
} from '@hrworks/smartface/types/SmartFaceComponentsType';
import getId from '@hrworks/sui-shared/functions/getId';

type ComponentPropsMap = {
  [K in SmartFaceComponentNamesType]: Extract<SmartFaceComponentsType, { sfComponent: K }>['props'];
};

export const generateProps = <T extends SmartFaceComponentNamesType>(
  sfComponent: T,
  props: NonNullable<ComponentPropsMap[T]>,
) => ({ sfComponent, sfId: getId(), props });
