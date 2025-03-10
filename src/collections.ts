import { z } from 'zod'

import { dateInfoSchema } from './sub/date-info'
import { transformURI } from './sub/transform-uri'

export const collectionsResultSchema = z.array(
  z
    .object({
      id: z.number(),
      name: z.string(),
      books: z.array(z.object({ id: z.number() })),
    })
    .merge(dateInfoSchema)
    .transform(transformURI('/collections'))
    .transform(({ books, ...rest }) => ({
      ...rest,
      books: books.map(transformURI('/books')).map(({ uri }) => uri),
    })),
)

export type CollectionsResult = z.infer<typeof collectionsResultSchema>
