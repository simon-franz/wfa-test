import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { DataGrid } from './DataGrid';
import type { DataGridProps } from './DataGrid.types';

const createRandomUser = () => {
  const id = faker.string.uuid();

  return {
    id,
    data: {
      id,
      number: faker.string.numeric(4).padStart(4, '0'),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(['alive', 'deceased', 'unknown']),
      birthDate: faker.date.birthdate().toISOString().slice(0, 10),
      registeredAt: faker.date.past().toISOString().slice(0, 10),
      isCool: faker.datatype.boolean(),
      languagesAmount: faker.number.int({ min: 1, max: 4 }),
    },
  };
};

const meta = {
  title: 'Components/Data Display/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  args: {
    rows: Array.from({ length: 50 }, createRandomUser),
    columnDefinitions: [
      { id: 'id', type: 'string', label: 'ID', width: 100 },
      { id: 'number', type: 'string', label: 'Nr.', width: 100 },
      { id: 'firstName', type: 'string', label: 'First Name', width: 150 },
      { id: 'lastName', type: 'string', label: 'Last Name', width: 150 },
      { id: 'email', type: 'string', label: 'Email', width: 200 },
      { id: 'status', type: 'string', label: 'Status', width: 100 },
      { id: 'birthDate', type: 'date', label: 'Birth Date', width: 150 },
      { id: 'registeredAt', type: 'date', label: 'Registered At', width: 150 },
      { id: 'isCool', type: 'boolean', label: 'Is Cool', width: 100 },
      { id: 'languagesAmount', type: 'number', label: 'Languages Amount', width: 150 },
    ],
    onColumnDefinitionsChange: () => console.log('Column definitions changed'),
    pinnedColumns: {},
    onPinnedColumnsChange: () => console.log('Pinned columns changed'),
    sorts: [],
    onSortsChange: async () => console.log('Sorts changed'),
    toolbar: true,
    onFetchRows: async () => console.log('Fetching rows'),
    clientSideSort: true,
    onDensityChange: () => console.log('Density changed'),
    density: 'low',
    loadingAnimation: true,
  },
} satisfies Meta<typeof DataGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FullHeight: Story = {
  args: {
    ...Default.args,
    fullHeight: true,
  },
  parameters: { layout: 'fullscreen' },
};

export const CustomDensity: Story = {
  args: {
    ...Default.args,
    density: 'high',
  },
};

export const ClientSideSorting: Story = {
  render: (args) => {
    const ClientSideSortingWrapper = () => {
      const [sorts, setSorts] = useState<DataGridProps['sorts']>([]);

      const handleSortsChange: DataGridProps['onSortsChange'] = async (newSorts) => {
        setSorts(newSorts);
      };

      return <DataGrid {...args} sorts={sorts} onSortsChange={handleSortsChange} clientSideSort={true} />;
    };

    return <ClientSideSortingWrapper />;
  },
};

export const PinnedColumns: Story = {
  args: {
    ...Default.args,
    pinnedColumns: {
      right: ['email'],
    },
  },
};

export const CustomToolbar: Story = {
  args: {
    ...Default.args,
    toolbar: {
      columns: true,
      filter: true,
      density: true,
      export: { csv: true, xlsx: true },
    },
  },
};

export const LoadingAnimation: Story = {
  args: {
    ...Default.args,
    loadingAnimation: true,
    onFetchRows: () => new Promise((resolve) => setTimeout(resolve, 2000)),
  },
};

export const LazyLoading: Story = {
  render: (args) => {
    const LazyLoadingWrapper = () => {
      const [rows, setRows] = useState(args.rows);

      const fetchMoreRows = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setRows((prevRows) => [...prevRows, ...args.rows]);
      }, []);

      return <DataGrid {...args} rows={rows} onFetchRows={fetchMoreRows} />;
    };

    return <LazyLoadingWrapper />;
  },
  args: {
    ...Default.args,
    loadingAnimation: true,
  },
};
