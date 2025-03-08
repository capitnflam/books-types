import validator from 'validator'
import { z } from 'zod'

import { dateInfoSchema } from './sub/date-info'
import { transformURI } from './sub/transform-uri'

const escapedNewLineRegEx = /\\n/g
const newLineRegEx = /\n/g

const bookCommonSchema = z.object({
  coverURL: z
    .string()
    .url()
    .nullish()
    .transform((x) => x ?? undefined),
  title: z.string(),
  isbn: z
    .string()
    .refine(validator.isISBN)
    .nullish()
    .transform((x) => x ?? undefined),
})

export const bookResultSchema = z
  .object({
    id: z.number(),
    authors: z.array(z.object({ id: z.number() })),
    synopsis: z
      .string()
      .nullish()
      .transform((x) => x?.replace(escapedNewLineRegEx, '\n') ?? undefined),
  })
  .merge(bookCommonSchema)
  .merge(dateInfoSchema)
  .transform(transformURI('/books'))
  .transform(({ authors, ...rest }) => ({
    ...rest,
    authors: authors.map(transformURI('/authors')).map(({ uri }) => uri),
  }))

export const bookRequestSchema = z
  .object({
    uri: z.string().refine((x) => x.startsWith('/books/')),
    authors: z.array(z.string().refine((x) => x.startsWith('/authors/'))),
    synopsis: z
      .string()
      .nullish()
      .transform((x) => x?.replace(newLineRegEx, String.raw`\n`) ?? undefined),
  })
  .merge(bookCommonSchema)

export type BookResult = z.infer<typeof bookResultSchema>
export type BookRequest = z.infer<typeof bookRequestSchema>
