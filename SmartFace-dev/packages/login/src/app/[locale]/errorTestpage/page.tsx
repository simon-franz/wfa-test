'use client';

import Button from '@hrworks/sui-core/Button';
import Flexbox from '@hrworks/sui-core/Flexbox';
import FlexboxItem from '@hrworks/sui-core/FlexboxItem';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import Text from '@hrworks/sui-core/Text';
import Title from '@hrworks/sui-core/Title';
import Tooltip from '@hrworks/sui-core/Tooltip';
import { captureException, getClient } from '@sentry/nextjs';
import { notFound } from 'next/navigation';
import { useState } from 'react';

import { S } from './ErrorTestpage.styles';

process.env.NEXT_PUBLIC_REALM !== 'local' && notFound();

const ErrorBoundaryTestComponent = () => {
  throw new Error('ErrorBoundary Test: React Component Render Failure');
};

const ErrorTestpage = () => {
  const [showErrorBoundaryTest, setShowErrorBoundaryTest] = useState(false);

  const testErrorBoundary = () => {
    console.log('Testing Error Boundary (render error)');
    setShowErrorBoundaryTest(true);
  };

  const testUncaughtError = () => {
    console.log('Testing uncaught async error');
    setTimeout(() => {
      throw new Error('Async Error Test: Unhandled Promise/Timeout Exception');
    }, 100);
  };

  const testManualCapture = () => {
    console.log('Testing manual error capture');
    try {
      throw new Error('Manual Capture Test: Controlled Error with Custom Context');
    } catch (error) {
      console.log('About to call captureException...');
      console.log('Sentry client:', getClient());
      const result = captureException(error, {
        tags: {
          component: 'ErrorTestPage',
          location: 'manual-capture',
        },
      });
      console.log('captureException result:', result);
      console.error('Manually captured error:', error);
    }
  };

  const testCustomEvent = () => {
    console.log('Testing custom Sentry event');
    captureException(new Error('Custom Event Test: Application Telemetry with Metadata'), {
      tags: {
        testType: 'telemetry-event',
        category: 'error-testing',
        severity: 'low',
      },
      extra: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        testPurpose: 'Demonstrating custom event logging with rich metadata',
      },
      level: 'warning',
    });
  };

  return (
    <>
      {showErrorBoundaryTest && <ErrorBoundaryTestComponent />}
      <S.Container flexDirection="column" alignItems="center" gap="large">
        <FlexboxItem>
          <S.HeaderSection>
            <Flexbox flexDirection="column" alignItems="center">
              <FlexboxItem>
                <Title size="extraLarge">Error Testpage</Title>
              </FlexboxItem>
              <FlexboxItem>
                <Text color="secondary" textAlign="center">
                  Only available in dev-mode & tests for sentry error handling and StatusPage
                </Text>
              </FlexboxItem>
              <FlexboxItem>
                <Text textAlign="center">
                  Check errors in the{' '}
                  <Text
                    href="https://hrworks.sentry.io/insights/projects/login-server/?issuesType=all&project=4509904836952144&statsPeriod=10m"
                    target="_blank"
                    underlined
                    color="info"
                  >
                    Sentry Dashboard (login-server project)
                  </Text>
                </Text>
              </FlexboxItem>
            </Flexbox>
          </S.HeaderSection>
        </FlexboxItem>

        <FlexboxItem>
          <S.ButtonSection>
            <Grid>
              <GridItem>
                <S.SectionTitle>Error Boundary Tests (Shows Server Status Page)</S.SectionTitle>
              </GridItem>
              <GridItem>
                <Flexbox gap="small" alignItems="center">
                  <FlexboxItem flexGrow={1}>
                    <Button onClick={testErrorBoundary} color="danger" fullWidth>
                      Test Error Boundary: Critical Error
                    </Button>
                  </FlexboxItem>
                  <FlexboxItem>
                    <Tooltip text="This error occurs during React component rendering. The ErrorBoundary catches it and displays the ServerStatus fallback page to users. Sentry automatically receives the error with full React component stack trace for debugging.">
                      <StreamlineIcon name="information-circle" />
                    </Tooltip>
                  </FlexboxItem>
                </Flexbox>
              </GridItem>
              <GridItem>
                <S.SectionTitle>Sentry Logging Tests (Background Only)</S.SectionTitle>
              </GridItem>
              <GridItem>
                <Flexbox gap="small" alignItems="center">
                  <FlexboxItem flexGrow={1}>
                    <Button onClick={testUncaughtError} color="warning" fullWidth>
                      Test Uncaught Async Error
                    </Button>
                  </FlexboxItem>
                  <FlexboxItem>
                    <Tooltip text="This error happens outside React's render cycle (in async callbacks like setTimeout). The browser's global error handlers catch it automatically. Users see no UI changes, but Sentry receives the error in the background for monitoring.">
                      <StreamlineIcon name="information-circle" />
                    </Tooltip>
                  </FlexboxItem>
                </Flexbox>
              </GridItem>
              <GridItem>
                <Flexbox gap="small" alignItems="center">
                  <FlexboxItem flexGrow={1}>
                    <Button onClick={testManualCapture} color="info" fullWidth>
                      Test Manual Error Capture
                    </Button>
                  </FlexboxItem>
                  <FlexboxItem>
                    <Tooltip text="This demonstrates proper error handling where errors are caught in try-catch blocks. The error is handled gracefully without affecting the user experience, and we manually send it to Sentry with custom context and tags for better debugging.">
                      <StreamlineIcon name="information-circle" />
                    </Tooltip>
                  </FlexboxItem>
                </Flexbox>
              </GridItem>
              <GridItem>
                <Flexbox gap="small" alignItems="center">
                  <FlexboxItem flexGrow={1}>
                    <Button onClick={testCustomEvent} color="success" fullWidth>
                      Test Custom Event with Tags
                    </Button>
                  </FlexboxItem>
                  <FlexboxItem>
                    <Tooltip text="This creates a custom Sentry event with rich metadata (tags, extra data, custom severity level). No actual error occurs - it's pure telemetry for tracking application state, user actions, or business logic events.">
                      <StreamlineIcon name="information-circle" />
                    </Tooltip>
                  </FlexboxItem>
                </Flexbox>
              </GridItem>
            </Grid>
          </S.ButtonSection>
        </FlexboxItem>

        <FlexboxItem>
          <S.InstructionsContainer>
            <Flexbox flexDirection="column">
              <FlexboxItem>
                <Title>How to use:</Title>
              </FlexboxItem>
              <FlexboxItem>
                <Flexbox flexDirection="column" gap="small">
                  <FlexboxItem>
                    <S.InstructionItem>
                      <strong>Error Boundary:</strong>
                      <br />
                      Simulates a critical React component crash during rendering. When triggered, the ErrorBoundary
                      component catches the error and displays the ServerStatus fallback page to prevent the entire
                      application from crashing. Sentry automatically captures this error with full React component
                      stack traces.
                    </S.InstructionItem>
                  </FlexboxItem>
                  <FlexboxItem>
                    <S.InstructionItem>
                      <strong>Uncaught Async Error:</strong>
                      <br />
                      Throws an error inside an asynchronous callback (setTimeout) that occurs outside Reacts lifecycle.
                      The browsers global error handlers (window.onerror) automatically catch this error. Users
                      experience no UI disruption, but the error is silently captured and sent to Sentry for monitoring.
                    </S.InstructionItem>
                  </FlexboxItem>
                  <FlexboxItem>
                    <S.InstructionItem>
                      <strong>Manual Error Capture:</strong>
                      <br />
                      Demonstrates proper error handling using try-catch blocks. The error is gracefully handled without
                      affecting the user interface, and we explicitly send it to Sentry using captureException() with
                      custom tags and context for enhanced debugging capabilities.
                    </S.InstructionItem>
                  </FlexboxItem>
                  <FlexboxItem>
                    <S.InstructionItem>
                      <strong>Custom Event with Tags:</strong>
                      <br />
                      Creates a custom Sentry event without throwing an actual error. This is used for application
                      telemetry, tracking user actions, or logging business logic events. The event includes custom
                      metadata like tags, extra data, and severity levels for comprehensive monitoring.
                    </S.InstructionItem>
                  </FlexboxItem>
                </Flexbox>
              </FlexboxItem>
              <FlexboxItem>
                <S.NoteText>
                  <strong>Note:</strong>
                  <br />
                  Check your browser console and Sentry dashboard for results.
                </S.NoteText>
              </FlexboxItem>
            </Flexbox>
          </S.InstructionsContainer>
        </FlexboxItem>
      </S.Container>
    </>
  );
};

export default ErrorTestpage;
