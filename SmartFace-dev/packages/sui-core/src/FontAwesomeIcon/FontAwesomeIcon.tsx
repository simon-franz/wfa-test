import { observer } from 'mobx-react';

import { SVGIcon } from '../Icon';
import type { FontAwesomeIconProps } from './FontAwesomeIcon.types';

const baseUrl = 'https://d1aq704nlrqnkz.cloudfront.net/icons/fontawesome-pro-6.6.0-web/svgs';

export const FontAwesomeIcon = observer(({ name, variant = 'solid', ...otherProps }: FontAwesomeIconProps) => (
  <SVGIcon src={`${baseUrl}/${variant}/${name}.svg`} {...otherProps} />
));
