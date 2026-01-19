import styled from '@emotion/styled';

const DropzoneManager = styled.div({
  display: 'grid',
  height: '100%',
  width: '100%',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 50,
  padding: 50,
});

export const S = {
  DropzoneManager,
} as const;
