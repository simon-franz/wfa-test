import styled from '@emotion/styled';

const UploadButton = styled.div<{
  disabled?: boolean;
}>(({ disabled }) => ({
  display: 'contents',
  ...(disabled && {
    cursor: 'not-allowed',
  }),
}));

export const S = {
  UploadButton,
} as const;
