import { faker } from '@faker-js/faker';

import { defaultButton } from '../Button/ButtonDefaultProps';
import type { DataGridBackendProps } from '@hrworks/smartface/adapters/extension/DataGridAdapter/DataGridAdapter.types';

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

export const dataGridDefaultProps: DataGridBackendProps = {
  url: '/',
  toolbar: { columns: true, filter: true, density: true, export: true },
  clientSideSort: false,
  density: 'high',
  pinnedColumns: { left: ['isCool'] },
  sorts: [
    {
      id: 'number',
      direction: 'desc',
    },
  ],
  columnDefinitions: [
    { id: 'id', label: 'ID', type: 'string' },
    { id: 'number', label: 'Nr.', type: 'string', primarySortDirection: 'desc' },
    {
      id: 'templateAction',
      type: 'template',
      columnsMenuLabel: 'My Actions',
      data: defaultButton({ size: 'extraSmall' }),
    },
    { id: 'status', label: 'Status', type: 'componentChildren' },
    { id: 'avatar', label: 'Avatar', type: 'image', justifyContent: 'center', resizable: false },
    { id: 'firstName', label: 'Vorname', type: 'string', justifyContent: 'flex-end', sortable: true },
    { id: 'lastName', label: 'Nachname', type: 'string', resizable: true },
    { id: 'email', label: 'Email', type: 'string', minWidth: 250 },
    { id: 'birthDate', label: 'Geburtsdatum', type: 'date', pinnable: false },
    { id: 'registeredAt', label: 'Registriert am', type: 'date' },
    { id: 'isCool', label: 'Ist cool', type: 'boolean', justifyContent: 'center' },
    { id: 'languagesAmount', label: 'Anzahl Sprachen', type: 'number', justifyContent: 'flex-end' },
  ],
  rows: Array.from({ length: 50 }).map((_, _i) => createRandomUser()),
};
