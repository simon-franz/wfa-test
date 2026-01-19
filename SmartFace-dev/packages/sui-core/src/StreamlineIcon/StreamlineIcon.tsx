import { S } from './StreamlineIcon.styles';
import type { StreamlineIconProps } from './StreamlineIcon.types';

const baseUrl = 'https://d1aq704nlrqnkz.cloudfront.net/icons/streamline/svgs/1_0_0';

export const StreamlineIcon = ({ name, ...otherProps }: StreamlineIconProps) => (
  <S.StyledSVGIcon src={`${baseUrl}/${name}.svg`} wrapper="span" {...otherProps} />
);
