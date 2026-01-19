import { useContext } from 'react';

import { BreadcrumbContext } from '../BreadcrumbContext';
import { S } from './BreadcrumbItem.styles';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';

export const BreadcrumbItem = ({
  children,
  href,
  target,
  underline = false,
  onClick,
  ...otherProps
}: BreadcrumbItemProps) => {
  const { size = 'medium', separator = 'arrow', uppercase = false } = useContext(BreadcrumbContext);

  const labelChildren = uppercase && typeof children === 'string' ? children.toUpperCase() : children;

  return (
    <S.BreadcrumbItemContainer size={size} separator={separator} {...otherProps}>
      {href || onClick ? (
        <S.BreadcrumbItemClickable
          size={size}
          variant="unstyled"
          href={href}
          target={target}
          onClick={onClick}
          $underline={underline}
        >
          {labelChildren}
        </S.BreadcrumbItemClickable>
      ) : (
        <S.BreadcrumbItem underline={underline}>{labelChildren}</S.BreadcrumbItem>
      )}
    </S.BreadcrumbItemContainer>
  );
};
