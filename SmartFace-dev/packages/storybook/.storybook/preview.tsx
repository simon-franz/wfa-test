import type { Preview } from '@storybook/react';
import SuiProvider from '@hrworks/sui-core/SuiProvider';
import '@hrworks/design-system/styles/critical.css';
import styled from '@emotion/styled';
import { useDarkMode } from 'storybook-dark-mode';
import { themes } from '@storybook/theming';
import './styles.css';

const StoryContainer = styled.div(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: '1rem',
  backgroundColor: theme.sqwTier2Color.surface.sunken,
}));

const preview: Preview = {
  parameters: {
    darkMode: {
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      dark: themes.dark,
      light: themes.light,
    },
    layout: 'fullscreen',
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <SuiProvider theme={useDarkMode() ? 'dark' : 'light'}>
          <StoryContainer>
            <Story />
          </StoryContainer>
        </SuiProvider>
      );
    },
  ],
};

export default preview;
