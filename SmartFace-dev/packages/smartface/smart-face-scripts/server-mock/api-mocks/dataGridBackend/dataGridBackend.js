// @ts-check

import { faker } from '@faker-js/faker';

import { createRandomUser } from './createRandomUser.js';

const getResult = async ({ page = 0, pageSize = 50, depth = 0 }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: { rows: faker.helpers.multiple(() => createRandomUser(depth), { count: pageSize }) },
    pagination: {
      more: page > 20,
      page: page + 1,
    },
  };
};

/** @type {import('express').Handler}  */
export default async (req, res) => {
  res.send(await getResult({ page: req.body.page, pageSize: req.body.pageSize, depth: req.body.depth }));
};
