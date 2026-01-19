import FontAwesomeIcon from '@hrworks/sui-core/FontAwesomeIcon';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import TextField from '@hrworks/sui-core/TextField';
import { generateLoremSentences } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

import { VerticalNavigation } from './VerticalNavigation';

const Form = (length: number) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(
      <Fragment key={i}>
        <GridItem size={6}>
          <TextField name="Vorname" value="" label="Vorname" />
        </GridItem>
        <GridItem size={6}>
          <TextField name="Nachname" value="" label="Nachname" />
        </GridItem>
        <GridItem size={6}>
          <TextField name="Anrede" value="" label="Anrede" />
        </GridItem>
        <GridItem size={6}>
          <TextField name="Title" value="" label="Title" />
        </GridItem>
        <GridItem size={12}>
          <TextField name="Telefon" value="" label="Telefon" />
        </GridItem>
        <GridItem size={12}>
          <TextField name="Private" value="" label="Private E-Mail" />
        </GridItem>
        <GridItem size={12}>
          <TextField name="Erste" value="" label="Erste Staatsangehörigkeit" />
        </GridItem>
      </Fragment>,
    );
  }

  return <Grid>{data}</Grid>;
};

const StartItem = () => (
  <div>
    <h1>HERZLICH WILLKOMMEN</h1>
    <p>
      Wir freuen uns, dass Sie Teil unseres teams werden. Bitte füllen Sie die angegebenen Felder asu, so können wir
      alles für Ihren Start bei uns vorbereiten.
    </p>
    <p>{generateLoremSentences(4)}</p>
  </div>
);

const meta = {
  title: 'Components/Navigation/VerticalNavigation',
  component: VerticalNavigation,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: [
      {
        navigationTitle: 'Stammdaten',
        showTopArrowBar: false,
        bottomArrowDescription: 'Los gehts',
        children: StartItem(),
        id: '0',
        onTopArrowClick: () => alert('Test'),
      },
      {
        navigationTitle: 'Stammdaten',
        navigationIcon: <FontAwesomeIcon name="user" />,
        description:
          'Bitte tragen Sie für Ihren Start am 01.03.2023 hier Ihre persönlichen Daten ein, um Ihnen und uns den Einstieg zu erleichtern.',
        children: Form(5),
        id: '1',
        onTopArrowClick: () => alert('Test'),
      },
      {
        navigationTitle: 'Adresse',
        description: 'Geben Sie hier Ihre Adressdaten an, damit Ihr neuer Arbeitgeber HRworks Sie erreichen kann.',
        children: Form(1),
        id: '2',
        navigationIcon: <FontAwesomeIcon name="house" />,
      },
      {
        navigationTitle: 'Lohnabrechnung',
        children: Form(3),
        description: 'Tragen Sie hier Ihre Bankdaten für Ihren neuen Arbeitgeber ein.',
        id: '3',
        navigationIcon: <FontAwesomeIcon name="money-bill" />,
      },
      {
        navigationTitle: 'Urlaubsbescheinigung',
        children: Form(2),
        description:
          'Laden Sie hier Ihre Urlaubsbescheinigung hoch, damit Ihr neuer Arbeitgeber Ihren Urlaubsanspruch korrekt ermitteln kann.',
        id: '4',
        navigationIcon: <FontAwesomeIcon name="file" />,
      },
      {
        navigationTitle: 'Compliance Management Dokument',
        children: Form(3),
        description:
          'das Bestätigen der Compliance Management Dokumente ist nötig um das Onbarding zu verollständigen.',
        id: '5',
        topArrowDescription: 'zurück',
        navigationIcon: <FontAwesomeIcon name="clipboard-list" />,
      },
      {
        navigationTitle: 'Weitere Angaben',
        children: Form(1),
        description: 'Hier können Sie zusätzliche Angaben für Ihren neuen Arbeitgeber hinterlegen.',
        id: '6',
        bottomArrowDescription: 'Fertig stellen',
        onBottomArrowClick: () => alert('Klick auf fertigstellen'),
        navigationIcon: <FontAwesomeIcon name="pen" />,
        bottomArrowIcon: <>&times;</>,
      },
    ],
  },
} satisfies Meta<typeof VerticalNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
