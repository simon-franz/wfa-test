import type { HTMLAttributes } from 'react';

import type { SmartFaceBackendComponent } from '../../types/SmartFaceComponent';

export type StreamlineIconPropsType = {
  name: string;
};

export type StreamlineIconBackendType = SmartFaceBackendComponent<'StreamlineIcon', StreamlineIconPropsType>;

export type StreamlineIconUiPropsType = StreamlineIconPropsType & HTMLAttributes<SVGSVGElement>;
