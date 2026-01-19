import styled from '@emotion/styled';

const Slot = styled.div<{ isActive: boolean }>(({ theme }) => ({
  position: 'relative',
  width: '1.875rem',
  height: '1.875rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.sqwTier2Color.border.selected}`,
  borderRadius: '50%',
  backgroundColor: `transparent`,
}));

const MaskedInput = styled.div(({ theme }) => ({
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: '50%',
  backgroundColor: theme.sqwTier2Color.icon.selected,
}));

export const S = { Slot, MaskedInput } as const;
