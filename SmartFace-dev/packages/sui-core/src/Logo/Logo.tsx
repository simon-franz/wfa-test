import { S } from './Logo.styles';
import type { LogoProps } from './Logo.types';

export const Logo = ({ alt, href, onClick, src, target, title, ...otherProps }: LogoProps) => {
  return (
    <S.LogoContainer {...otherProps}>
      <S.LogoLink href={href} target={target} onClick={onClick} tabIndex={onClick && 0}>
        {src && <S.Logo alt={alt} src={src} />}
        {title && (
          <S.Title overflowBehaviour="ellipsis" as="div">
            {title}
          </S.Title>
        )}
      </S.LogoLink>
    </S.LogoContainer>
  );
};
