import { S } from './Breadcrumb.styles';
import type { BreadcrumbProps } from './Breadcrumb.types';
import { BreadcrumbContext } from './BreadcrumbContext';

export const Breadcrumb = ({ children, size, separator, uppercase, ...otherProps }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb">
    <BreadcrumbContext.Provider value={{ size, separator, uppercase }}>
      <S.BreadcrumbList {...otherProps}>{children}</S.BreadcrumbList>
    </BreadcrumbContext.Provider>
  </nav>
);
