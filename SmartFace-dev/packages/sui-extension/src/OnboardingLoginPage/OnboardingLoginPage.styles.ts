import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';
import { Scroller } from '@hrworks/sui-core/Scroller';
import _Title from '@hrworks/sui-core/Title';

const Container = styled(Scroller)({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FormContainer = styled.div({
  maxWidth: 1000,
  width: '33%',
  [mq['<=lg']]: {
    width: '50%',
  },
  [mq['<=md']]: {
    width: '75%',
  },
  [mq['<=sm']]: {
    padding: '0 30px',
    width: '100%',
  },
});

const Title = styled(_Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.title,
  marginBottom: 30,
  fontSize: '2.5rem',
}));

export const S = {
  Container,
  FormContainer,
  Title,
} as const;
