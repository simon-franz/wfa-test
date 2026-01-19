import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

const BreadcrumbList = styled.ol([
  resetListStyles,
  {
    display: 'flex',
    flexWrap: 'wrap',
  },
]);

export const S = {
  BreadcrumbList,
} as const;
