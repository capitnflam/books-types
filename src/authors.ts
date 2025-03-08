import { z } from 'zod'

import { dateInfoSchema } from './sub/date-info'
import { transformURI } from './sub/transform-uri'

export const authorsResultSchema = z.array(
  z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .merge(dateInfoSchema)
    .transform(transformURI('/authors')),
)

export type AuthorsResult = z.infer<typeof authorsResultSchema>
