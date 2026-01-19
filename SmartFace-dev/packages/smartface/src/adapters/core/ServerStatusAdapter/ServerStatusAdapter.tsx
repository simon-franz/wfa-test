import { ServerStatus } from '@hrworks/error-handling';
import { observer } from 'mobx-react';

import { ComponentMapper } from '../../../main/components/ComponentMapper';
import type { ServerStatusAdapterProps } from './ServerStatusAdapter.types';

export const ServerStatusAdapter = observer(({ media, ...otherProps }: ServerStatusAdapterProps) => {
  const _media = media && <ComponentMapper smartFaceComponent={media} />;

  return <ServerStatus media={_media} {...otherProps} />;
});
