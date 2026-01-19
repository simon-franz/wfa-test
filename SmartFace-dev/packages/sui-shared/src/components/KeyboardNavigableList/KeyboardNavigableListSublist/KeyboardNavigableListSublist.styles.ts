import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

const SubList = styled.ul(resetListStyles);

export const S = {
  SubList,
} as const;
