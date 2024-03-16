import { z } from 'zod'

import {
  CollectionRequest,
  CollectionResult,
  collectionRequestSchema,
  collectionResultSchema,
} from './collection'

type CollectionRequestInput = z.input<typeof collectionRequestSchema>
type CollectionResultInput = z.input<typeof collectionResultSchema>

const date = new Date()

const collection21Uri = '/collection/21'
const name = 'test collection'

const collectionResultFixture: CollectionResultInput = {
  id: 21,
  name,
  books: [{ id: 42 }],
  createdAt: date,
  updatedAt: date,
}

const collectionResultFixtureExpected: CollectionResult = {
  uri: collection21Uri,
  name,
  books: ['/book/42'],
  createdAt: date.toISOString(),
  updatedAt: date.toISOString(),
}

const collectionRequestFixture: CollectionRequestInput = {
  uri: collection21Uri,
  name,
  books: ['/book/42'],
}

const collectionRequestFixtureExpected: CollectionRequest = {
  uri: collection21Uri,
  name,
  books: ['/book/42'],
}

describe('types::collection', () => {
  describe('request', () => {
    it('parses a valid object', () => {
      expect(
        collectionRequestSchema.parse(collectionRequestFixture),
      ).toStrictEqual(collectionRequestFixtureExpected)
    })

    it('rejects an invalid object', () => {
      expect(() => collectionRequestSchema.parse({ foo: 42 })).toThrow()
    })
  })

  describe('result', () => {
    it('parses a valid object', () => {
      expect(
        collectionResultSchema.parse(collectionResultFixture),
      ).toStrictEqual(collectionResultFixtureExpected)
    })

    it('rejects an invalid object', () => {
      expect(() => collectionResultSchema.parse({ foo: 42 })).toThrow()
    })
  })
})
