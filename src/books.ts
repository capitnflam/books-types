import validator from 'validator'
import { z } from 'zod'

import { dateInfoSchema } from './sub/date-info'
import { transformURI } from './sub/transform-uri'
import { withPagination } from './utils/with-pagination'

export const booksResultItemSchema = z
  .object({
    id: z.number(),
    authors: z.array(z.object({ id: z.number() })),
    title: z.string(),
    isbn: z
      .string()
      .refine(validator.isISBN)
      .nullish()
      .transform((x) => x ?? undefined),
  })
  .merge(dateInfoSchema)
  .transform(transformURI('/books'))
  .transform(({ authors, ...rest }) => ({
    ...rest,
    authors: authors.map(transformURI('/authors')).map(({ uri }) => uri),
  }))

export const booksResultSchema = withPagination(booksResultItemSchema)

export type BooksResultItemInput = z.input<typeof booksResultItemSchema>
export type BooksResultItem = z.infer<typeof booksResultItemSchema>
export type BooksResult = z.infer<typeof booksResultSchema>
