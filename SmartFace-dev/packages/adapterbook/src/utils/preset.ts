import type { LogoBackendProps } from '@hrworks/smartface/types/shared/BackendTypes';
import {
  generateLoremParagraphs,
  generateLoremSentences,
  generateLoremWords,
} from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from './eventFunctions/addNotification';

const logoUrl = 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png';

const getImageUrl = (width = 500, height = 500) => `https://placedog.net/${width}/${height}`;

const pdfUrl = 'https://api.printnode.com/static/test/pdf/multipage.pdf';

const testUrl = 'https://info.cern.ch/';

const logoDefaultProps: LogoBackendProps = {
  src: logoUrl,
  alt: generateLoremWords(),
  title: generateLoremWords(),
  href: '/',
  target: '_blank',
  onClick: [addNotification()],
};

const formDefaultProps = {
  label: generateLoremWords(),
  name: generateLoremWords(),
  'aria-label': generateLoremWords(),
  helpText: generateLoremWords(),
  validationMessage: generateLoremParagraphs(),
  size: 'medium',
  mandatory: true,
  disabled: false,
} as const;

const chartDefaultProps = {
  tooltip: true,
  dataLabel: true,
  tooltipPostfix: '%',
  noDataText: generateLoremSentences(),
  dataHover: true,
  colorSet: 'primary',
  legend: {
    enabled: true,
    interactive: true,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'middle',
  },
} as const;

const dateFieldDefaultProps = {
  presentation: 'dropdown',
  showMonthAndYearPicker: true,
} as const;

export const preset = {
  logoUrl,
  getImageUrl,
  pdfUrl,
  testUrl,
  logoDefaultProps,
  formDefaultProps,
  chartDefaultProps,
  dateFieldDefaultProps,
};
