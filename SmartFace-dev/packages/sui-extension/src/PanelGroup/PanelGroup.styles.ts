import styled from '@emotion/styled';

type WrapperProps = {
  isNestedInPanelGroup: boolean;
  fullHeight?: boolean;
};

const Wrapper = styled.div<WrapperProps>(({ fullHeight, isNestedInPanelGroup }) => ({
  height: fullHeight || isNestedInPanelGroup ? '100%' : 500,
}));

export const S = {
  Wrapper,
} as const;
