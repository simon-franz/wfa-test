import type { Meta, StoryObj } from '@storybook/react';

import { OnboardingWelcomePage } from './OnboardingWelcomePage';

const meta = {
  title: 'Components/Feedback/OnboardingWelcomePage',
  component: OnboardingWelcomePage,
  tags: ['autodocs'],
} satisfies Meta<typeof OnboardingWelcomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Herzlich Willkommen',
    children:
      'Wir freuen uns, dass Sie Teil unseres Teams werden. Bitte füllen Sie die angegebenen Felder aus, So können wir alles fur Ihren Start bei uns vorbereiten. Uber den Speichern Button können Sie jederzeit Ihren Zwischenstand abspeichern. Mit Fertigstellen schließen Sie das Onboarding ab, eine weitere Bearbeitung ist anschließend nicht mehr moglich. Werden Felder zwingend benótigt oder sind nicht korrekt ausgefülit, wird Ihnen ein entsprechender Fehler angezeigt.',
    footerChildren: 'Bitte füllen Sie das Dokument vollständig aus.',
  },
};
