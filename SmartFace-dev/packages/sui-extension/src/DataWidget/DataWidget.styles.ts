import styled from '@emotion/styled';
import Title from '@hrworks/sui-core/Title';

// TODO: Remove explicit font-styles when title is using token-system.
const Value = styled(Title)(({ theme }) => theme.sqwTier2Typography.title);

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

export const S = {
  Value,
  Wrapper,
} as const;
