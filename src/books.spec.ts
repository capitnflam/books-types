import { z } from 'zod'

import { BooksResult, booksResultSchema } from './books'

type BooksResultInput = z.input<typeof booksResultSchema>

const date = new Date()

const author21Uri = '/authors/21'
const isbn = '978-3-16-148410-0'

const booksResultFixture: BooksResultInput = {
  data: [
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
    totalItems: 3,
    itemsPerPage: 10,
    sortBy: [],
  },
  links: {
    current: '/books?page=1',
  },
}

const booksResultFixtureExpected: BooksResult = {
  data: [
    {
      uri: '/books/42',
      title: 'test',
      authors: [author21Uri],
      isbn,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
    {
      uri: '/books/43',
      title: 'test2',
      authors: [author21Uri],
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
    {
      uri: '/books/41',
      title: 'test3',
      authors: [author21Uri],
      isbn,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  ],
  meta: {
    currentPage: 1,
    totalItems: 3,
    itemsPerPage: 10,
    sortBy: [],
  },
  links: {
    current: '/books?page=1',
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
