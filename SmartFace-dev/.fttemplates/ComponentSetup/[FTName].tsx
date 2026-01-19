import { S } from './[FTName].styles';
import type { <FTName | capitalize>Props } from './[FTName].types';

export const <FTName | capitalize> = ({ children, ...otherProps }: <FTName | capitalize>Props) => (
  <S.Container {...otherProps}>{children}</S.Container>
);
