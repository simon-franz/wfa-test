import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import { observer } from 'mobx-react';

import { S } from './MenuHeader.styles';
import type { MenuHeaderProps } from './MenuHeader.types';

export const MenuHeader = observer(
  ({ portrait, title, subtitle, onPortraitAction, ...otherProps }: MenuHeaderProps) => (
    <S.HeaderContainer portrait={!!portrait} {...otherProps}>
      {!!portrait && (
        <S.PortraitContainer>
          {portrait}
          {!!onPortraitAction && (
            <S.CropButton
              tabIndex={-1}
              variant="unstyled"
              onClick={onPortraitAction}
              color="secondary"
              size="extraSmall"
            >
              <StreamlineIcon name="camera" />
            </S.CropButton>
          )}
        </S.PortraitContainer>
      )}
      {(!!title || !!subtitle) && (
        <S.Details>
          {!!title && <S.Title title={title}>{title}</S.Title>}
          {!!subtitle && <S.SubTitle title={subtitle}>{subtitle}</S.SubTitle>}
        </S.Details>
      )}
    </S.HeaderContainer>
  ),
);
