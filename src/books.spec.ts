import { z } from 'zod'

import { BooksResult, booksResultSchema } from './books'

type BooksResultInput = z.input<typeof booksResultSchema>

const date = new Date()

const author21Uri = '/author/21'
const isbn = '978-3-16-148410-0'

const booksResultFixture: BooksResultInput = {
  items: [
    {
      id: 42,
      title: 'test',
      isbn,
      authors: [
        {
          id: 21,
        },
      ],
      createdAt: date,
      updatedAt: date,
    },
    {
      id: 43,
      title: 'test2',
      authors: [
        {
          id: 21,
        },
      ],
      createdAt: date,
      updatedAt: date,
    },
    {
      id: 41,
      title: 'test3',
      isbn: '978-3-16-148410-0',
      authors: [
        {
          id: 21,
        },
      ],
      createdAt: date,
      updatedAt: date,
    },
  ],
  meta: {
    currentPage: 1,
    itemCount: 3,
    itemsPerPage: 10,
  },
}

const booksResultFixtureExpected: BooksResult = {
  items: [
    {
      uri: '/book/42',
      title: 'test',
      authors: [author21Uri],
      isbn,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
    {
      uri: '/book/43',
      title: 'test2',
      authors: [author21Uri],
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
    {
      uri: '/book/41',
      title: 'test3',
      authors: [author21Uri],
      isbn,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  ],
  meta: {
    currentPage: 1,
    itemCount: 3,
    itemsPerPage: 10,
  },
}

describe('types::books', () => {
  describe('result', () => {
    it('parses a valid object', () => {
      expect(booksResultSchema.parse(booksResultFixture)).toStrictEqual(
        booksResultFixtureExpected,
      )
    })

    it('rejects an invalid object', () => {
      expect(() =>
        booksResultSchema.parse([
          {
            uri: '/unknown/42',
            name: 'Author 1',
          },
        ]),
      ).toThrow()
    })
  })
})
