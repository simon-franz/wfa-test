import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';

import { emailStyles } from './TwoFactorEmailTemplate.styles';
import type { TwoFactorEmailTemplateProps } from './TwoFactorEmailTemplate.types';

const {
  main,
  container,
  logoContainer,
  h1,
  section,
  h2,
  text,
  codeContainer,
  code: verificationCode,
  footer,
  footerText,
} = emailStyles;

export const TwoFactorEmailTemplate = ({ code, companyName = 'HRWorks' }: TwoFactorEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      Your {companyName} verification code: {code}
    </Preview>
    <Body css={main}>
      <Container css={container}>
        <Section css={logoContainer}>
          <Heading css={h1}>{companyName}</Heading>
        </Section>

        <Section css={section}>
          <Heading css={h2}>Your Verification Code</Heading>
          <Text css={text}>Please use the following verification code to complete your login:</Text>

          <Section css={codeContainer}>
            <Text css={verificationCode}>{code}</Text>
          </Section>

          <Text css={text}>
            This code will expire in <strong>10 minutes</strong> for your security.
          </Text>

          <Text css={text}>
            If you didnt request this code, please ignore this email or contact your administrator.
          </Text>
        </Section>

        <Section css={footer}>
          <Text css={footerText}>
            This is an automated message from {companyName}. Please do not reply to this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default TwoFactorEmailTemplate;
