import ProfileMenu from '@hrworks/sui-extension/ProfileMenu';
import getId from '@hrworks/sui-shared/functions/getId';
import { observer } from 'mobx-react';
import { useRef } from 'react';

import { ImageAdapter } from '../../../adapters/core/ImageAdapter';
import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../main/components/ComponentMapper';
import type { ProfileMenuAdapterProps } from './ProfileMenuAdapter.types';

const portraitDefaultProps: ProfileMenuAdapterProps['portrait'] = {
  src: '',
  corner: 'circular',
};

export const ProfileMenuAdapter = observer(
  ({ portrait, headerChildren, bodyChildren, trigger, ...otherProps }: ProfileMenuAdapterProps) => {
    const portraitId = useRef(getId());
    const triggerId = useRef(getId());

    const _trigger = trigger ? (
      <ComponentMapper smartFaceComponent={trigger} />
    ) : (
      <ImageAdapter id={triggerId.current} {...portraitDefaultProps} {...portrait} />
    );

    const _portrait = <ImageAdapter id={portraitId.current} {...portraitDefaultProps} {...portrait} />;
    const children = mapSmartFaceComponentsToAdapters(bodyChildren);
    const _headerChildren = mapSmartFaceComponentsToAdapters(headerChildren);

    return (
      <ProfileMenu
        trigger={_trigger}
        portrait={_portrait}
        children={children}
        headerChildren={_headerChildren}
        {...otherProps}
      />
    );
  },
);
