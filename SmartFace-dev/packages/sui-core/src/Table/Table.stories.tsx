import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, type ReactNode, useState } from 'react';

import { Table } from './Table';
import type { TableProps } from './Table.types';
import { TableBody } from './TableBody';
import { TableData } from './TableData';
import { TableDataRow } from './TableDataRow';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableHeaderRow } from './TableHeaderRow';

const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  render: function Component(args) {
    const [columns, setColumns] = useState<number>(3);
    const [headerRows, setHeaderRows] = useState<number>(1);
    const [dataRows, setDataRows] = useState<number>(7);

    const onColumnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      value >= 0 && setColumns(value);
    };

    const onHeaderInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      value >= 0 && setHeaderRows(value);
    };

    const onDataInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number.parseInt(event.target.value, 10);
      value >= 0 && setDataRows(value);
    };

    return (
      <>
        <div>
          Number of Columns: <input type="number" value={columns} size={2} onChange={onColumnInputChange} />
        </div>
        <div>
          Number of Header Rows: <input type="number" value={headerRows} size={2} onChange={onHeaderInputChange} />
        </div>
        <div>
          Number of Data Rows: <input type="number" value={dataRows} size={2} onChange={onDataInputChange} />
        </div>
        <hr />
        <Table {...args}>
          {createTableHead(headerRows, columns)}
          {createTableBody(dataRows, columns)}
        </Table>
      </>
    );
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const createReactNodes = (count: number, render: (index: number) => ReactNode) =>
  Array.from({ length: count }).map((_, index) => render(index));

const createTableHead = (
  rows: number,
  columns: number,
  cellRender: (index: number) => ReactNode = (index) => <TableHeader key={index}>Header</TableHeader>,
) => (
  <TableHead>
    {createReactNodes(rows, (index) => (
      <TableHeaderRow key={index}>{createReactNodes(columns, cellRender)}</TableHeaderRow>
    ))}
  </TableHead>
);

const createTableBody = (
  rows: number,
  columns: number,
  cellRender: (index: number) => ReactNode = (index) => <TableData key={index}>Data</TableData>,
) => (
  <TableBody>
    {createReactNodes(rows, (index) => (
      <TableDataRow key={index}>{createReactNodes(columns, cellRender)}</TableDataRow>
    ))}
  </TableBody>
);

const TABLE_PROPS: TableProps = {};

export const Default: Story = {
  args: TABLE_PROPS,
};

export const Scrollable: Story = {
  args: {
    ...TABLE_PROPS,
    stickyHead: true,
  },
};
