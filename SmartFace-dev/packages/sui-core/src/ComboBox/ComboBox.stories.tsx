import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ComboBoxProps } from './ComboBox.types';
import { ControlledComboBox } from './ControlledComboBox';
import type { HeadlessComboBoxOption } from './HeadlessComboBox';

const paginatedItems: Array<HeadlessComboBoxOption> = [
  { id: '1', text: 'Max Mustermann' },
  { id: '2', text: 'Anna Schmidt' },
  { id: '3', text: 'Peter Müller' },
  { id: '4', text: 'Lisa Weber' },
  { id: '5', text: 'Tom Fischer' },
  { id: '6', text: 'Sarah Wagner' },
  { id: '7', text: 'Michael Becker' },
  { id: '8', text: 'Julia Hoffmann' },
  { id: '9', text: 'David Schulz' },
  { id: '10', text: 'Laura Koch' },
];

const paginatedItemsQueryCache = new Map<string, Array<HeadlessComboBoxOption>>();

const getPaginatedResult: ComboBoxProps['getOptions'] = async (query = '', page = 1) => {
  const stepWidth = 50;
  page = page - 1;
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
  const queriedItems = paginatedItemsQueryCache.has(query)
    ? paginatedItemsQueryCache.get(query)!
    : paginatedItems.filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()));
  if (!paginatedItemsQueryCache.has(query)) {
    paginatedItemsQueryCache.set(query, queriedItems);
  }

  const startIndex = 0 + page * stepWidth;
  const slicedItems = queriedItems.slice(startIndex, startIndex + stepWidth);

  return {
    results: slicedItems,
    pagination: {
      more: !!slicedItems.length && !!queriedItems.length && slicedItems.at(-1)!.id !== queriedItems.at(-1)!.id,
    },
  };
};

const meta = {
  title: 'Components/Inputs/ComboBox',
  component: ControlledComboBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={{ height: 300, width: 500 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'ComboBox',
    label: 'ComboBox',
    name: 'ComboBox',
    value: null,
    query: '',
    getOptions: getPaginatedResult,
    onQueryChange: () => {},
    onValueChange: () => {},
  },
  render: function ComboBox(args: ComboBoxProps) {
    const [query, setQuery] = useState('');
    const [value, setValue] = useState<HeadlessComboBoxOption | null>(null);

    return (
      <ControlledComboBox {...args} value={value} query={query} onQueryChange={setQuery} onValueChange={setValue} />
    );
  },
} satisfies Meta<typeof ControlledComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dropdown: Story = { args: { presentation: 'dropdown' } };
export const Modal: Story = { args: { presentation: 'modal' } };
export const Multiple: Story = { args: { label: 'MultiComboBox', multiple: true } };
