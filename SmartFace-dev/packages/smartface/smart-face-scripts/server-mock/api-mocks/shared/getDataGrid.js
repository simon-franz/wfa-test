import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { dataGridFactory } from '../../../../shared/smartFaceComponentFactories/extension/dataGridFactory.js';
import { createRandomUser } from '../dataGridBackend/createRandomUser.js';
import { patchFactory } from './patchFactory.js';

// DataGridType
export const getDataGrid = (props, dataGridSfId) =>
  dataGridFactory(
    {
      url: '/data-grid-backend',
      //toolbar: false,
      toolbar: { columns: true, filter: true, density: true, export: true },
      // disableUnsort: true,
      clientSideSort: true,
      columnDefinitions: [
        { id: 'id', label: 'ID', type: 'string' },
        { id: 'number', label: 'Nr.', type: 'string', primarySortDirection: 'desc' },
        {
          id: 'templateAction',
          type: 'template',
          columnsMenuLabel: 'My Actions',
          data: buttonFactory(),
        },
        { id: 'status', label: 'Status', type: 'componentChildren' },
        { id: 'avatar', label: 'Avatar', type: 'image', align: 'center', resizable: false }, // Commented out to prevent (many?) unnecessary requests to placekitten
        { id: 'firstName', label: 'Vorname', type: 'string', align: 'end', editable: true },
        { id: 'lastName', label: 'Nachname', type: 'string', editable: true },
        { id: 'email', label: 'Email', type: 'string', minWidth: 250 },
        { id: 'birthDate', label: 'Geburtsdatum', type: 'date', pinnable: false },
        { id: 'registeredAt', label: 'Registriert am', type: 'date' },
        { id: 'isCool', label: 'Ist cool', type: 'boolean', align: 'center' },
        { id: 'languagesAmount', label: 'Anzahl Sprachen', type: 'number', align: 'right' },
      ],
      rows: Array.from({ length: 50 }).map((_, _i) => createRandomUser(2)),
      onFetchRows: [
        {
          type: 'request',
          data: {},
          url: 'http://localhost:4000/api/data-grid-backend',
          blockUi: false,
        },
      ],
      onSortsChange: [
        {
          type: 'request',
          blockUi: false,
          data: {
            backendLoad: 1000,
            action: 'reflect',
            reflectedData: patchFactory([
              {
                targetSfId: dataGridSfId,
                operation: 'write',
                path: 'props.rows',
                value: Array.from({ length: 50 }).map((_, _i) => createRandomUser(0)),
              },
            ]),
          },
        },
      ],
      ...props,
    },
    dataGridSfId,
    'data-guide-test',
  );
