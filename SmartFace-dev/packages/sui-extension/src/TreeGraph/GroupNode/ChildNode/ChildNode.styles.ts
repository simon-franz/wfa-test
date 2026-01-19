import styled from '@emotion/styled';
import type { TreeNodeVariant } from '@hrworks/types/shared/UiTypes';

import { S as TreeNodeStyles } from '../../TreeNode/TreeNode.styles';

type ContainerProps = {
  clickable: boolean;
  variant: TreeNodeVariant;
};

const Container = styled.div<ContainerProps>(({ theme, clickable, variant }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 4,
  rowGap: 4,
  overflow: 'hidden',
  ...(variant === 'highlighted' && {
    outline: `1px solid ${TreeNodeStyles.componentConfig(theme).highlightColor}`,
    borderRadius: theme.marko.variables.borderRadius.extraSmall,
  }),
  ...(variant === 'greyedOut' && {
    opacity: theme.marko.variables.opacity.medium,
  }),
  ...(clickable && {
    cursor: 'pointer',
  }),
}));

const Img = styled.img({
  width: 36,
  height: 36,
  borderRadius: '50%',
});

const TextContainer = styled.div({
  width: '100%',
});

export const S = {
  Container,
  Img,
  TextContainer,
} as const;
