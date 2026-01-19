import Badge from '@hrworks/sui-core/Badge';
import Button from '@hrworks/sui-core/Button';
import { Card } from '@hrworks/sui-core/Card/Card';
import { CardBody } from '@hrworks/sui-core/Card/CardBody/CardBody';
import { CardHeader } from '@hrworks/sui-core/Card/CardHeader/CardHeader';
import { CardTitle } from '@hrworks/sui-core/Card/CardTitle/CardTitle';
import CollapsibleMenu from '@hrworks/sui-core/CollapsibleMenu';
import CollapsibleMenuEntry from '@hrworks/sui-core/CollapsibleMenu/Entry';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import Image from '@hrworks/sui-core/Image';
import Page from '@hrworks/sui-core/Page';
import { StreamlineIcon } from '@hrworks/sui-core/StreamlineIcon';
import Text from '@hrworks/sui-core/Text';
import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenuEntry, SqwDropdownMenu } from '../SqwDropdownMenu';
import { SqwMenu } from '../SqwMenu';
import { SqwSearchField } from '../SqwSearchField';
import { SqwLayout } from './SqwLayout';

const itemsDropdown1 = (
  <>
    <DropdownMenuEntry
      submenu={
        <>
          <DropdownMenuEntry href="/">Meine heute fälligen Aufgaben</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Mir zugewiesene Aufgaben</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Anderen zugewiesene Aufgaben</DropdownMenuEntry>
        </>
      }
      badge={<Badge color="warning">2</Badge>}
      href="/"
    >
      Systemaufgaben
    </DropdownMenuEntry>
    <DropdownMenuEntry href="/" badge={<Badge color="warning">1</Badge>}>
      Aufgaben
    </DropdownMenuEntry>
    <DropdownMenuEntry href="/">Aufgabe erstellen</DropdownMenuEntry>
  </>
);

const itemsDropdown2 = (
  <>
    <DropdownMenuEntry>Telefonverzeichnis</DropdownMenuEntry>
    <DropdownMenuEntry>Firmeninformationen</DropdownMenuEntry>
    <DropdownMenuEntry>Ereignisse</DropdownMenuEntry>
    <DropdownMenuEntry
      submenu={
        <>
          <DropdownMenuEntry href="/">Diese Woche</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Nach Organisationseinheiten</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Nach Vorgesetzten</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Nach Betriebsstätten</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Individuelle Personenauswahl</DropdownMenuEntry>
          <DropdownMenuEntry href="/">Individuelle Gruppenauswahl</DropdownMenuEntry>
        </>
      }
      href="/"
    >
      Firmenkalender
    </DropdownMenuEntry>
  </>
);

const meta = {
  title: 'Components/Layout/SqwLayout',
  component: SqwLayout,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      // Fix Story leaking out of Container:
      // https://github.com/storybookjs/storybook/issues/8011
      <div css={{ transform: 'scale(1)', height: '100%' }}>
        <Page modals={[]} notifications={[]} onDismissNotification={() => {}}>
          <Story />
        </Page>
      </div>
    ),
  ],
  args: {
    header: {
      leftItems: (
        <>
          <SqwDropdownMenu
            title="Zu erledigen"
            icon={<StreamlineIcon name="list-to-do" />}
            badge={<Badge color="warning">3</Badge>}
            items={itemsDropdown1}
          />
          <SqwDropdownMenu title="Firmenübersicht" icon={<StreamlineIcon name="building-1" />} items={itemsDropdown2} />
        </>
      ),
      rightItems: (
        <>
          <SqwMenu title="Support" icon={<StreamlineIcon name="question-circle" />}>
            <Text href="/" color="info" fullWidth>
              HRworks Neuigkeiten
            </Text>
            <Text href="/" color="info" fullWidth>
              Helpcenter
            </Text>
            <Text href="/" color="info" fullWidth>
              Interaktive Touren
            </Text>
            <Text href="/" color="info" fullWidth>
              Datenschutzmodus aktivieren
            </Text>
          </SqwMenu>
          <SqwMenu
            title="Marko Guastella"
            subtitle="marko.guastella@hrworks.de"
            onPortraitAction={() => {
              console.log('Crop-Button-Clicked');
            }}
            portrait={
              <Image
                corner="circular"
                src="https://media.licdn.com/dms/image/C4E03AQGZLNO0sV3Xww/profile-displayphoto-shrink_200_200/0/1658742562603?e=2147483647&v=beta&t=QCox_o2DOfruw5BD3J_qw8F3PYCTgTPFXEZa--cJnCA"
              />
            }
          >
            <Text href="/" color="info" fullWidth>
              Mein Profil
            </Text>
            <Text href="/" color="info" fullWidth>
              Feedback geben
            </Text>
            <Button corner="pill" fullWidth>
              Abmelden
            </Button>
          </SqwMenu>
        </>
      ),
      logo: {
        src: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2021Relaunch/HRW_Logo_ohne_Claim_Weiss.png',
      },
    },
    sidebar: {
      upperSidebarChildren: (
        <>
          <SqwDropdownMenu
            presentation="collapsibleMenu"
            items={
              <>
                <DropdownMenuEntry
                  icon={<StreamlineIcon name="list-to-do" />}
                  badge={<Badge color="warning">3</Badge>}
                  submenu={itemsDropdown1}
                >
                  Zu erledigen
                </DropdownMenuEntry>
                <DropdownMenuEntry submenu={itemsDropdown2} icon={<StreamlineIcon name="building-1" />}>
                  Firmenübersicht
                </DropdownMenuEntry>
              </>
            }
          />
        </>
      ),
      children: (
        <>
          <CollapsibleMenu activeEntryId="1">
            <CollapsibleMenuEntry icon={<StreamlineIcon name="hierarchy-9" />} text="Dashboard" id="1" />
            <CollapsibleMenuEntry icon={<StreamlineIcon name="time-management" />} text="Zeitwirtschaft">
              <CollapsibleMenuEntry text="Jahresübersicht" />
              <CollapsibleMenuEntry text="Mobiles Arbeiten" />
              <CollapsibleMenuEntry text="Abwesenheiten" />
              <CollapsibleMenuEntry text="Krankmeldungen" />
              <CollapsibleMenuEntry text="Stellvertretungen" />
            </CollapsibleMenuEntry>
            <CollapsibleMenuEntry icon={<StreamlineIcon name="travel-management" />} text="Reisemanagement">
              <CollapsibleMenuEntry text="Reiseanträge" />
              <CollapsibleMenuEntry text="Reisekostenabrechnungen" />
              <CollapsibleMenuEntry text="Reisekosten Sammelerfassung" />
              <CollapsibleMenuEntry text="Zuzuordnende Belege" />
              <CollapsibleMenuEntry text="Digitale Belege" />
              <CollapsibleMenuEntry text="Erhaltene Vorschüsse" />
              <CollapsibleMenuEntry text="A1-Anträge" />
            </CollapsibleMenuEntry>
            <CollapsibleMenuEntry icon={<StreamlineIcon name="personnel-administration" />} text="Personalbereich">
              <CollapsibleMenuEntry text="Mitarbeitergespräche" />
              <CollapsibleMenuEntry text="Compliance Management Dokumente" />
              <CollapsibleMenuEntry text="Personalentwicklung" />
              <CollapsibleMenuEntry text="Dokumentenkorb" />
            </CollapsibleMenuEntry>
            <CollapsibleMenuEntry icon={<StreamlineIcon name="wage-salary" />} text="Lohn und Gehalt">
              <CollapsibleMenuEntry text="Gehalt" />
              <CollapsibleMenuEntry text="Lohnmonate" />
              <CollapsibleMenuEntry text="Steuererklärungsdaten" />
            </CollapsibleMenuEntry>
            <CollapsibleMenuEntry icon={<StreamlineIcon name="hammer-wench" />} text="Arbeitsmittel">
              <CollapsibleMenuEntry text="Arbeitsmittel" />
              <CollapsibleMenuEntry text="Arbeitsmittelanträge" />
            </CollapsibleMenuEntry>
          </CollapsibleMenu>
          <SqwSearchField
            name="Test"
            value={undefined!}
            aria-label="Search"
            placeholder="Suche"
            onSearchClick={() => {
              console.log('Search Clicked');
            }}
          />
        </>
      ),
    },
    content: {
      children: (
        <Grid size={6}>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardBody>Hier stehen ganz wichtige dinge</CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardBody>Hier stehen ganz wichtige dinge</CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardBody>Hier stehen ganz wichtige dinge</CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardBody>Hier stehen ganz wichtige dinge</CardBody>
            </Card>
          </GridItem>
        </Grid>
      ),
    },
  },
} satisfies Meta<typeof SqwLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
