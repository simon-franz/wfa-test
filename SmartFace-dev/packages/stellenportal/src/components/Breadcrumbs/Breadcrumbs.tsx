'use client';

import IconButton from '@hrworks/sui-core/IconButton';
import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { ConditionalWrapper } from '@hrworks/sui-shared/components/ConditionalWrapper';
import { useRouter } from 'next/navigation';

import { S } from './Breadcrumbs.styles';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

// TODO: Can we remove this component in the future and replace it with the one from SUI?
export const Breadcrumbs = ({ breadcrumbs, ...otherProps }: BreadcrumbsProps) => {
  const router = useRouter();

  return (
    <S.Container {...otherProps}>
      <IconButton variant="unstyled" onClick={() => router.back()}>
        <MaterialDesignIcon name="arrow_back_ios" />
      </IconButton>
      {breadcrumbs?.map(({ label, href }) => (
        <S.Breadcrumb key={label}>
          <ConditionalWrapper
            key={href}
            condition={!!href}
            wrapper={(children) => <S.Link href={href || ''}>{children}</S.Link>}
          >
            {label}
          </ConditionalWrapper>
        </S.Breadcrumb>
      ))}
    </S.Container>
  );
};
