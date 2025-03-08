import { z } from 'zod'

import { CollectionsResult, collectionsResultSchema } from './collections'

type CollectionsResultInput = z.input<typeof collectionsResultSchema>

const date = new Date()

const collectionsResultFixture: CollectionsResultInput = [
  {
    id: 42,
    name: 'test',
    books: [
      {
        id: 21,
      },
    ],
    createdAt: date,
    updatedAt: date,
  },
  {
    id: 43,
    name: 'test2',
    books: [
      {
        id: 22,
      },
      {
        id: 23,
      },
      {
        id: 24,
      },
    ],
    createdAt: date,
    updatedAt: date,
  },
  {
    id: 41,
    name: 'test3',
    books: [
      {
        id: 21,
      },
    ],
    createdAt: date,
    updatedAt: date,
  },
]

const collectionsResultFixtureExpected: CollectionsResult = [
  {
    uri: '/collections/42',
    name: 'test',
    books: ['/books/21'],
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  },
  {
    uri: '/collections/43',
    name: 'test2',
    books: ['/books/22', '/books/23', '/books/24'],
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  },
  {
    uri: '/collections/41',
    name: 'test3',
    books: ['/books/21'],
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  },
]

describe('types::collections', () => {
  describe('result', () => {
    it('parses a valid object', () => {
      expect(
        collectionsResultSchema.parse(collectionsResultFixture),
      ).toStrictEqual(collectionsResultFixtureExpected)
    })

    it('rejects an invalid object', () => {
      expect(() =>
        collectionsResultSchema.parse([
          {
            uri: '/unknown/42',
            name: 'Author 1',
          },
        ]),
      ).toThrow()
    })
  })
})
