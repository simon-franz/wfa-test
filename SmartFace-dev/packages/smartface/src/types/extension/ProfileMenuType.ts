import type { FloatDirection } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

import type { SmartFaceBackendComponent } from '../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../types/SmartFaceComponentsType';
import type { ImageProps } from '@hrworks/sui-core/Image/Image.types';

type ProfileMenuPropsType = {
  portrait?: Pick<ImageProps, 'src' | 'alt' | 'corner'>;
  title?: string;
  trigger?: SmartFaceComponentsType;
  subtitle?: string;
  placement?: FloatDirection;
  headerChildren?: Array<SmartFaceComponentsType>;
  bodyChildren?: Array<SmartFaceComponentsType>;
};

export type ProfileMenuBackendType = SmartFaceBackendComponent<'ProfileMenu', ProfileMenuPropsType>;

export type ProfileMenuUiPropsType = Omit<
  ProfileMenuPropsType,
  'portrait' | 'bodyChildren' | 'headerChildren' | 'trigger'
> & {
  trigger: ReactNode;

  portrait?: ReactNode;
  headerChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
