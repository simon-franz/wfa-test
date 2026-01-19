import { mockComponents, mockData } from '@hrworks/cypress-utils/fixtures';
import { generateVisualTests, renderComponentWithTheme } from '@hrworks/cypress-utils/functions';
import times from 'lodash/times';

import { CommentList, CommentListItem, type CommentListItemProps, type CommentListProps } from './';

const renderCommentList = (props?: Partial<CommentListProps>) => {
  cy.viewport(1024, 768);
  renderComponentWithTheme(CommentList, { ...props });
};

const { overflowString, testString, testURL } = mockData;
const { Icon } = mockComponents;

const validURLs = [
  testURL,
  'www.example.com',
  'localhost:3000/api',
  'http://192.168.1.1:8080',
  'http://example.org/path/to/resource',
  'https://subdomain.example.co.uk/path?query=value#fragment',
  'https://www.bundesgesundheitsministerium.de/themen/gesundheitswesen/selbstverwaltung/kassenaerztliche-vereinigungen.html',
];

const invalidURLs = ['just text', 'email@example.com', 'ftp://example.com', 'https:// invalid space.com'];

const validUrlTest = [
  validURLs.map((url, index) => (
    <CommentListItem key={`valid-${index}`} timestamp={testString} signature={testString} text={`Valid: ${url}`} />
  )),
];

const invalidUrlTest = [
  invalidURLs.map((url, index) => (
    <CommentListItem key={`invalid-${index}`} timestamp={testString} signature={testString} text={`Invalid: ${url}`} />
  )),
];

const commentListItemProps: CommentListItemProps[] = [
  {
    signature: testString,
    text: testURL,
    timestamp: testString,
    toolbarChildren: Icon,
  },
  {
    signature: overflowString,
    text: overflowString,
    timestamp: overflowString,
    toolbarChildren: times(4, () => Icon),
  },
  {
    signature: overflowString,
    text: overflowString,
    timestamp: overflowString,
    toolbarChildren: times(40, () => Icon),
  },
];

const children = commentListItemProps.map((item, index) => <CommentListItem key={index} {...item} />);

context('CommentList', () => {
  describe('Visual-Test', () => {
    generateVisualTests({
      renderFn: renderCommentList,
      singleTests: {
        props: {
          children: [children, undefined],
        },
      },
      combinationTests: {
        combinations: [
          {
            props: {
              textUrlMaxLength: [1, 25, 100],
              children: [...validUrlTest],
            },
            config: {
              customScreenshotNames: {
                children: ['ValidURL'],
              },
            },
          },
          {
            props: {
              textUrlMaxLength: [1],
              children: [...invalidUrlTest],
            },
            config: {
              customScreenshotNames: {
                children: ['InvalidURL'],
              },
            },
          },
        ],
      },
    });
  });
});
