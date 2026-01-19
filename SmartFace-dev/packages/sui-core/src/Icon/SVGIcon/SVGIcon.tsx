import { observer } from 'mobx-react';

import FallbackIcon from '../../FallbackIcon';
import { S } from './SVGIcon.styles';
import type { SVGIconProps } from './SVGIcon.types';

export const SVGIcon = observer(({ title, src, ...otherProps }: SVGIconProps) => (
  <S.StyledReactSvg
    src={src}
    wrapper="svg"
    fallback={() => <FallbackIcon data-cy="icon-not-ready" {...otherProps} />}
    loading={() => <FallbackIcon data-cy="icon-not-ready" {...otherProps} />}
    aria-hidden
    {...otherProps}
  />
));
