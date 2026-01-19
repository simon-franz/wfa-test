import { observer } from 'mobx-react';

import { S } from './Branding.styles';
import type { BrandingProps } from './Branding.types';

export const Branding = observer(({ alt, href, onClick, src, target, children, ...otherProps }: BrandingProps) => {
  return (
    <S.Container {...otherProps}>
      {children}
      <S.Logo alt={alt} href={href} onClick={onClick} src={src} target={target} />
    </S.Container>
  );
});
