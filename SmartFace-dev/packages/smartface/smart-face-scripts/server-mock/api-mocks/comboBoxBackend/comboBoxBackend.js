// @ts-check

import { faker } from '@faker-js/faker';

import getId from '../../../../shared/getId.js';

const staticItems = ['1. My specific item', '*My second specific (item)'].map((text, id) => ({
  id: `specific-item-${id}`,
  text,
}));

const generatedItems = faker.helpers.multiple(() => ({ id: getId(), text: faker.person.fullName() }), { count: 2000 });

const paginatedItems = [...staticItems, ...generatedItems];

const paginatedItemsQueryCache = new Map();

const getOptions = async ({ page = 1, query = '' }) => {
  const stepWidth = 50;
  page = page - 1;
  await new Promise((resolve) => setTimeout(resolve, 500));
  const queriedItems = paginatedItemsQueryCache.has(query)
    ? paginatedItemsQueryCache.get(query)
    : paginatedItems.filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()));
  if (!paginatedItemsQueryCache.has(query)) {
    paginatedItemsQueryCache.set(query, queriedItems);
  }

  const startIndex = 0 + page * stepWidth;
  const slicedItems = queriedItems.slice(startIndex, startIndex + stepWidth);

  slicedItems[0] && slicedItems[0].text !== 'Keine' && slicedItems.unshift({ id: getId(), text: 'Keine' });

  return {
    data: {
      results: slicedItems,
      pagination: {
        more: !!slicedItems.length && !!queriedItems.length && slicedItems.at(-1).id !== queriedItems.at(-1).id,
      },
    },
  };
};

/** @type {import('express').Handler}  */
export default async (req, res) => {
  res.send(await getOptions({ query: req.body.query, page: req.body.page }));
};
