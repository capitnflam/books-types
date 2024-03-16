import { z } from 'zod'

const indexPaginationMeta = z.object({
  itemCount: z.number(),
  totalItems: z.number().optional(),
  itemsPerPage: z.number(),
  totalPages: z.number().optional(),
  currentPage: z.number(),
})

const indexPaginationLinks = z.object({
  first: z.string().optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
  last: z.string().optional(),
})

export function withPagination<T extends z.ZodTypeAny>(
  paginationObjectSchema: T,
) {
  return z.object({
    items: z.array(paginationObjectSchema),
    meta: indexPaginationMeta,
    links: indexPaginationLinks.optional(),
  })
}
