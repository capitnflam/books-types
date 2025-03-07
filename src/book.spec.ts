import { z } from 'zod'

import {
  BookRequest,
  BookResult,
  bookRequestSchema,
  bookResultSchema,
} from './book'

type BookRequestInput = z.input<typeof bookRequestSchema>
type BookResultInput = z.input<typeof bookResultSchema>

const date = new Date()

const coverURL = 'http://foo.bar/cover.jpg'
const author21Uri = '/author/21'

const bookResultFixture: BookResultInput = {
  id: 42,
  coverURL,
  title: 'test',
  synopsis: 'test synopsis\nnewline',
  isbn: '978-3-16-148410-0',
  authors: [
    {
      id: 21,
    },
  ],
  createdAt: date,
  updatedAt: date,
}

const bookResultFixtureExpected: BookResult = {
  uri: '/book/42',
  coverURL,
  title: 'test',
  synopsis: `test synopsis
newline`,
  isbn: '978-3-16-148410-0',
  authors: [author21Uri],
  createdAt: date.toISOString(),
  updatedAt: date.toISOString(),
}

const bookRequestFixture: BookRequestInput = {
  uri: '/book/42',
  coverURL,
  title: 'test',
  synopsis: `test synopsis
newline`,
  authors: [author21Uri],
}

const bookRequestFixtureExpected: BookRequest = {
  uri: '/book/42',
  coverURL,
  title: 'test',
  synopsis: String.raw`test synopsis\nnewline`,
  authors: [author21Uri],
}

describe('types::book', () => {
  describe('request', () => {
    it('parses a valid object', () => {
      expect(bookRequestSchema.parse(bookRequestFixture)).toStrictEqual(
        bookRequestFixtureExpected,
      )
    })

    it('rejects an invalid object', () => {
      expect(() => bookRequestSchema.parse({ foo: 42 })).toThrow()
    })
  })
  describe('result', () => {
    it('parses a valid object', () => {
      expect(bookResultSchema.parse(bookResultFixture)).toStrictEqual(
        bookResultFixtureExpected,
      )
    })

    it('rejects an invalid object', () => {
      expect(() => bookResultSchema.parse({ foo: 42 })).toThrow()
    })
  })
})
