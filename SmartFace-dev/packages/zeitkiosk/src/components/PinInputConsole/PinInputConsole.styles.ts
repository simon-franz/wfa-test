import styled from '@emotion/styled';
import _Text from '@hrworks/sui-core/Text';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center',
});

const TextOtpInputContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
});

const Text = styled(_Text)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingMd,
}));

const OtpContainer = styled.div({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  padding: 10,
});

export const S = {
  Container,
  TextOtpInputContainer,
  Text,
  OtpContainer,
} as const;
