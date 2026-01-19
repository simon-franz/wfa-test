// // @ts-check
// TODO Bitte ts-check wieder einkommentieren wenn DataGrid Story korrekten type hat
import { faker } from '@faker-js/faker';

import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';

let counter = 0;

export function createRandomUserWithOnClick(depth, { clickProbability = 0.7, forceClickOnRoot = false } = {}) {
  const hasOnClick = forceClickOnRoot || faker.datatype.boolean(clickProbability);

  const onClick = hasOnClick
    ? [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: {
              sideEffects: [
                {
                  type: 'addNotification',
                  message: `Row ${counter} wurde angeklickt`,
                },
              ],
            },
          },
        },
      ]
    : undefined;

  return {
    id: faker.string.uuid(),
    onClick,
    rows:
      depth > 0 &&
      faker.helpers.multiple(
        () => createRandomUserWithOnClick(depth - 1, { clickProbability, forceClickOnRoot: false }),
        { count: 5 },
      ),
    data: {
      number: `${counter++}`.padStart(4, '0'),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      templateAction: {
        color: faker.helpers.arrayElement(['primary', 'secondary', 'info', 'success', 'warning', 'danger']),
      },
      status: [
        badgeFactory(
          faker.helpers.arrayElement([
            { text: 'alive', color: 'success' },
            { text: 'deceased', color: 'danger' },
            { text: 'unknown', color: 'secondary' },
          ]),
        ),
      ],
      // avatar: faker.image.avatar(),
      avatar: 'https://place.dog/300/300',
      birthDate: faker.date.birthdate().toISOString().slice(0, 10),
      registeredAt: faker.date.past().toISOString().slice(0, 10),
      isCool: faker.datatype.boolean(),
      languagesAmount: faker.number.int({ min: 1, max: 4 }),
    },
  };
}
