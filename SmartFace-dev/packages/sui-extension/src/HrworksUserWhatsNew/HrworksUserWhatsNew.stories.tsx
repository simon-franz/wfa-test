import Badge from '@hrworks/sui-core/Badge';
import Hero, { HeroTitle } from '@hrworks/sui-core/Hero';
import Switch from '@hrworks/sui-core/Switch';
import { generateLoremParagraphs, generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';
import type { Meta, StoryObj } from '@storybook/react';

import { Content, HrworksUserWhatsNew, NewsItem, PreviousNews, Spotlight } from './';

const testPdf = 'https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf';
const hero = (
  <Hero src="https://images.pexels.com/photos/925786/pexels-photo-925786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
    <HeroTitle subtitle="Erfahren Sie mehr über die Neusten Features Ihrer HR-Software. Entdecken Sie hier jede einzelne Details der neusten wie auch vergangene Updates um Immer auf dem neusten Stand zu bleiben">
      What's New
    </HeroTitle>
    <Switch label="Admin News" name="test" />
  </Hero>
);
const newsItems = (
  <>
    <NewsItem
      title="HRworks News 3.119"
      date="25.10.2024"
      tags={['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline']}
      contentSrc={testPdf}
      key={1}
    />
    <NewsItem
      title="HRworks News 3.118"
      date="25.09.2024"
      tags={['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline']}
      contentSrc={testPdf}
      key={12}
    />
    <NewsItem
      title="HRworks News 3.117"
      date="25.10.2024"
      tags={['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline']}
      contentSrc={testPdf}
      key={13}
    />
    <NewsItem
      title="HRworks News 3.116"
      date="25.10.2024"
      tags={['Neues Feature', 'Nedir', 'Alex', 'Fabian', 'Jacqueline']}
      contentSrc={testPdf}
      key={14}
    />
  </>
);

const meta = {
  title: 'Components/Data Display/HrworksUserWhatsNew',
  component: HrworksUserWhatsNew,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    children: (
      <>
        {hero}
        <Content>
          <Spotlight
            date="24.12.2024"
            tags={['Zeitwirtschaft', 'Reisekosten', 'Onboarding']}
            contentSrc="https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf"
            imgSrc="https://raw.githubusercontent.com/dy0gu/dy0gu/main/shrek.gif"
            statusBadge={
              <Badge animation="pulsing" color="info">
                Demnächst verfügbar
              </Badge>
            }
          >
            <span>{generateLoremParagraphs(3)}</span>
          </Spotlight>
          <PreviousNews>{newsItems}</PreviousNews>
        </Content>
      </>
    ),
  },
} satisfies Meta<typeof HrworksUserWhatsNew>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OverflowTest: Story = {
  args: {
    children: (
      <>
        {hero}
        <Content>
          <Spotlight
            date="24.12.2024"
            tags={['Zeitwirtschaft', 'Reisekosten', 'Onboarding']}
            contentSrc="https://d9yw7530xbzu.cloudfront.net/assets/V15DetectUserManual.pdf"
            imgSrc="https://raw.githubusercontent.com/dy0gu/dy0gu/main/shrek.gif"
            statusBadge={
              <Badge animation="pulsing" color="info">
                Demnächst verfügbar
              </Badge>
            }
          >
            <span>{generateLoremParagraphs(8)}</span>
          </Spotlight>
          <PreviousNews>
            <NewsItem
              title={generateLoremWords(18)}
              date={generateLoremWords(18)}
              tags={[
                'Neues Feature',
                'Nedir',
                'Alex',
                'Fabian',
                'Jacqueline',
                'Neues Feature',
                'Nedir',
                'Alex',
                'Fabian',
                'Jacqueline',
              ]}
              contentSrc={testPdf}
              key={13}
            />
            {newsItems}
          </PreviousNews>
        </Content>
      </>
    ),
  },
};
