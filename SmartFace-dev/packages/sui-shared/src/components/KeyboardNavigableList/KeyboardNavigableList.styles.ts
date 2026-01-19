import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

const List = styled.ul([resetListStyles]);

export const S = {
  List,
} as const;
