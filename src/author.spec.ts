import { z } from 'zod'

import {
  AuthorRequest,
  AuthorResult,
  authorRequestSchema,
  authorResultSchema,
} from './author'

type AuthorRequestInput = z.input<typeof authorRequestSchema>
type AuthorResultInput = z.input<typeof authorResultSchema>

const date = new Date()

const author42Uri = '/author/42'

const authorResultFixture: AuthorResultInput = {
  id: 42,
  name: 'Author 1',
  createdAt: date,
  updatedAt: date,
}

const authorResultFixtureExpected: AuthorResult = {
  uri: author42Uri,
  name: 'Author 1',
  createdAt: date.toISOString(),
  updatedAt: date.toISOString(),
}

const authorRequestFixture: AuthorRequestInput = {
  name: 'Author 1',
  uri: author42Uri,
}

const authorRequestFixtureExpected: AuthorRequest = {
  name: 'Author 1',
  uri: author42Uri,
}

describe('types::author', () => {
  describe('request', () => {
    it('parses a valid object', () => {
      expect(authorRequestSchema.parse(authorRequestFixture)).toStrictEqual(
        authorRequestFixtureExpected,
      )
    })

    it('rejects an invalid object', () => {
      expect(() =>
        authorRequestSchema.parse({
          name: 42,
          uri: author42Uri,
        }),
      ).toThrow()
    })
  })

  describe('result', () => {
    it('parses a valid object', () => {
      expect(authorResultSchema.parse(authorResultFixture)).toStrictEqual(
        authorResultFixtureExpected,
      )
    })

    it('rejects an invalid object', () => {
      expect(() =>
        authorResultSchema.parse({
          uri: '/unknown/42',
          name: 'Author 1',
        }),
      ).toThrow()
    })
  })
})
